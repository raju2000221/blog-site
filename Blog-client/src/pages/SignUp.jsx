import { Button, Label, TextInput } from 'flowbite-react';
import React from 'react';
import { Link } from 'react-router-dom';

const SignUp = () => {
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
                    <form className='flex flex-col gap-5'>
                        <div className="">
                            <Label value='Your user Name'/>
                            <TextInput
                            placeholder='Username'
                            type='text'
                            id='username'
                            />
                        </div>
                        <div className="">
                            <Label value='Your email'/>
                            <TextInput
                            placeholder='Email'
                            type='text'
                            id='email'
                            />
                        </div>
                        <div className="">
                            <Label value='Your Password'/>
                            <TextInput
                            placeholder='Password'
                            type='text'
                            id='password'
                            />
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