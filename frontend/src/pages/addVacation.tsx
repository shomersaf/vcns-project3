import { useState } from 'react';
import { useAddVacationMutation } from '../store/api/vacations.api';

import { Navigate, useNavigate } from 'react-router-dom';
import { Header } from '../ui/header';
import { Footer } from '../ui/footer';


export function AddVacation() {
    const navigate = useNavigate();
    const [destination, setDestination] = useState("");
    const [about, setAbout] = useState("");
    const [fromDate, setfromDate] = useState("");
    const [toDate, setToDate] = useState("");
    const [price, setPrice] = useState("");
    const [imageSrc, setImageSrc] = useState("");

    
    const [addVacation, { isSuccess, isLoading, isError, status }] = useAddVacationMutation()
 
    const addVacationHandler = async (
        destination: string,
        about: string,
        fromDate: string,
        toDate: string,
        price: number,
        imageSrc: string,
    ) => {
        if (
            destination &&
            about &&
            fromDate &&
            toDate &&
            price <= 10000 &&
            price > 1000 &&
            imageSrc &&
            (Number(new Date(toDate)) - Number(new Date(fromDate))) > 0 &&
            (Number(new Date(fromDate)) >= Number(new Date)) &&
            (Number(new Date(toDate)) > Number(new Date))
        ) {
            await addVacation({
                destination,
                about,
                fromDate,
                toDate,
                price,
                imageSrc
            }).unwrap();
            setDestination("");
            setAbout("");
            setfromDate("");
            setToDate("");
            setPrice("");
            setImageSrc("");
            alert("New vacation added")
        } else {
            const isimageSrcValid = checkURL(imageSrc);
            if(!destination && !about && !fromDate && !toDate && !price && !imageSrc  ) {
                alert(`Nothing entered`)
            
            } else if (!destination || !about || !fromDate || !toDate || !price || !imageSrc  ){alert(`Some data not entered`)
        }else  if (isimageSrcValid ==false) {alert("Unproper image URL format entered")
              } else if (typeof destination != "string"){alert("destination should be a string")
               } else if (typeof about != "string"){alert("about should be a string")
               } else if ((Number(new Date(toDate)) - Number(new Date(fromDate))) < 0){alert("The ending date shouldn't be the date BEFORE the begining date")
               } else if ((Number(new Date(fromDate)) < Number(new Date))){alert("The beginning date shouldn't be the PASSED one!")
               } else if ((Number(new Date(toDate)) <= Number(new Date))){alert("The ending date shouldn't be the PASSED one!")
               } else if (price>10000) {alert("price should up to 10,000") 
               } else if (price<1000) {alert("price shouldn't be below 1,000")}  
               else return    
        }
    }
    return (
        <>
       <Header />
       <div className="registration">
 <h2>Add Vacation</h2>
 {isError && status && <p className='errorP'>Vacation adding status: { JSON.stringify(status)}</p>}
            {isLoading && <p className='loadingP'>Loading...</p> ||
            <div className="wrapper">
                  <form action="#">
                <input type="text" placeholder="destination..." value={destination} onChange={(e) => { setDestination(e.target.value) }} />
              
                <textarea placeholder="about..." id = "about" value={about} onChange={(e) => { setAbout(e.target.value) }}></textarea>
                <input type="date" id="fromDate" placeholder="fromDate..." value={fromDate} onChange={(e) => { setfromDate(e.target.value) }} />
                <input type="date" id="toDate" placeholder="toDate... " value={toDate} onChange={(e) => { setToDate(e.target.value) }} />
                <input type="number"  id = "price" placeholder="price (up to 10,000)... " value={price} onChange={(e) => { setPrice(e.target.value) }} />
                <input type="text" id = "imageSrc" placeholder="imageSrc (should have proper format ending!) " value={imageSrc} onChange={(e) => { setImageSrc(e.target.value) }} />
            </form>
            <div className="buttons">
            <button onClick={() => {
                addVacationHandler(
                    destination,
                    about,
                    fromDate,
                    toDate,
                    +price,
                    imageSrc)
            }}>Publish</button>
            <button onClick={() => {
                  setDestination("");
                  setAbout("");
                  setfromDate("");
                  setToDate("");
                  setPrice("");
                  setImageSrc("");
                  navigate("/vacations/editAll")
            }}>Cancel</button>
            </div>
            </div>
            }
            {isSuccess && <Navigate to="/vacations/editAll" />}

           
          
        </div>
        <Footer />
       </>
    )
}
function checkURL(url:string) {
    const r = /^(ftp|http|https):\/\/[^ "]+$/;
    
  if (r.test(url) && url.match(/\.(jpeg|jpg|gif|png)$/)) {
    return true
  }else{
    return false} 
  }
