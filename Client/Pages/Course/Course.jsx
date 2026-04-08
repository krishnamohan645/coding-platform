import React from 'react'
import "./Course.css"
import course from "../../assets/Home/course.svg"
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { MdArrowBackIos, MdArrowForwardIos } from 'react-icons/md';


// const PrevArrow = ({ onClick }) => {
//     return (
//         <div
//             className="absolute top-1/2 left-[-40px] transform -translate-y-1/2 z-10 cursor-pointer p-3 rounded-full text-black text-2xl"
//             onClick={onClick}
//         >
//             <MdArrowBackIos />
//         </div>
//     );
// };

// const NextArrow = ({ onClick }) => {
//     return (
//         <div
//             className="absolute top-1/2 right-[-40px] transform -translate-y-1/2 z-10 cursor-pointer  p-3 rounded-full text-black text-2xl"
//             onClick={onClick}
//         >
//             <MdArrowForwardIos />

//         </div>
//     );
// };


const Course = () => {
    // const settings = {
    //     dots: false,
    //     infinite: true,
    //     slidesToShow: 3,
    //     slidesToScroll: 1,
    //     autoplay: true,
    //     autoplaySpeed: 3000,
    //     pauseOnHover: true,
    //     nextArrow: <NextArrow />,
    //     prevArrow: <PrevArrow />,
    //     responsive: [
    //         {
    //             breakpoint: 1024, // Medium screens
    //             settings: {
    //                 slidesToShow: 2,
    //             },
    //         },
    //         {
    //             breakpoint: 768, // Small screens
    //             settings: {
    //                 slidesToShow: 1,
    //             },
    //         },
    //     ],
    // };
    return (
        <div className='course_container flex md:items-center md:justify-center md:h-auto'>
            <div className="course_container_wrapper flex md:justify-start md:items-center md:gap-5 md:flex-wrap md:w-[500px]">
                {/* <Slider {...settings}> */}
                <div className='course_card_div 
                                             flex md:flex-row md:justify-center md:items-center md:gap-5
                     border border-gray-200 rounded-[0.3vw] 
                     md:w-68 
                    shadow-xl overflow-hidden
                    transition-transform duration-300 md:hover:scale-105
                    md:hover:border-gray-300
                    before:absolute before:top-0 before:left-0 before:w-0 before:h-[2px] 
                    before:bg-green-300 before:transition-all before:duration-500
                    hover:before:w-full'>
                    <div className='course_card_left'>
                        <img src={course} alt="course" className='course_card_img md:w-25 md:h-25' />
                    </div>
                    <div className='course_card_right '>
                        <p className='text-[12px]'>Click here to view Python course</p>
                        <button className='text-[12px]'>Start Learning</button>
                    </div>
                </div>
                <div className='course_card_div 
                    flex md:flex-row md:justify-center md:items-center md:gap-5
                     border border-gray-200 rounded-[0.3vw] 
                     md:w-68 
                    shadow-xl overflow-hidden
                    transition-transform duration-300 md:hover:scale-105
                    md:hover:border-gray-300
                    before:absolute before:top-0 before:left-0 before:w-0 before:h-[2px] 
                    before:bg-green-300 before:transition-all before:duration-500
                    hover:before:w-full
                '>
                    <div className='course_card_left'>
                        <img src={course} alt="course" className='course_card_img md:w-25 md:h-25' />
                    </div>
                    <div className='course_card_right '>
                        <p className='text-[12px]'>Click here to view Java course</p>
                        <button className='text-[12px]'>Start Learning</button>
                    </div>
                </div>
                <div className='course_card_div 
                    flex md:flex-row md:justify-center md:items-center md:gap-5
                     border border-gray-200 rounded-[0.3vw] 
                     md:w-68 
                    shadow-xl overflow-hidden
                    transition-transform duration-300 md:hover:scale-105
                    md:hover:border-gray-300
                    before:absolute before:top-0 before:left-0 before:w-0 before:h-[2px] 
                    before:bg-green-300 before:transition-all before:duration-500
                    hover:before:w-full
                '>
                    <div className='course_card_left'>
                        <img src={course} alt="course" className='course_card_img md:w-25 md:h-25' />
                    </div>
                    <div className='course_card_right '>
                        <p className='text-[12px]'>Click here to view JavaScript course</p>
                        <button className='text-[12px]'>Start Learning</button>
                    </div>
                </div>
                <div className='course_card_div 
                    flex md:flex-row md:justify-center md:items-center md:gap-5
                     border border-gray-200 rounded-[0.3vw] 
                     md:w-68 
                    shadow-xl overflow-hidden
                    transition-transform duration-300 md:hover:scale-105
                    md:hover:border-gray-300
                    before:absolute before:top-0 before:left-0 before:w-0 before:h-[2px] 
                    before:bg-green-300 before:transition-all before:duration-500
                    hover:before:w-full
                '>
                    <div className='course_card_left'>
                        <img src={course} alt="course" className='course_card_img md:w-25 md:h-25' />
                    </div>
                    <div className='course_card_right '>
                        <p className='text-[12px]'>Click here to view C++ course</p>
                        <button className='text-[12px]'>Start Learning</button>
                    </div>
                </div>
                {/* </Slider> */}
            </div>
        </div>
    )
}

export default Course