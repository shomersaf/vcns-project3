import { useLoginUserMutation } from "../store/api/vacations.api"
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from "react-redux";
import { removeUser } from "../store/slices/userSlice";
import { setUser } from "../store/slices/userSlice";




export function Login() {
    const dispatch = useDispatch();
    const [email, setEmail] = useState("");
    const [pswrd, setPswrd] = useState("");

    const navigate = useNavigate()
    const [loginUser, { isLoading, isError, data, error }] = useLoginUserMutation()



    useEffect(() => {
        dispatch(removeUser())
    })


    const loginUserHandler = async (email: string, pswrd: string) => {
        if (!email && !pswrd) {
            alert('Nothing entered!')
        } else if (!email) {
            alert('No email entered!')
        } else if (!pswrd) { alert('No password entered!') } else {
            try {
                const result = await loginUser({ email, pswrd }).unwrap(); {
                    if (!result) {
                        console.log("error:", error)
                        throw new Error("Something went wrong!")
                    }
                    else {
                        setEmail("")
                        setPswrd("")
                        alert("User successfully logged in")
                    }
                }
            }
            catch (e) {
                console.log(e)
            }
        }
    }

    if (data?.signedToken) {
        localStorage.setItem("token", data?.signedToken)
        dispatch(setUser({
            token: data?.signedToken,
            role: data?.userRole
        }))
        data?.userRole == "admin" && navigate("/vacations/editAll")
        data?.userRole == "user" && navigate("/vacations")
    } else {
        return (
            <div className="login">
                <h1>My Vacations</h1>
                <h2>Login</h2>

                {isError && error && "data" in error && <p className='errorP'> Login status: {JSON.stringify(error?.data)}</p>}

                {isLoading && <p className='loadingP'>Loading...</p> ||
                    <div className="loginDiv">
                        <form action="#">
                            <input type="email" id = "email" placeholder="email..." value={email} onChange={(e) => { setEmail(e.target.value) }} />
                            <input type="password" id="pswrd" placeholder="password..." value={pswrd} onChange={(e) => { setPswrd(e.target.value) }} />
                        </form>
                        <div className="buttons">
                            <button onClick={() => { loginUserHandler(email, pswrd) }}>Login</button>
                            <button onClick={() => {
                                setEmail("")
                                setPswrd("")
                                navigate("/")
                            }}>Cancel</button>
                        </div>

                        <p>Don't have an account?</p>
                        <p><Link to="/users/new">Register now</Link></p>
                    </div>
                }
                {/* {isSuccess &&  <Navigate to="/" />} */}
            </div>
        )
    }



}