import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux'
import { Button, Modal, Table } from 'flowbite-react';
import { Link } from 'react-router-dom';
import { HiOutlineExclamationCircle } from 'react-icons/hi';
const AllUser = () => {
    const { currentUser } = useSelector((state) => state.user)
    const [userPost, setUserPost] = useState([])
    const [loading, setloading] = useState(true)
    const [showmore, setShowmore] = useState(true)
    const [openModal, setOpenModal] = useState(false);
    const [deletePostId, setdeletePostId] = useState('');
    
    useEffect(() => {
        const fetchPost = async () => {
            const res = await axios.get(`http://localhost:5000/getalluser`)
            if (res.status === 200) {
                console.log(res.data)
                setUserPost(res.data)
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


    const handledelete = async () => {
        console.log('delete')
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
                    <Table.HeadCell>Create Date</Table.HeadCell>
                    <Table.HeadCell>Image</Table.HeadCell>
                    <Table.HeadCell>Email</Table.HeadCell>
                    <Table.HeadCell>Admin</Table.HeadCell>
                    <Table.HeadCell>Delete</Table.HeadCell>
                </Table.Head>
                {loading ? 'loading...' : userPost ? userPost.map((post) => (
                    <Table.Body key={post._id}> {/* Ensure each child in a list has a unique "key" prop */}
                        <Table.Row>
                            <Table.Cell>{new Date(post.createdAt).toLocaleDateString()}</Table.Cell>
                            <Table.Cell>
                                    <img
                                        src={post.photoUrl}
                                        alt={post.title}
                                        className='w-20 h-10 object-cover bg-slate-400'
                                    />

                            </Table.Cell>
                            <Table.Cell>
                                    {post.email}
                            </Table.Cell>
                            <Table.Cell>{post.isAdmin ? 'Yes' : 'No'}</Table.Cell>
                            <Table.Cell className='cursor-pointer text-red-500 font-medium hover:text-red-700 hover:underline'
                            onClick={() => {
                                setdeletePostId(post._id)
                                setOpenModal(true)}}
                            
                            >Delete</Table.Cell>

                        </Table.Row>
                    </Table.Body>
                )) : 'no data found'}


            </Table>
    

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

export default AllUser;