
import {useEditVacationsQuery, useDeleteVacationMutation } from "../store/api/vacations.api"
import { useNavigate } from 'react-router-dom';
import { Header } from "../ui/header";
import { Footer } from "../ui/footer";
export function EditVacations (){
    const {isLoading,isError,data} = useEditVacationsQuery("")
    const [deleteVacation]= useDeleteVacationMutation();
    const navigate = useNavigate();
    const editVacationHandler =(vcnId: string)=>{
        navigate(`/vacations/byid/${vcnId}`)
    }

    const deleteVacationHandler = async (vcnId:string) =>{
        await deleteVacation(vcnId).unwrap();
    }
    const formatter = new Intl.NumberFormat('en-US', {
       style: 'currency',
       currency: 'USD',
       // These options are needed to round to whole numbers if that's what you want.
       // minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
       maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
     });
   
       return(
           <>
           <Header/>
           <div className="wrapper">
   
   <h2 className="headline">Edit Vacations</h2>
   {isError && <p className="errorP">Something went wrong...</p>}
   {isLoading && <p className="loadingP">Loading...</p> ||
   <div className = "cards">
   
       {data?.map(vacation => (
           <div key={vacation.destination+vacation.fromDate} className="card">
               <img src={vacation.imageSrc} alt ={"NO IMG SRC"} />
               <div className="description">
               <div className="top">
               <h3>{vacation.destination}</h3>
               <p className="about">{vacation.about}</p>
               </div>
             
               <div className="downtown">
               <div className="date">
               <span>{new Date(vacation.fromDate).toLocaleDateString()}  - </span>
               <span>{new Date(vacation.toDate).toLocaleDateString()}</span>
               </div>
               <div className="cardFooter">
                   
                   <div className="price">{formatter.format(vacation.price)}</div>
                   <div className ="actionsDiv">
                    
                       <span className ="editS" title="edit" onClick={()=>{editVacationHandler(vacation.vcnId)}}>&#9998;</span>
                       <span className="deleteS" title="delete" onClick ={()=>{if(confirm(`Delete \`${vacation.destination}\` destination?`)) deleteVacationHandler(vacation.vcnId)}}>&#10006;</span> 
                   </div>
                   </div>
               </div>
             
               </div>
              
           </div>
       ))}

   </div>}
</div>
<Footer />
           </>
       )
}