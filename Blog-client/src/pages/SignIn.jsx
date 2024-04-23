import { Alert, Button, Label, Spinner, TextInput } from 'flowbite-react';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { signSuccess  } from '../redux/user/userSlice';
import OAuth from '../components/OAuth';

const SignIn = () => {
    const [formData, setFormData] = useState({});
    const [loading, setLoading] = useState(false);
 const navigate = useNavigate();
 const dispatch = useDispatch();
    const [errors, setErrors] = useState({
        usernameEmail: '',
        password: '',
    });

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData({ ...formData, [id]: value.trim() });
        setErrors({ ...errors, [id]: '' });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const { usernameEmail, password } = formData;
        const newErrors = {};

        // Basic client-side validation
        if (!usernameEmail &&  !password) {
            newErrors.usernameEmail = 'Username is required';
            newErrors.password = 'Password is required';
        }
        if (!usernameEmail) newErrors.usernameEmail = 'Username is required';
        if (!password) newErrors.password = 'Password is required';
        if (password && password.length < 6) newErrors.password = 'Password must be at least 6 characters long';

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        try {
            setLoading(true);
            const res = await axios.post('http://localhost:5000/userLogin', formData);
      
            if(res.status === 200){
                console.log(res.status)
                console.log(res.data)
                setLoading(false);
                setFormData({});
                setErrors({});
                document.getElementById('usernameEmail').value = '';
                document.getElementById('password').value = '';
                dispatch(signSuccess(res.data))
                navigate('/')  
            }
        } catch (error) {
            if (error.response) {
                const { data, status } = error.response;
                if (status === 403) {
                    newErrors.usernameEmail = 'Email or user name not found';
                } if(status === 401) {
                    newErrors.password = 'Invalid Password';
                }
                setErrors(newErrors);
                setLoading(false);
            }
        }
    };
    return (
        <div className='min-h-screen mt-20'>
        <div className="flex p-3 max-w-3xl mx-auto flex-col md:flex-row">
            <div className="flex-1 my-auto">
                <Link to="/" className='self-center font-bold text-4xl'>
                    <span className='px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white'>Blog</span>
                    Post
                </Link>
                <p className='text-sm my-5 font-semibold'>You can sign up with your email and password <br /> or Google</p>
            </div>
            <div className="flex-1">
                <form className='flex flex-col gap-5' onSubmit={handleSubmit}>
                    <div className="">
                        <Label value='Your user Name' />
                        <TextInput
                            placeholder='Username'
                            type='text'
                            id='usernameEmail'
                            onChange={handleChange}
                        />
                        <p className='text-red-500 text-sm'>{errors.usernameEmail}</p>
                    </div>
                    <div className="">
                        <Label value='Your Password' />
                        <TextInput
                            placeholder='Password'
                            type='password'
                            id='password'
                            onChange={handleChange}
                        />
                        <p className='text-red-500 text-sm'>{errors.password}</p>
                    </div>
                    <Button gradientDuoTone='purpleToPink' type='submit' disabled={loading}>
                        {
                            loading ? (
                                <>
                                    <Spinner size="sm" color="pink" />
                                    <span className='pl-3'>Loading...</span>
                                </>
                            ) : "Sign Up"
                        }

                    </Button>
                    <OAuth/>
                </form>
                <div className="flex gap-4 mt-3">
                    <span>don't have an account ?</span>
                    <Link className='text-blue-500' to='/SignUp'>Sign Up</Link>
                </div>
            </div>

        </div>
    </div>
    );
};

export default SignIn;