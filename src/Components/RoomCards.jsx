import React, { useEffect, useState } from 'react'
import room1 from "../Img/1.jpg"
import LocationOnIcon from '@mui/icons-material/LocationOn';
import HotelIcon from '@mui/icons-material/Hotel';
import BathtubIcon from '@mui/icons-material/Bathtub';
import { NavLink } from 'react-router-dom';
// import KingBedIcon from '@mui/icons-material/KingBed';
import AddIcon from '@mui/icons-material/Add';
import HomeIcon from '@mui/icons-material/Home';
// import PaymentsIcon from '@mui/icons-material/Payments';



let b1 = {
    border : "5px solid red"
}

let b2 = {
    border : "5px solid blue"
}

let b3 = {
    border : "5px solid green"
}

let b4 = {
    border : "5px solid purple"
}

function RoomCards({data}) {
    // let [cardData, setCardData] = useState({});
    // useEffect(()=>{
    //     setCardData(data);
    //     console.log(data);
    // }, []);
    // console.log(data);
  return (
    <>
    <NavLink to={`/room/${data._id}`} className='group' >
                    <div className='shadow-lg py-[10px]  hover:scale-[1.05] duration-[.4s] ease-in-out '> {/*Room Opening Tag*/}
                        <div >
                            <img src={data.room_main_img} alt="" className='w-[100%] h-[170px]' />
                        </div>
                        <div className='px-[5px]'> {/*Room Listing Content Opening Tag*/}
                        <div className='px-[5px] my-[7px]'> {/*Title Opening Tag*/}
                            <p className='text-[.95rem] capitalize'>{data.room_title.slice(0, 40)}...</p>
                        </div> {/*Title Closing Tag*/}
                        <div className='flex items-center justify-between my-[7px] px-[5px]'> {/*Price and city Opening Tag*/}
                            <div >
                                {/* <p className='font-bold text-[.9rem]'>Rs. {data.room_price} / <span style={{color: "#EBD7B2"}} className='font-normal text-[.9rem]'>per day </span></p> */}
                                <p className='text-[.8rem]'> Rs : <span>{data.room_price} <sub className='line-through text-[#7b7b7b] font-normal'>{data.room_dis_price}</sub> per/day </span></p>
                            </div>
                            <div className='my-[5px]'>
                                <p className='text-[.8rem] capitalize' ><LocationOnIcon style={{fontSize: "1rem ", color: "#EBD7B2"}}/>{data.room_city}</p>
                            </div>
                        </div> {/*Price and city Closing Tag*/}

                        <div className='my-[10px]'> {/*address Opening Tag*/}
                            <p className='text-[.7rem] capitalize'><LocationOnIcon style={{fontSize: ".9rem ", color: "#EBD7B2"}}/>{data.room_add.slice(0,50)}...</p>
                        </div> {/*Address Closing Tag*/}
                        <hr className='my-[5px] mx-[10%] mb-[10px]' />
                        
                        <div  className='flex lg:flex-row flex-col'>
                            <div className='flex justify-between'>
                                <div className='mx-[7px]'>
                                    <p className='md:text-[.9rem] text-[.7rem] capitalize px-[5px]'><HotelIcon style={{ color: "#EBD7B2", textTransform : "capitalize"}} /> {data.room_bed}</p>
                                </div>
                                
                                <div  className='mx-[7px]'>
                                    <p className='md:text-[.9rem] text-[.7rem] capitalize'><HomeIcon style={{ color: "#EBD7B2", textTransform : "capitalize"}} /> {(data.room_type !== "standard" ? <sup><AddIcon style={{ color: "black",  fontSize: ".6rem", marginLeft : "-8px"}} /></sup> : "")} {data.room_type}</p>
                                </div>
                            </div>

                            <div  className='flex md:justify-end '>
                                <NavLink to={`/room/${data._id}`} className='mx-[10px] my-[10px] w-[100%] text-center bg-custom_camel text-custom_white px-[10px] py-[5px] rounded-[5px] duration-[.4s] ease-in-out group-hover:bg-custom_lightBrown'>Book Now</NavLink>
                            </div>
                        </div>
                        </div> {/*Room Listing Content Closing Tag*/}
                    </div> {/*Room Closing Tag*/}
                    </NavLink>
    </>
  )
}

export {RoomCards}