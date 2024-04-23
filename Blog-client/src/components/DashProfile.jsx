import { Button, TextInput } from 'flowbite-react';
import React from 'react';
import { useSelector } from 'react-redux';
import image_placeHolder from '../assets/profile_placeholder.png'


const DashProfile = () => {
    const { currentUser } = useSelector(state => state.user)

    return (
        <div className='mx-auto max-w-lg p-3 w-full'>
            <h1 className='text-center my-5 text-3xl'>Profile</h1>
            <form className='flex flex-col'>
                <div className="w-32 h-32 cursor-pointer self-center">
                    <img className='rounded-full w-full h-full border-8 border-[lightgray]' src={currentUser.photoUrl ? currentUser.photoUrl : image_placeHolder} />
                </div>

                <div className=" flex flex-col gap-5 mt-5">
                    <TextInput type='text' id='username' placeholder='Username' defaultValue={currentUser.name} />
                    <TextInput type='text' id='email' placeholder='Email' defaultValue={currentUser.email} />
                    <TextInput type='text' id='name' placeholder='password' />
                </div>
                        <Button className='mt-5' type='submit' gradientDuoTone='purpleToBlue' outline>
                            Update
                        </Button>
            </form>
            <div className=" text-red-500 flex justify-between mt-5 ">
                <span className='cursor-pointer'>Delete Account</span>
                <span className='cursor-pointer'>Sign Out</span>
            </div>
        </div>


    );
};

export default DashProfile;