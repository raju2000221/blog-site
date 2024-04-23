import { Alert, Button, TextInput } from 'flowbite-react';
import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import image_placeHolder from '../assets/profile_placeholder.png'
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage'
import { app } from '../firebase';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';


const DashProfile = () => {
    const { currentUser } = useSelector(state => state.user)
    const [profileImageUrl, setprofileImageUrl] = useState(null)
    const [profileImage, setprofileImage] = useState(null)
    const [uplodingProgress, setuplodingProgress] = useState(null)
    const [uplodingError, setuplodingError] = useState(null)
    const filePicker = useRef()
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setuplodingError(null)
            setprofileImage(file)
            setprofileImageUrl(URL.createObjectURL(file));

        }
    }
    useEffect(() => {
        if (profileImage) {
            uploadImage()
        }
    }, [profileImage])

    const uploadImage = async () => {
        const storage = getStorage(app)
        const fileName = new Date().getTime() + profileImage.name;
        const storageRef = ref(storage, fileName);
        const uploadTask = uploadBytesResumable(storageRef, profileImage)
        uploadTask.on(
            'state_changed',
            (snapshot) => {
                const progress =
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                setuplodingProgress(progress.toFixed(0))
            },
            (error) => {
                setuplodingError("File must be less than 2MB try again ...")
                setuplodingProgress(null)
                setprofileImage(null)
                setprofileImageUrl(null)
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    setprofileImageUrl(downloadURL);

                })
            }
        )

    }
    return (
        <div className='mx-auto max-w-lg p-3 w-full'>
            <h1 className='text-center my-5 text-3xl'>Profile</h1>
            <form className='flex flex-col'>
                <div className=" cursor-pointer self-center relative">
                    <input hidden type='file' accept='image/.*' onChange={handleImageChange} ref={filePicker} />
                    <div className=" w-32 h-32" onClick={() => {
                        filePicker.current.click();
                    }}>
                        {uplodingProgress && (
                            <CircularProgressbar
                                value={uplodingProgress || 0} text={`${uplodingProgress}%`}
                                strokeWidth={5}
                                styles={{
                                    root: {
                                        width: '100%', height: '100%', position: 'absolute', top: 0, left: 0
                                    },

                                }}

                            />
                        )}
                        {
                            uplodingError ? (
                                <img className='rounded-full w-full h-full border-8 border-[lightgray]' src={currentUser ? currentUser.photoUrl : image_placeHolder} />
                            ) : (
                                <img className='rounded-full w-full h-full border-8 border-[lightgray]' src={profileImageUrl ? profileImageUrl : (currentUser ? currentUser.photoUrl : image_placeHolder)} />

                            )

                        }
                    </div>
                </div>
                {
                    uplodingError && <p className='text-red-400 text-center'>Uploading error : {uplodingError}</p>
                }
                <div className=" flex flex-col gap-5 mt-12">
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