import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { FaArrowLeftLong } from "react-icons/fa6";
import { userDataContext } from "../Context/UserContext";
import Card from "../Component/Card";

function MyBooking() {
  const navigate = useNavigate();
  const { userData } = useContext(userDataContext);

  return (
    <div className="w-[100vw] min-h-[100vh] flex items-center justify-start flex-col gap-[50px] relative px-[20px]">
      
      {/* Back button */}
      <div
        className="w-[50px] h-[50px] bg-red-500 cursor-pointer absolute top-[10%] left-[20px] rounded-full flex items-center justify-center"
        onClick={() => navigate("/")}
      >
        <FaArrowLeftLong className="w-[25px] h-[25px] text-white" />
      </div>

      {/* Page title */}
      <div className="w-[60%] h-[10%] border-2 border-[#908c8c] p-[15px] flex items-center justify-center text-[30px] rounded-md text-[#613b3b] font-semibold mt-[50px] md:w-[600px] text-nowrap">
        MY BOOKING
      </div>

      {/* Booking cards */}
      <div className="w-[100%] h-[90%] flex items-center justify-center gap-[25px] flex-wrap mt-[30px]">
        {userData?.booking?.length > 0 ? (
          userData.booking.map((list) => (
            <Card
              key={list._id || list.id}
              title={list.title}
              landMark={list.landMark}
              city={list.city}
              image1={list.image1}
              image2={list.image2}
              image3={list.image3}
              rent={list.rent}
              id={list._id}
              isBooked={list.isBooked}
              ratings={list.ratings}
              host={list.host}
              userId={list.userId} // ✅ Pass userId to Card for cancel button
            />
          ))
        ) : (
          <div className="text-[#613b3b] text-[20px] font-semibold mt-[50px]">
            No bookings found.
          </div>
        )}
      </div>
    </div>
  );
}

export default MyBooking;
