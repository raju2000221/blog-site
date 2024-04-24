import { Avatar, Button, Dropdown, Navbar, TextInput } from 'flowbite-react';
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AiOutlineSearch } from 'react-icons/ai'
import { FaMoon,FaSun } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux';
import image_placeHolder from '../assets/profile_placeholder.png'
import { toggleTheme } from '../redux/theme/theme.Slice';

const Header = () => {
    const path = useLocation().pathname;
    const { currentUser } = useSelector(state => state.user)
    const { theme } = useSelector(state => state.theme)
    const dispatch = useDispatch()
    console.log(currentUser)


    return (
        <Navbar className='border-b-2'>
            <Link to="/" className='self-center whitespace-nowrap text-sm sm:text-xl dark:text-white font-semibold'>
                <span className='px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white'>Blog</span>
                Post
            </Link>
            <form>
                <TextInput
                    type='text'
                    placeholder='Search...'
                    rightIcon={AiOutlineSearch}
                    className='hidden lg:inline'
                />
            </form>

            <Button className='w-12 h-10 lg:hidden' color='gray' pill>
                <AiOutlineSearch />
            </Button>
            <div className=" flex gap-2 md:order-2">
                <Button className='w-12 h-10 hidden lg:inline' color='gray' pill onClick={() =>dispatch(toggleTheme())}>
                    {theme === 'light' ? <FaMoon/> : <FaSun/>}
                </Button>

                {currentUser ? (
                    <Dropdown
                        arrowIcon={false}
                        inline
                        label={
                            <Avatar
                                img={currentUser.photoUrl ? currentUser.photoUrl : image_placeHolder}
                                rounded
                            />
                        }
                    >
                        <div className=" border-b-2 p-2 ">
                        <Dropdown.Item className='p-0 cursor-text'>{currentUser.name}</Dropdown.Item>
                        <Dropdown.Item className='p-0 cursor-text'>{currentUser.email}</Dropdown.Item>
                        </div>
                        <Link to="/Dashboard?tab=profile"> <Dropdown.Item>Dashboard</Dropdown.Item></Link>
                        <Dropdown.Item>Sign out</Dropdown.Item>

                    </Dropdown>
                ) : (
                    // Content to render when user is not logged in
                    <Link to="/SignIn">
                        <Button gradientDuoTone="purpleToBlue" outline>
                            Sign In
                        </Button>
                    </Link>
                )
                }


                <Navbar.Toggle />
            </div >
            <Navbar.Collapse>
                <Navbar.Link as={'div'} active={path === "/"}><Link to="/">Home</Link></Navbar.Link>
                <Navbar.Link as={'div'} active={path === "/about"}><Link to="/about">About</Link></Navbar.Link>
                <Navbar.Link as={'div'} active={path === "/SignUp"}><Link to="/SignUp">SignUp</Link></Navbar.Link>
            </Navbar.Collapse>

        </Navbar >
    );
};

export default Header;