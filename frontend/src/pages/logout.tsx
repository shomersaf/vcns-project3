
import {  Navigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { removeUser } from '../store/slices/userSlice';
export function Logout() {
const dispatch = useDispatch()
localStorage.removeItem("token")
    dispatch(removeUser())
    return (
            <Navigate to="/login" />
    )
}