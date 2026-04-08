import React, { useEffect, useRef, useState } from 'react'
import "./Navbar.css"
import { IoHome } from "react-icons/io5";
import { MdLogout, MdOutlineArrowDropDown } from 'react-icons/md';
import { Modal } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
    const [isDropdownMenu, setIsDropdownMenu] = useState(false)
    const dropdownRef = useRef()
    const navigate = useNavigate()

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
                setIsDropdownMenu(false)
            }
        }
        document.addEventListener("mousedown", handleClickOutside)
        return () => {
            document.removeEventListener("mousedown", handleClickOutside)
        }
    }, [])

    const toggleDropdown = () => {
        setIsDropdownMenu((prev) => !prev)
    }

    const handleNavigate = () => {
        navigate("/")
    }

    return (
        <div className='navbar_container
         md:bg-gray-800 md:w-[100vw]  
         text-white 
         flex md:items-center md:justify-between'>
            <div className='navbar_left_side 
            flex md:items-center md:gap-2 cursor-pointer'>
                <div className='navbar_logo'>
                    <img src="" alt="" />
                </div>
                <div className='navbar_home_div 
            flex md:items-center md:gap-2 cursor-pointer' onClick={handleNavigate}>
                    <p><IoHome /></p>
                    <p className='text-md font-thin'>Home</p>
                </div>
            </div>
            <div className='flex md:items-center md:gap-4'>
                <div className='relative' ref={dropdownRef}>
                    <div className={`navbar_email flex md:items-center md:gap-0.5 md:hover:bg-black md:justify-center transition duration-300 cursor-pointer`} onClick={toggleDropdown}>
                        <p >Krishna@gmail.com</p>
                        <p className='text-2xl'><MdOutlineArrowDropDown /></p>
                        {
                            isDropdownMenu && (
                                <div className='navbar_modal absolute md:top-9 md:left-0 md:bg-gray-800 md:w-[12vw] outline-0 md:h-[5vw] flex md:justify-center md:items-center  md:flex-col text-white '>
                                    <p className='font-light'>Update Profile</p>
                                    <hr />
                                    <p className='relative md:left-3'>Change Password</p>
                                </div>
                            )
                        }
                    </div>
                </div>
                <p className=' cursor-pointer'>Support</p>
                <div className='navbar_logout_btn flex md:items-center md:gap-1 md:bg-red-500 cursor-pointer'>
                    <button className='cursor-pointer'>Logout</button>
                    <MdLogout />
                </div>
            </div>
            {/* <Modal
            >
                <div className='navbar_modal md:bg-gray-800 md:w-[10vw] outline-0 md:h-[4vw] flex md:justify-center md:items-center md:flex-col text-white '>
                    <p className='font-light'>Update Profile</p>
                    <hr className='font-white' />
                    <p>Change Password</p>
                </div>
            </Modal> */}
        </div>
    )
}

export default Navbar