import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux'
import { Button, Modal, Table } from 'flowbite-react';
import { Link } from 'react-router-dom';
import { HiOutlineExclamationCircle } from 'react-icons/hi';
const DashPost = () => {
    const { currentUser } = useSelector((state) => state.user)
    const [userPost, setUserPost] = useState([])
    const [loading, setloading] = useState(true)
    const [showmore, setShowmore] = useState(true)
    const [openModal, setOpenModal] = useState(false);
    const [deletePostId, setdeletePostId] = useState('');

    console.log(userPost)
    useEffect(() => {
        const fetchPost = async () => {
            const res = await axios.get(`http://localhost:5000/getpost?userId=${currentUser._id}`)
            if (res.status === 200) {
                setUserPost(res.data.posts)
                setloading(false)
            }
        }
        if (currentUser.isAdmin) {
            fetchPost()
        }
        if (userPost.length > 1) {
            setShowmore(false)
        }
    }, [currentUser._id])

    const handleShowmore = async () => {
        const startIndex = userPost.length;
        try {
            const res = await axios.get(`http://localhost:5000/getpost?userId=${currentUser._id}&startIndex=${startIndex}`)
            const data = await res.data.posts
            if (res.status === 200) {
                setUserPost((prev) => [...prev, ...data])
                setloading(false)
                setShowmore(false)

            }
        } catch (error) {
            console.log(error)
        }
    }
    const handledelete = async () => {
        try {
            setOpenModal(false);
            const res = await axios.delete(`http://localhost:5000/deletepost/${deletePostId}/${currentUser._id}`);
            console.log(res.status)
            if (res.status === 200) {
                setUserPost(prev => prev.filter(post => post._id !== deletePostId));
                setloading(false);
                setShowmore(false);
            }
        } catch (error) {
            console.log(error);
        }
    };
    
    return (
        <div className='tab;e-auto overflow-x-scroll md:mx-auto p-3 scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700
        dark: scrollbar-thumb-slate-500
        '>

            <Table hoverable className='shadow-md'>
                <Table.Head>
                    <Table.HeadCell>Date Update</Table.HeadCell>
                    <Table.HeadCell>Post image</Table.HeadCell>
                    <Table.HeadCell>post title</Table.HeadCell>
                    <Table.HeadCell>Category</Table.HeadCell>
                    <Table.HeadCell>Delete</Table.HeadCell>
                    <Table.HeadCell>Edit</Table.HeadCell>
                </Table.Head>
                {loading ? 'loading...' : userPost ? userPost.map((post) => (
                    <Table.Body key={post._id}> {/* Ensure each child in a list has a unique "key" prop */}
                        <Table.Row>
                            <Table.Cell>{new Date(post.updateAt).toLocaleDateString()}</Table.Cell>
                            <Table.Cell>
                                <Link to={`/post/${post.slug}`}>
                                    <img
                                        src={post.image}
                                        alt={post.title}
                                        className='w-20 h-10 object-cover bg-slate-400'
                                    />
                                </Link>
                            </Table.Cell>
                            <Table.Cell>
                                <Link to={`/post/${post.slug}`}>
                                    {post.title}
                                </Link>
                            </Table.Cell>
                            <Table.Cell>{post.category}</Table.Cell>
                            <Table.Cell className='cursor-pointer text-red-500 font-medium hover:text-red-700 hover:underline'
                            onClick={() => {
                                setdeletePostId(post._id)
                                setOpenModal(true)}}
                            
                            >Delete</Table.Cell>
                            <Table.Cell className=' text-teal-500 font-medium hover:text-teal-500 hover:underline'>
                                <Link to={`/update-post/${post._id}`}>
                                    Edit
                                </Link>
                            </Table.Cell>

                        </Table.Row>
                    </Table.Body>
                )) : 'no data found'}


            </Table>
            {showmore &&
                <button onClick={handleShowmore} className='w-full text-teal-600 self-center text-sm py-7'>
                    Show more
                </button>
            }

            <Modal show={openModal} size="md" onClose={() => setOpenModal(false)} popup>
                <Modal.Header />
                <Modal.Body>
                    <div className="text-center">
                        <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-red-600 dark:text-gray-200 dark:bg-black" />
                        <h3 className="mb-5 text-lg font-normal text-red-500 dark:text-gray-400">
                            Are you sure to delete this post ?
                        </h3>
                        <div className="flex justify-center gap-4 mt-8">
                            <Button color="failure" onClick={handledelete}>
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
    );
};

export default DashPost;