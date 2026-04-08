import React from 'react'
import "./Home.css"
import course from "../../assets/Home/course.svg"
import { useNavigate } from 'react-router-dom'

const Home = () => {
    const navigate = useNavigate()

    const handleNavigate = () => {
        navigate("/course")
    }
    return (
        <div className='home_container 
        flex md:justify-center md:items-center md:flex-wrap' >
            <div className='home_cards_container '>
                <div className='home_card flex 
                    cursor-pointer
                    md:flex-col md:justify-center md:items-center  
                    border border-gray-200 rounded-[0.3vw] 
                    shadow-xl overflow-hidden
                    transition-transform duration-300 md:hover:scale-105
                    md:hover:border-gray-300
                    before:absolute before:top-0 before:left-0 before:w-0 before:h-[2px] 
                    before:bg-green-300 before:transition-all before:duration-500
                    hover:before:w-full'
                    onClick={handleNavigate}
                >
                    <div className='home_card_top 
                    flex md:flex-col md:justify-center md:items-center 
                    md:!pt-0 md:!p-8 md:!pb-4 '>
                        <img src={course} alt="course" className='home_card_img md:w-55' />
                        <p className='home_card_text text-sm'>Click here to view courses</p>
                    </div>
                    <div className='home_card_btm
                     bg-gray-700 text-white w-[100%] 
                    border-t border-gray-200 rounded-b-[0.3vw] 
                    md:h-10 flex md:justify-center md:items-center '>
                        <h3 className="home_card_btm_txt 
                        text-lg font-light">
                            Courses
                        </h3>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home