import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaStar } from "react-icons/fa";
import { GiConfirmed } from "react-icons/gi";
import { FcCancel } from "react-icons/fc";
import { userDataContext } from '../Context/UserContext';
import { listingDataContext } from '../Context/ListingContext';
import { bookingDataContext } from '../Context/BookingContext';

function Card({ title, landMark, city, image1, image2, image3, rent, id, ratings, isBooked, host }) {
    const navigate = useNavigate();
    const { userData } = useContext(userDataContext);
    const { handleViewCard } = useContext(listingDataContext);
    const { cancelBooking } = useContext(bookingDataContext);
    const [popUp, setPopUp] = useState(false);

    // Click on card
    const handleClick = () => {
        if (userData) {
            handleViewCard(id);
        } else {
            navigate("/login");
        }
    };

    // Check if current user booked this listing
    const isBookedByUser = userData && userData.booking?.some(b => b._id === id);

    return (
        <div
            className='w-[330px] max-w-[85%] h-[460px] flex flex-col rounded-lg cursor-pointer relative z-[10]'
            onClick={handleClick}
        >
            {/* Booked Badge */}
            {isBooked && (
                <div className='text-[green] bg-white rounded-lg absolute flex items-center justify-center right-1 top-1 gap-[5px] p-[5px]'>
                    <GiConfirmed className='w-[20px] h-[20px] text-[green]' /> Booked
                </div>
            )}

            {/* Cancel button if user booked */}
            {isBookedByUser && (
                <div
                    className='text-[red] bg-white rounded-lg absolute flex items-center justify-center right-1 top-[50px] gap-[5px] p-[5px]'
                    onClick={(e) => { e.stopPropagation(); setPopUp(true); }}
                >
                    <FcCancel className='w-[20px] h-[20px]' /> Cancel Booking
                </div>
            )}

            {/* Cancel Confirmation Popup */}
            {popUp && (
                <div
                    className='w-[300px] h-[100px] bg-[#ffffffdf] absolute top-[110px] left-[13px] rounded-lg flex flex-col items-center justify-center p-[10px]'
                    onClick={(e) => e.stopPropagation()}
                >
                    <div className='text-[#2e2d2d] text-[20px]'>Booking Cancel!</div>
                    <div className='flex items-center gap-[10px] text-[#986b6b] font-semibold mt-[5px]'>
                        <span>Are you sure?</span>
                        <button
                            className='px-[20px] bg-red-500 text-white rounded-lg hover:bg-red-700'
                            onClick={() => { cancelBooking(id); setPopUp(false); }}
                        >
                            Yes
                        </button>
                        <button
                            className='px-[10px] bg-red-500 text-white rounded-lg hover:bg-red-700'
                            onClick={() => setPopUp(false)}
                        >
                            No
                        </button>
                    </div>
                </div>
            )}

            {/* Images */}
            <div className='w-[100%] h-[67%] rounded-lg overflow-hidden flex'>
                {image1 && <img src={image1} alt="" className='w-[100%] flex-shrink-0' />}
                {image2 && <img src={image2} alt="" className='w-[100%] flex-shrink-0' />}
                {image3 && <img src={image3} alt="" className='w-[100%] flex-shrink-0' />}
            </div>

            {/* Details */}
            <div className='w-[100%] h-[33%] py-[20px] flex flex-col gap-[2px]'>
                <div className='flex items-center justify-between text-[18px]'>
                    <span className='w-[80%] text-ellipsis overflow-hidden font-semibold text-nowrap text-[#4a3434]'>
                        In {landMark?.toUpperCase()}, {city?.toUpperCase()}
                    </span>
                    <span className='flex items-center justify-center gap-[5px]'>
                        <FaStar className='text-[#eb6262]' /> {ratings || 0}
                    </span>
                </div>
                <span className='text-[15px] w-[80%] text-ellipsis overflow-hidden text-nowrap'>
                    {title?.toUpperCase()}
                </span>
                <span className='text-[16px] font-semibold text-[#986b6b]'>₹{rent}/day</span>
            </div>
        </div>
    );
}

export default Card;
