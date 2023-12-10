import { useEditVacationsQuery, usePutVacationMutation } from "../store/api/vacations.api";
import { useNavigate, Navigate } from 'react-router-dom';
import { useState} from 'react';
import { Header } from "../ui/header";
import { Footer } from "../ui/footer";

export function EditVacation() {
    
    const [fromDate, setfromDate] = useState("");
    const [toDate, setToDate] = useState("");
    const [price, setPrice] = useState("");
    const [imageSrc, setImageSrc] = useState("");
    const vcnId = window.location.pathname.replace('/vacations/byid/', "");
    const { data } = useEditVacationsQuery("")
    const currentVacation = data?.filter(vacation => (vacation.vcnId == vcnId))
    const [destination, setDestination] = useState("");
    const [about, setAbout] = useState("");
    const [FirstRun, setFirstRun] = useState(true);
    const isimageSrcValid = checkURL(imageSrc);
    currentVacation?.map(vacation => {
        if (FirstRun){
            setDestination(vacation.destination)
            setAbout(vacation.about)
            setImageSrc(vacation.imageSrc)
            setPrice(vacation.price.toString())
            setFirstRun(false)
        }
    })
    
 
    const [putVacation, { isSuccess, isLoading, isError}] = usePutVacationMutation()

    const putVacationHandler = async (
        destination: string,
        about: string,
        fromDate: string,
        toDate: string,
        price: number,
        imageSrc: string,
        vcnId: number
    ) => {
        if (
            destination &&
            about &&
            imageSrc &&
            isimageSrcValid &&
            price <= 10000 &&
            price > 1000 &&
            (Number(new Date(toDate)) - Number(new Date(fromDate))) > 0 &&
            (Number(new Date(fromDate)) >= Number(new Date)) &&
            (Number(new Date(toDate)) >= Number(new Date))
        ) {
            await putVacation({
                destination,
                about,
                fromDate,
                toDate,
                price,
                imageSrc,
                vcnId
            }).unwrap();
            setDestination("");
            setAbout("");
            setfromDate("");
            setToDate("");
            setPrice("");
            setImageSrc("");
            alert(`Vacation #:${vcnId} successfully edited`)
        }  else  {
           
            
            if (!destination){ alert(`Destination data not entered`)
            }else if (!about){ alert(`About data not entered`)
            }else  if (isimageSrcValid ==false) {alert("Unproper image URL format entered")
              } else if (typeof destination != "string"){alert("destination should be a string")
               } else if (typeof about != "string"){alert("about should be a string")
               } else if ((Number(new Date(toDate)) - Number(new Date(fromDate))) < 0){alert("The ending date shouldn't be the date BEFORE the begining date")
               } else if ((Number(new Date(fromDate)) < Number(new Date))){alert("The beginning date shouldn't be the PASSED one!")
               } else if ((Number(new Date(toDate)) <= Number(new Date))){alert("The ending date shouldn't be the PASSED one!")
               } else if (price>10000) {alert("price should up to 10,000") 
               } else if (price<1000) {alert("price shouldn't be below 1,000") 
            } else return
        
        }

    }
    const navigate = useNavigate();
    return (
       <>
       <Header />
        <div className="registration">
            <h2>Edit Vacation #{vcnId}</h2>
            {isError && <p className='errorP'>Something went wrong</p>}
            {isLoading && <p className='loadingP'>Loading...</p> ||
                <div className="wrapper">
                    {currentVacation?.map(vacation => (
                        <div className="editing" key={vcnId}>

                            <form action="#" className="editForm">
                                <div className="destination">
                                    <span>Destination:</span>
                                    <input type="text" value={destination} onChange={(e) => { setDestination(e.target.value) }} />
                                </div>

                                <span>About:</span>
                                <textarea  value={about} onChange={(e) => { setAbout(e.target.value) }}></textarea>
                                
                                <div className="dates">
                                
                                    <div className="fromDate">
                                        
                                        <span>FROM* :</span>
                                       
                                        <div className="newDate">
                              
                                            <input type="date" value={fromDate || new Date(vacation.fromDate).toISOString().split('T')[0]} onChange={(e) => { setfromDate(e.target.value) }} />
                                        </div>
                                    </div>
                                    <div className="fromDate">
                                        <span>TO*:</span>
                                        
                                        <div className="newDate">
                               
                                            <input type="date" value={toDate || new Date(vacation.toDate).toISOString().split('T')[0]} onChange={(e) => { setToDate(e.target.value) }} />
                                        </div>
                                    </div>
                                </div>
                                <div className="notation">*Past dates adding is not allowed. So mind it while editing the old vacations - renew the dates for relevant!  </div>

                                <img src={vacation.imageSrc} alt={vacation.destination} />
                                <div className="imgRef">
                                    <span>Image url:**</span>
                                    <input type="text"  value={imageSrc} onChange={(e) => { setImageSrc(e.target.value) }} />
                                    <div className="notation">**Should have proper format ending!</div>
                                </div>
                                <div className="priceInputDiv">
                                    <span>Price (up to 10,000):</span>
                                    <input type="number" value={price} onChange={(e) => { setPrice(e.target.value) }} />
                                </div>

                            </form>
                            <div className="buttons">
                                <button onClick={() => {

                                    putVacationHandler(
                                        destination,
                                        about,
                                        fromDate || new Date(vacation.fromDate).toISOString().replace("Z", " ").slice(0, 19).replace("T", " "),
                                        toDate || new Date(vacation.toDate).toISOString().replace("Z", " ").slice(0, 19).replace("T", " "),
                                        +price,
                                        imageSrc,
                                        +vcnId
                                    )
                                }}>Publish</button>
                                <button onClick={() => {
                                    navigate("/vacations/editAll")
                                }}>Cancel</button>
                            </div>
                        </div>
                    ))}


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