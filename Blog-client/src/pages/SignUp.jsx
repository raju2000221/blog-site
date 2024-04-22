import { Button, Label, TextInput } from 'flowbite-react';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const SignUp = () => {
    const [formData, setFormData] = useState({});
    const [messageUsename, setMessageUsename] = useState('');
    const [messageEmail, setMessageEmail] = useState('');
    const [messagePassword, setMessagePassword] = useState('');
    const [message, setMessage] = useState('');
    const [status, setStatus] = useState();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
        if (e.target.id === 'username') {
            setMessageUsename('');
        } else if (e.target.id === 'email') {
            setMessageEmail('');
        } else if (e.target.id === 'password') {
            setMessagePassword('');
        }

    };

    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent default form submission behavior
        // Validate username
        if (!formData.username && !formData.email && !formData.password) {
            setMessageUsename('Username is required');
            setMessageEmail('Email is required');
            setMessagePassword('Password is required');
            return
        }
        if (!formData.username) {
            setMessageUsename('Username is required');

            return
        }
        if (!formData.email) {
            setMessageEmail('Email is required');
            return
        }
        if (!formData.password) {
            setMessagePassword('Password is required');
            return

        }
        if (!/\S+@\S+\.\S+/.test(formData.email)) {
            setMessageEmail('Invalid email format');
            return
        }
        if (status === 402) {
            setMessageEmail('This email already use');

        }
        if (formData.password.length < 6) {
            setMessagePassword('Password must be at least 6 characters long');
            return
        }


        try {
            const res = await axios.post('http://localhost:5000/userSignUp', formData);
            setMessage(res.data.message);
            setStatus(res.status);
        } catch (error) {
            setMessage(error.response.data.message);
            setStatus(error.response.status);
        }

    };


    return (
        <div className='min-h-screen mt-20'>
            <div className="flex p-3 max-w-3xl mx-auto flex-col md:flex-row">
                {/* left side */}
                <div className=" flex-1 my-auto">
                    <Link to="/" className='self-center  font-bold text-4xl'>
                        <span className='px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white'>Blog</span>
                        Post
                    </Link>
                    <p className='text-sm my-5 font-semibold'>You can sign up with your email and password <br /> or Google</p>
                </div>
                {/* right side */}
                <div className=" flex-1">
                    <form className='flex flex-col gap-5' onSubmit={handleSubmit}>
                        <div className="">
                            <Label value='Your user Name' />
                            <TextInput
                                placeholder='Username'
                                type='text'
                                id='username'
                                onChange={handleChange}
                            />
                            <p className='text-red-500 text-sm'>{messageUsename}</p>
                        </div>
                        <div className="">
                            <Label value='Your email' />
                            <TextInput
                                placeholder='Email'
                                type='text'
                                id='email'
                                onChange={handleChange}
                            />
                            <p className='text-red-500 text-sm'>{messageEmail}</p>

                        </div>
                        <div className="">
                            <Label value='Your Password' />
                            <TextInput
                                placeholder='Password'
                                type='password'
                                id='password'
                                onChange={handleChange}
                            />
                            <p className='text-red-500 text-sm'>{messagePassword}</p>

                        </div>
                        <Button gradientDuoTone='purpleToPink' type='submit'> Sign Up</Button>
                    </form>
                    <div className=" flex gap-4 mt-3">
                        <span>Have an account ?</span>
                        <Link className='text-blue-500' to='/SignIn'>Sign In</Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignUp;
