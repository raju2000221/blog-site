import { Alert, Button, Label, Modal, TextInput } from 'flowbite-react';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import image_placeHolder from '../assets/profile_placeholder.png'
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage'
import { app } from '../firebase';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import axios from 'axios';
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { signOutSuccess, updateSuccess } from '../redux/user/userSlice';
import { deleteSuccess } from '../redux/user/userSlice';
import { Link, useNavigate } from 'react-router-dom';


const DashProfile = () => {
    const { currentUser } = useSelector(state => state.user)
    const [profileImageUrl, setprofileImageUrl] = useState(null)
    const [profileImage, setprofileImage] = useState(null)
    const [uplodingProgress, setuplodingProgress] = useState(null)
    const [uplodingError, setuplodingError] = useState(null)
    const [openModal, setOpenModal] = useState(false);
    const [userUpdateValue, setuserUpdateValue] = useState(null);
    const [error, setError] = useState(null);
    const filePicker = useRef()
    const dispatch = useDispatch();
    const navigate = useNavigate()
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
                console.log(profileImage.type)
            },
            (error) => {
                if (!profileImage.type.startsWith('image/')) {
                    setuplodingError("File must be an Image")

                } else {
                    setuplodingError("File must be less than 2MB try again ...")

                }
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
    const updateuserInfo = (e) => {
        console.log(currentUser)
        e.preventDefault()
        const name = document.getElementById('username').value
        const userUpdateValue = {
            name,
            photoUrl: profileImageUrl
        }
        setuserUpdateValue(userUpdateValue)
        setOpenModal(true)
    }

    const handleUpdate = async () => {
        setError(null)
        try {
            const res = await axios.put('http://localhost:5000/userUpdate', { userUpdateValue }, {
                withCredentials: true
            });
        
            console.log(res);
        
            if (res.status === 200) {
                const updateUser = res.data;
                dispatch(updateSuccess(updateUser));
                setuserUpdateValue(null);
                setuplodingProgress(null);
                setprofileImage(null);
                setprofileImageUrl(null);
                setOpenModal(false);
            } 
        } catch (error) {
            setError('Unauthorized');
            console.error('Error updating user:', error.response.statusText);
        }
        
        
    };
    const handleDeleteAcc = async () => {
        try {
            console.log('delete');
            const res = await axios.get('http://localhost:5000/userDelete',{
                withCredentials: true
            });
    
            if (res.status === 200) {
                dispatch(deleteSuccess(null));
                navigate('/SignIn');
            } else {
                console.error('Failed to delete user account');
                // Handle the failure scenario
            }
        } catch (error) {
            console.error('Error deleting user account:', error);
            // Handle the error scenario
        }
    };
    
const handleSignOut = ()=>{
    dispatch(signOutSuccess(null));
    navigate('/SignIn');
}

    return (
        <div className='mx-auto max-w-lg p-3 w-full'>
            <h1 className='text-center my-5 text-3xl'>Profile</h1>
            <form className='flex flex-col' onSubmit={updateuserInfo} >
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
                                <img className='rounded-full w-full h-full border-8 border-[lightgray]' src={profileImageUrl ? profileImageUrl : (currentUser.photoUrl ? currentUser.photoUrl : image_placeHolder)} />

                            )

                        }
                    </div>
                </div>
                {
                    uplodingError && <p className='text-red-400 text-center'>Uploading error : {uplodingError}</p>
                }
                <div className=" flex flex-col gap-5 mt-12">
                    <TextInput type='text' id='username' placeholder='Username' defaultValue={currentUser.name} />
                    <TextInput readOnly type='text' id='email' placeholder='Email' defaultValue={currentUser.email} />
                </div>
                <Button className='mt-5' type='submit' gradientDuoTone='purpleToBlue'>
                    Update
                </Button>
             
            </form>
            {currentUser.isAdmin && (
                    <Link to='/create-post'>
                    <Button
                    type='button'
                    gradientDuoTone='purpleToPink'
                    className='w-full mt-5'
                    
                    >
                        Create a post
                    </Button>
                    </Link>
                )}
            <div className=" text-red-500 flex justify-between mt-5 ">
                <span className='cursor-pointer' onClick={handleDeleteAcc}>Delete Account</span>
                <span className='cursor-pointer' onClick={handleSignOut}>Sign Out</span>
            </div>
            {error ? <p className='text-red-500 text-center bg-red-100 p-3 rounded-sm'>{error}</p> : null}
            <div className="">
                <Modal show={openModal} size="md" onClose={() => setOpenModal(false)} popup>
                    <Modal.Header />
                    <Modal.Body>
                        <div className="text-center">
                            <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-red-600 dark:text-gray-200 dark:bg-black" />
                            <h3 className="mb-5 text-lg font-normal text-red-500 dark:text-gray-400">
                                Are you sure to Update your Profile ?
                            </h3>
                            <div className="flex justify-center gap-4 mt-8">
                                <Button color="failure" onClick={() => { handleUpdate() }}>
                                    {"Yes, I'm sure"}
                                </Button>
                                <Button color="gray" onClick={() => { setOpenModal(false) }}>
                                    No, cancel
                                </Button>
                            </div>
                        </div>
                    </Modal.Body>
                </Modal>

            </div>

        </div>


    );
};

export default DashProfile;