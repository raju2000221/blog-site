import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux'
import { Table } from 'flowbite-react';
import { Link } from 'react-router-dom';
const DashPost = () => {
    const { currentUser } = useSelector((state) => state.user)
    const [userPost, setUserPost] = useState([])
    const [loading, setloading] = useState(true)
    const [showmore, setShowmore] = useState(true)

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
            const res = await axios.get(`http://localhost:5000/getpost?userId=${currentUser._id}&startIndex =${startIndex}`)
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
                            <Table.Cell className='cursor-pointer text-red-500 font-medium hover:text-red-700 hover:underline'>Delete</Table.Cell>
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
        </div>
    );
};

export default DashPost;