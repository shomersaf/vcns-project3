
import { useState } from 'react';
import { useRegisterUserMutation} from '../store/api/vacations.api';
import {  useNavigate,Link, Navigate } from 'react-router-dom';

export function Registration (){
    const navigate = useNavigate();
const [firstName,setFirstName] = useState("");
const [lastName,setLastName] = useState("");
const [email,setEmail] = useState("");
const [pswrd,setPswrd] = useState("");

const [registerUser,{ isSuccess,isLoading,isError, error}] = useRegisterUserMutation()

const registerUserHandler = async (firstName:string,lastName:string,email:string,pswrd:string,userRole:string)=>{
    const isEmailValid = validateEmail(email);
    if (!isEmailValid) alert("Unproper email format entered");
    if(pswrd.length<4 || pswrd.length>10 )  alert("the password shoul be from 4 to 10 chars");
    if (typeof firstName !="string" || typeof lastName !="string" || typeof email !="string" || typeof pswrd !="string" ) alert('Irrelevant data type entered');
    if(firstName.length<3 || lastName.length<3 ) alert ('Some user data is too short');
    if(firstName.length>10 || lastName.length>10 ) alert('Some user data is too long');
    if(firstName && lastName && email && pswrd && userRole){
        await registerUser({firstName,lastName,email,pswrd,userRole}).unwrap();
        
        setFirstName("");
        setLastName("");
        setEmail("");
        setPswrd("");
        alert("User successfully registered")
    }else{
        alert ("Some of forms fields are empty. Enter the data, please!")
    }
 
}

    return(
        <div className="registration">
            <h1>My Vacations</h1>
         <h2>Registration</h2>
         
         {isError && error && "data" in error &&  <p className='errorP'>{ JSON.stringify(Object(error?.data)["message"])}</p>}
            {isLoading && <p className='loadingP'>Loading...</p> ||
            <div className='registrateDiv'><form action="#">
            <input type="text" placeholder="first name (from 3 to 10 chars)" value={firstName} onChange = {(e)=>{setFirstName(e.target.value)}} />
            <input type="text" placeholder="last name (from 3 to 10 chars)" value={lastName} onChange = {(e)=>{setLastName(e.target.value)}} />
            <input type="text" placeholder="email..." value={email} onChange = {(e)=>{setEmail(e.target.value)}} />
            <input type="password" placeholder="password (from 4 to 10 chars) " value={pswrd} onChange = {(e)=>{setPswrd(e.target.value)}} />
            </form>
            <div className="buttons">
            <button onClick ={()=>{registerUserHandler(firstName,lastName,email,pswrd,"user")}}>Register</button>
            <button onClick ={()=>{
                  setFirstName("");
                  setLastName("");
                  setEmail("");
                  setPswrd("");
                navigate("/")}}>Cancell</button>
            </div>
            
            <p>Already a member?</p>
            <p><Link to="/login">Login</Link></p></div>
            }
            {isSuccess && <Navigate to="/login" />}
        </div>
    )
}

function validateEmail(email:string){
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
      }