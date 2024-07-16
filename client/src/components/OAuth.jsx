import React from 'react';
import {GoogleAuthProvider, getAuth, signInWithPopup} from 'firebase/auth';
import {app } from '../firebase';
import { useDispatch } from 'react-redux';
import { signInSuccess } from '../redux/user/userSlice';

export default function OAuth() {
    //Function handle Google Click
    const dispatch = useDispatch();
    const handleGoogleClick= async () => {
        try{
             const provider = new GoogleAuthProvider();
             const auth = getAuth(app);
             //create signup with popup

             const result = await  signInWithPopup(auth, provider);
             
             const res = await fetch('/api/auth/google', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({name : result.user.displayName, email: result.user.email, photo: result.user.photoURL}),

             })
             const data = await res.json();
             dispatch(signInSuccess(data));
        }catch(error){
            console.log("Couldn't Signin with Google", error);
        }
    };
  return (
    <button onClick={handleGoogleClick} className='bg-red-700 text-white p-3 rounded-lg
    uppercase hover: opacity-95'>
     Continue with Google
    </button>
  )
}
