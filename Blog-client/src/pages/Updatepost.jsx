import { Alert, Button, FileInput, Progress, Select, TextInput } from 'flowbite-react';
import React, { useEffect, useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage'
import { app } from '../firebase'
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom'
import { useSelector } from 'react-redux';
const Updatepost = () => {
    const navigate = useNavigate()
    const [image, setImage] = useState(null);
    const [imageUploadProgress, setimageUploadProgress] = useState(null)
    const [imageUploadError, setimageUploadError] = useState(null)
    const [post, setpost] = useState(null)
    const [fromData, setfromData] = useState({})
    const { postId } = useParams()
    const { currentUser } = useSelector((state) => state.user)
    console.log(postId)
    console.log(currentUser._id)
    useEffect(() => {
        const fetchPost = async () => {
            try {
                const res = await axios.get(`http://localhost:5000/updatepost/${postId}/${currentUser._id}`, {
                    withCredentials: true
                });

                if (res.status === 200) {
                    setfromData(res.data.post);
                    console.log(post)
                }
            } catch (error) {
                console.log(error.message);
            }
        };

        fetchPost();
    }, [postId]);

    const handleUploadImage = async () => {
        console.log(imageUploadProgress)
        try {

            if (!image) {
                setimageUploadError('Please select an image');
                return;
            }
            setimageUploadError(null);
            const storage = getStorage(app)
            const imageName = new Date().getTime() + '-' + image.name;
            const storageRef = ref(storage, imageName);
            const uploadImage = uploadBytesResumable(storageRef, image)
            uploadImage.on(
                'state_changed',
                (snapshot) => {
                    const progress = (
                        (snapshot.bytesTransferred / snapshot.totalBytes) * 100);
                    setimageUploadProgress(progress.toFixed(0))
                },
                (error) => {
                    setimageUploadError('Image upload failed')
                },
                () => {
                    getDownloadURL(uploadImage.snapshot.ref).then((downloadURL) => {
                        setimageUploadError(null)
                        setfromData({ ...fromData, image: downloadURL })
                    })
                }

            )
        } catch (error) {
            setimageUploadError('imageUploadFailed')
            setimageUploadProgress(null)
            console.log(error)
        }
    }


    const handlePublish = async (e) => {
        const slug = fromData.title.split(' ')
            .join('-')
            .toLowerCase()
            .replace(/[^a-zA-Z0-9]/g, '-');
        e.preventDefault();
        const postData = { ...fromData, slug }
        try {
            const res = await axios.post('http://localhost:5000/createpost', { postData }, {
                withCredentials: true
            })
            console.log('redirect', res.status)

            if (res.status === 201) {
                navigate(`/${fromData.category}/${slug}`)
            }
        } catch (error) {
            console.log(error)
        }
        console.log(fromData)
    }

    return (
        <div className='p-3 max-w-3xl mx-auto min-h-screen'>

            <h1 className='text-center text-3xl my-7 font-semibold'>Create a Post</h1>
            <form className='flex flex-col gap-4' onSubmit={handlePublish}>
                <div className='flex flex-col gap-4 sm:flex-row justify-between'>
                    <TextInput
                        value={fromData? fromData.title : 'loading...'}
                        type='text'
                        placeholder='Title'
                        required
                        id='title'
                        className='flex-1'
                        onChange={(e) => setfromData({ ...fromData, title: e.target.value })}
                    />
                    <Select
                        onChange={(e) => setfromData({ ...fromData, category: e.target.value })}
                        value={fromData? fromData.category :null}
                    >
                        <option value='uncatagorized'> Select a category</option>
                        <option value='javascript'>Javascript</option>
                        <option value='React'>React.js</option>
                        <option value='Next.js'>Nexty.js</option>
                        <option value='javascript'>Javascript</option>
                        <option value='javascript'>Javascript</option>
                        <option value='javascript'>Javascript</option>
                    </Select>
                </div>
                <div className="flex gap-4 items-center justify-center border-2 border-teal-500 border-dotted p-3">
                    <FileInput type='file' accept='image/*' onChange={(e) => setImage(e.target.files[0])} />
                    <Button type='button' gradientDuoTone='purpleToBlue' size='sm' outline onClick={handleUploadImage}> {imageUploadProgress > 99 ? 'Uploaded' : (imageUploadProgress && imageUploadProgress < 100 ? 'Uploading...' : 'Upload Image')}

                    </Button>
                </div>
                {console.log(fromData)}
                {
                    imageUploadProgress && imageUploadProgress < 100 ? <Progress
                        progress={imageUploadProgress}
                        progressLabelPosition="inside"
                        textLabel="Image Uploding..."
                        textLabelPosition="outside"
                        size="lg"
                        color="blue"
                        labelProgress
                        labelText
                    /> : (imageUploadProgress > 99 ? <img   
                        src={ fromData.image}
                        className='w-full h-72 object-cover'

                    /> : (imageUploadError ? <Alert color="failure" onDismiss={() => alert('Alert dismissed!')}>
                        <span className="font-medium"></span> {imageUploadError}
                    </Alert> : <img   
                        src={fromData ? fromData.image : null}
                        className='w-full h-72 object-cover'

                    />))
                }

                <ReactQuill theme='snow' placeholder='Write Here...' required className='h-72 mb-12'
                    onChange={(value) => {
                        setfromData({ ...fromData, content: value })
                    }}
                    value={fromData.content}
                />
                <Button type='submit' gradientDuoTone='purpleToPink' size='sm' outline >Publish</Button>

            </form>
        </div>
    );
};

export default Updatepost;