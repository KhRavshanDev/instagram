import React, { useContext, useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPortrait, faSearch, faSignOutAlt, faUserCircle, faWrench } from "@fortawesome/free-solid-svg-icons";
import { EDIT_PROFILE, HOME, LOGIN, SIGN_UP } from '../constants/routes';
import FirebaseContext from './../context/firebase';
import UserContext from './../context/user';
import useUser from '../hooks/useUser';
import CreatePost from '../components/createPost/CreatePost';
import SquarePlus from '../icons/SquarePlus';
import HouseSvg from '../icons/HouseSvg';
import SearchBar from './SearchBar';
import "./style.css";


const NavBar = () => {
    const navigate = useNavigate();
    const searchRef = useRef();
    const navbarRef = useRef(null);
    const [ focused, setFocused ] = useState(false);
    const [ search, setSearch ] = useState('');
    const { firebase } = useContext(FirebaseContext);
    const { user } = useContext(UserContext);
    const [ dropdownOpen, setDropdownOpen ]= useState(false);
    const [ open, setOpen ] = useState(false);
    const { user: { username } } = useUser();

    useEffect(() => {
        window.addEventListener('scroll', isSticky);
        return () => {
            window.removeEventListener('scroll', isSticky);
        };
    });

    useEffect(() => {
        function handleClickOutside(event) {
            if (searchRef.current && !searchRef.current.contains(event.target)) {
                setFocused(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [searchRef]);

    const isSticky = (e) => {
        const header = navbarRef.current;
        const scrollTop = window.scrollY;
        scrollTop >= 63 ? header.classList.add('is-sticky') : header.classList.remove('is-sticky');
    };

    return (
        <>
        <CreatePost open={open} setOpen={setOpen}/>
        <div className="border-b h-16" style={{backgroundColor: "#8b94f7"}} ref={navbarRef} >
            <div className="flex items-center h-full justify-between container mx-auto max-w-screen-lg relative">
                <div className="navbar-logo cursor-pointer"
                    onClick={() => navigate(HOME)}
                >
                    Instagram
                </div>
                <div className="w-60">
                    <div className='d-flex justify-content-center'>
                        <FontAwesomeIcon icon={faSearch} className="mt-2 pl-4" style={{width: 17, height: 17, position: "absolute"}}/>
                        <input
                            value={search}
                            onChange={e => setSearch(e.target.value)}
                            onFocus={() => setFocused(true)}
                            type="text"
                            className="bg-white text-gray-900 text-sm rounded-lg w-full px-4 py-2 p-4 text-center"
                            placeholder="Search"
                        />
                        

                    </div>
                    {focused && (
                        <div
                            className="absolute top-14 w-60 max-h-60 overflow-auto h-40 bg-white border rounded py-3 px-4"
                            ref={searchRef}
                        >
                            
                            <SearchBar searchInput={search}/>
                        </div>
                    )}
                </div>
                <div>
                    <div className="flex">
                        {user ? (
                            <>
                            
                            <div className="cursor-pointer flex items-center justify-center mr-6">
                                <button
                                    type="button"
                                    title="Home"
                                    onClick={() => navigate(HOME)}
                                >
                                    <HouseSvg/>
                                </button>
                            </div>
                            
                            <div className="cursor-pointer flex items-center justify-center mr-6 mb-1"
                                onClick={() => setOpen(true)}
                            >
                                <SquarePlus/>
                            </div>

                            <div
                                className="rounded-full cursor-pointer bg-gray-300 flex items-center justify-center w-5 h-5 relative select-none"
                                onClick={() => setDropdownOpen(prev => !prev)}
                            >
                                <FontAwesomeIcon icon={faUserCircle} style={{width: 22, height: 22}} />
                                <div className={ !dropdownOpen ? "hidden" : "" + " bg-white text-base z-50 list-none divide-y divide-gray-100 rounded shadow absolute top-10 right-0"} >
                                    <ul className="py-1" aria-labelledby="dropdown">
                                        <li
                                            className="hover:bg-gray-100"
                                            onClick={() => navigate(`/${username}`)}
                                        >
                                            <div className="flex items-center px-4 py-2">
                                                <div className="flex items-center mr-2">
                                                <FontAwesomeIcon icon={faPortrait} style={{width: 22, height: 22}} />
                                                </div>
                                                <span className="text-sm text-gray-700 block">Profile</span>
                                            </div>
                                        </li>
                                        <li
                                            className="border-b hover:bg-gray-100"
                                            onClick={() => navigate(EDIT_PROFILE)}
                                        >
                                            <div className="flex items-center px-4 py-2 pr-10">
                                                <div  className="flex items-center mr-2" >
                                                <FontAwesomeIcon icon={faWrench} style={{width: 22, height: 22}} />
                                                </div>
                                                <span className="text-sm text-gray-700 block">Settings</span>
                                            </div>
                                        </li>
                                        <li
                                            onClick={() => firebase.auth().signOut()}
                                        >
                                            <div className="flex items-center px-4 py-2 pr-10">
                                                <div  className="flex items-center mr-2" >
                                                <FontAwesomeIcon icon={faSignOutAlt} style={{width: 22, height: 22}} />
                                                </div>
                                                <span className="text-sm hover:bg-gray-100 text-gray-700 block px-4 py-2">Sign out</span>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            </>
                        ) : (
                            <>
                                <Link to={LOGIN}>
                                    <button
                                        className="bg-blue-inst font-bold text-sm rounded text-white w-20 h-8"
                                        type="button"
                                    >
                                        Log In
                                    </button>
                                </Link>
                                <Link to={SIGN_UP}>
                                    <button
                                        className="text-blue-inst font-bold text-sm rounded text-white w-20 h-8"
                                        type="button"
                                    >
                                        Sign Up
                                    </button>
                                </Link>
                            </>
                        )
                        }

                    </div>
                </div>
            </div>
        </div>
        </>
    );
};

export default NavBar;
