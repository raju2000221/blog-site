import { Button } from 'flowbite-react';
import React from 'react';
import { AiFillGoogleCircle } from 'react-icons/ai';
import { GoogleAuthProvider, signInWithPopup, getAuth } from 'firebase/auth'
import { app } from '../firebase';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { signSuccess } from '../redux/user/userSlice';

const OAuth = () => {
    const auth = getAuth(app)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const handleGoogle = async () => {
        const provider = new GoogleAuthProvider();
        provider.setCustomParameters({ prompt: 'select_account' });
        try {
            const resultFromGoogle = await signInWithPopup(auth, provider);
            const {displayName, email, photoURL} = resultFromGoogle.user

            const user ={
                name : displayName,
                email,
                photoUrl :  photoURL
            }
            console.log(photoURL)
            const res = await axios.post('http://localhost:5000/googleLogin', user);
            console.log(res.status)
            if(res.status === 200){
            console.log(res.data)

                dispatch(signSuccess(res.data))
                navigate('/')  
            }
            console.log(resultFromGoogle);
        } catch (error) {
            console.error("Error signing in with Google:", error.message);
        }
    };
    
    return (
        <Button type='button' gradientDuoTone='pinkToOrange' onClick={handleGoogle} >
            <AiFillGoogleCircle className='w-6 h-6 mr-2' />
            <span className='text-md'>Continue with Google</span>
        </Button>

    );
};

export default OAuth;