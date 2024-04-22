import React from 'react';
import {Footer} from 'flowbite-react'
import { Link } from 'react-router-dom';
import {BsFacebook, BsInstagram, BsTwitter, BsGithub, BsDiscord} from 'react-icons/bs'
const FooterCom = () => {
    return (
        <Footer container className="border border-t-8 border-teal-500">
            <div className="w-full max-w-7xl mx-auto">
                <div className="grid w-full justify-between sm:flex md:grid-cols-1">
                    <div className="mt-5">
                    <Link to="/" className='self-center font-bold text-2xl lg:text-4xl'>
                        <span className='px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white'>Blog</span>
                        Post
                    </Link>
                    </div>
                    <div className="grid grid-cols-2 gap-8 sm: mt-4 sm:grid-cols-3 sm:gap-6">
                        <div className="">
                        <Footer.Title title='Follow us'/>
                        <Footer.LinkGroup col>
                            <Footer.Link
                            href='https://www.google.com'
                            target='_blank'
                            
                            >
                                github
                            </Footer.Link>
                            <Footer.Link
                            href='https://www.google.com'
                            target='_blank'
                            
                            >
                               Discord
                            </Footer.Link>
                        </Footer.LinkGroup>
                        </div>
                     
                        <div className="">
                        <Footer.Title title='About'/>
                        <Footer.LinkGroup col>
                            <Footer.Link
                            href='https://www.google.com'
                            target='_blank'
                            
                            >
                                Js project
                            </Footer.Link>
                            <Footer.Link
                            href='https://www.google.com'
                            target='_blank'
                            
                            >
                                React Project
                            </Footer.Link>
                        </Footer.LinkGroup>
                        </div>
                        <div className="">
                        <Footer.Title title='LRGAL'/>
                        <Footer.LinkGroup col>
                            <Footer.Link
                            href='https://www.google.com'
                            target='_blank'
                            
                            >
                                Privecy Policy
                            </Footer.Link>
                            <Footer.Link
                            href='https://www.google.com'
                            target='_blank'
                            
                            >
                                Terms & Condition
                            </Footer.Link>
                        </Footer.LinkGroup>
                        </div>
                     
                    </div>
                </div>
                <Footer.Divider/>
                <div className="w-full sm:flex lg:items-center lg:justify-between">
                    <Footer.Copyright by='Raju Islam' year={new Date().getFullYear()}/>
                    <div className="flex gap-6 sm:mt-0 mt-4 ">
                        <Footer.Icon href='#' icon={BsFacebook}/>
                        <Footer.Icon href='#' icon={BsInstagram}/>
                        <Footer.Icon href='#' icon={BsTwitter}/>
                        <Footer.Icon href='#' icon={BsGithub}/>
                        <Footer.Icon href='#' icon={BsDiscord}/>
                    </div>
                </div>
            </div>
        </Footer>
    );
};

export default FooterCom;