import React, {useState} from 'react'
import {Header} from './Header'
import video from "../video/sunset.mp4"
import { RoomCards } from './RoomCards';
import { NavLink, useNavigate, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { useAuth } from '../Store/auth';
import { Loader } from './Loader';
import { Footer } from './Footer';
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import banner from "../Img/banner.jfif";
import banner2 from "../Img/banner2.jpg";
import map from "../Img/map.png";
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

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

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: "70vw",
    bgcolor: 'background.paper',
    border: '0px',
    outline: "0px",
    boxShadow: 24,
    background : banner2
  };

function HeroAndHeader() { 
    let navigate = useNavigate();
    let [show, setShow] = useState(false);
    let [userInput, setUserInput] = useState({
    city: "karachi",
    starting: "",
    ending: "",
    bed :"single",
    room: "standard"
});

let {get_token, admin_verify, HomeData} = useAuth();
let [karachi, setKarachi]= useState([]);
let [lahore, setLahore]= useState([]);
let [islamabad, setIslamabad]= useState([]);
let [rawalpindi, setRawalpindi]= useState([]);
let [allData, setAllData]= useState([]);

const [open, setOpen] = React.useState(false);
const handleOpen = () => setOpen(true);
const handleClose = () => setOpen(false);

let params= useParams();

function handleInput(e){
    let name = e.target.name;
    let value = e.target.value;
    setUserInput({
        ...userInput,
        [name] : value
    })
}

function handleSubmit(e){
    e.preventDefault();
    console.log(userInput);
    navigate(`/search/${userInput.city}/${userInput.starting}/${userInput.ending}/${userInput.bed}/${userInput.room}/`)
    handleClose();
}

useEffect(()=>{
    async function getHomeData(){
        window.scrollTo(0, 0);
        try{
            setShow(false);
            let data = await HomeData();
            // console.log(data)
            setShow(true);
            setKarachi(data.karachi);
            setLahore(data.lahore);
            setIslamabad(data.islamabad);
            setRawalpindi(data.rawalpindi);
            setAllData(data.allData);
            handleOpen();
        }
        catch(e){
            console.log("Error while fetching Home apge data", e)
        }
    };
    getHomeData();
}, [window.location.href]);
  return (
    <>
    <div>

    {
        (show)

        ?
        <>
        <div> {/* Body Open Tag  */}
        <div className=" relative mt-[0vh]"> {/* Header and Hero Open Tag */}
        <video src={video} muted autoPlay loop className='absolute z-[-1] md:h-[100vh] h-[120vh] object-cover w-[100vw] '> </video>
        <div className='pt-[80px]'>
            
         <Header />
            <div  className='h-[85vh] pt-[5%] pb-[1%]'>
                <div>
                    <p className='text-custom_lightBrown text-center'>LUXURY HOTEL EXPERIENCE</p>
                </div>
                
                <div className='mx-[20%]'>
                    <p className='lg:text-[3rem] md:text-[2rem] text-[1.5rem] text-custom_white text-center'>A UNIQUE EXPERIENCE WHERE TO STAY</p>
                </div>
    
                <div>
                    <form onSubmit={handleSubmit}>
                        <div className='grid lg:grid-cols-6 md:grid-cols-3 grid-cols-2 px-[5%] relative py-[10px] pb-[20px] mx-[5%]' >
                            <div className='w-[100%] absolute h-[100%] z-[-1] bg-black opacity-[.5]'></div>
                            {/* <div className='md:col-span-1 col-span-2'>
                                <label htmlFor="city" className="text-custom_white">City
                                <input type="text" name="city" placeholder='Karachi' id='city' className='md:h-[50px] h-[40px]  px-[10px] outline-none text-custom_black w-[100%] lg:rounded-tl-[10px] lg:rounded-bl-[10px]' autoComplete='off'  value={userInput.city} onChange={handleInput} required />
                                </label>
                            </div> */}

                            
                        <div className='md:col-span-1 col-span-2'>
                                    <label htmlFor="roomtype" className="text-custom_white">City
                                    <select name="city" id="city" autoFocus={true} className='md:h-[50px] h-[40px]  px-[10px] outline-none text-custom_black w-[100%]  lg:rounded-tl-[10px] lg:rounded-bl-[10px]' value={userInput.city} onChange={handleInput} required >
                                        <option value="karachi" selected={true} className='text-custom_black'>Karachi</option>
                                        <option value="lahore">Lahore</option>
                                        <option value="islamabad">Islamabad</option>
                                        <option value="rawalpindi">Rawalpindi</option>
                                        {/* <option value="lahore">Lahore</option> */}
                                    </select>
                                    </label>
                        </div>
                            <div >
                                <label htmlFor="checkin" className="text-custom_white">Check In Date:
                                <input type="date" name="starting" placeholder='Check in Date' id='checkin' onFocus={(e)=>{e.type = "date"}} className='md:h-[50px] h-[40px]  px-[10px] outline-none text-custom_black w-[100%]'  value={userInput.starting} onChange={handleInput} required />
                                </label>
                            </div>
                            <div >
                                <label htmlFor="checkout" className="text-custom_white">Check Out Date:
                                <input type="date" name="ending" placeholder='Check out Date' id='checkout' className='md:h-[50px] h-[40px] px-[10px] outline-none text-custom_black w-[100%]'  value={userInput.ending} onChange={handleInput} required  />
                                </label>
                            </div>
                            <div >
                                <label htmlFor="bed" className="text-custom_white">Beds
                                <select name="bed" id="bed" autoFocus={true} className='md:h-[50px] h-[40px]  px-[10px] outline-none text-custom_black w-[100%]'  value={userInput.bed} onChange={handleInput} required >
                                    <option value="single" selected={true} defaultValue={"true"} className='text-custom_black'>Single bed</option>
                                    <option value="duble">Double bed</option>
                                    <option value="master">Master bed</option>
                                </select>
                                </label>
                            </div>
                            <div >
                                <label htmlFor="roomtype" className="text-custom_white">Room Type
                                <select name="room" id="roomtype" autoFocus={true} className='md:h-[50px] h-[40px]  px-[10px] outline-none text-custom_black w-[100%]  lg:rounded-tr-[10px] lg:rounded-br-[10px]'  value={userInput.room} onChange={handleInput} required >
                                    <option value="standard" selected={true} defaultValue={"true"} className='text-custom_black'>Standard Room</option>
                                    <option value="luxuxry">Luxury Room</option>
                                </select>
                                </label>
                            </div>
    
                            <div  className='flex justify-center items-center md:col-span-1 col-span-2'>
                                <button className="bg-custom_camel mt-[20px] md:h-[50px] h-[40px]  lg:rounded-[10px] md:none rounded-[10px] w-[100%] py-[7px] duration-[.4s] ease-in-out hover:bg-custom_lightBrown text-custom_white ml-[10px]">Search</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
        </div>
    
        <div>
        
        </div>{/* Header and Hero Close Tag */}

        <div className='mt-[5vh]'>
                <div>
                    <div>
                        <img src={banner} alt="" />
                    </div>
                </div>
        </div>
    
        <div> {/* Body Content Open Tag */}
            <div>
                <div className='py-[20px] px-[5px] bg-custom_lightCamel'>   {/* City Open Tag */}
                    <div>
                        <p className='text-custom_lightBrown text-[1.2rem] '>Karachi</p>
                    </div>
                    <div>
                        <p className='text-custom_black text-[1.8em] font-bold'>Rooms & Suites</p>
                    </div>
    
                    <div className='grid  lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 p-[10px] gap-2 '> {/*Rooms Opening Tag*/}
                        {
                            karachi.map((val, i)=>{
                                return(
                                <RoomCards data={val} key={i} />
                                )
                            })
                        }

                    </div> {/*Rooms Closing Tag*/}
                    <div className='flex justify-center items-center'> 
                         <NavLink to="/search/room/karachi" className='sm:w-[30vw] w-[40vw] block md:mx-[40vw] mx-[30vw] text-center my-[20px] bg-custom_camel text-custom_white duration-[.4s] rounded-[5px] hover:bg-custom_lightBrown py-[5px]'>More Rooms in Karachi <ArrowRightAltIcon/> </NavLink>
                    </div>
                </div> {/*City Closing Tag*/}
    
                <div className='py-[20px] px-[5px] bg-custom_lightCamel'>   {/* City Open Tag */}
                    <div>
                        <p className='text-custom_lightBrown  text-[1.2rem] '>Lahore</p>
                    </div>
                    <div>
                        <p className='text-custom_black text-[1.8em] font-bold'>Rooms & Suites</p>
                    </div>
    
                    <div className='grid  lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 p-[10px] gap-2 '> {/*Rooms Opening Tag*/}
                    
                    {
                            lahore.map((val, i)=>{
                                return(
                                <RoomCards data={val} key={i} />
                                )
                            })
                        }
    
                            
                    </div> {/*Rooms Closing Tag*/}
                    <div className='flex justify-center items-center'> 
                         <NavLink to="/search/room/lahore" className='w-[30vw] block md:mx-[40vw] mx-[30vw] text-center my-[20px] bg-custom_camel text-custom_white duration-[.4s] rounded-[5px] hover:bg-custom_lightBrown py-[5px]'>More Rooms in Lahore <ArrowRightAltIcon/> </NavLink>
                    </div>
                </div> {/*City Closing Tag*/}
    
                <div  className='py-[20px] px-[5px] bg-custom_lightCamel'>   {/* City Open Tag */}
                    <div>
                        <p className='text-custom_lightBrown  text-[1.2rem] '>Islamabad</p>
                    </div>
                    <div>
                        <p className='text-custom_black text-[1.8em] font-bold'>Rooms & Suites</p>
                    </div>
    
                    <div  className='grid  lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 p-[10px] gap-2 '> {/*Rooms Opening Tag*/}
                    
                    {
                            islamabad.map((val, i)=>{
                                return(
                                <RoomCards data={val} key={i} />
                                )
                            })
                        }
    
                    </div> {/*Rooms Closing Tag*/}
                    
                    <div className='flex justify-center items-center'> 
                         <NavLink to="/search/room/islamabad" className='w-[30vw] block md:mx-[40vw] mx-[30vw] text-center my-[20px] bg-custom_camel text-custom_white duration-[.4s] rounded-[5px] hover:bg-custom_lightBrown py-[5px]'>More Rooms in Islamabad <ArrowRightAltIcon/> </NavLink>
                    </div>
                </div> {/*City Closing Tag*/}
    
                <div  className='py-[20px] px-[5px] bg-custom_lightCamel'>   {/* City Open Tag */}
                    <div>
                        <p className='text-custom_lightBrown  text-[1.2rem] '>Rawalpindi</p>
                    </div>
                    <div>
                        <p className='text-custom_black text-[1.8em] font-bold'>Rooms & Suites</p>
                    </div>
    
                    <div  className='grid  lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 p-[10px] gap-2 '> {/*Rooms Opening Tag*/}
                    {
                            rawalpindi.map((val, i)=>{
                                return(
                                <RoomCards data={val} key={i} />
                                )
                            })
                        }
    
                    </div> {/*Rooms Closing Tag*/}
                    
                    <div className='flex justify-center items-center'> 
                         <NavLink to="/search/room/rawalpindi" className='w-[30vw] block md:mx-[40vw] mx-[30vw] text-center my-[20px] bg-custom_camel text-custom_white duration-[.4s] rounded-[5px] hover:bg-custom_lightBrown py-[5px]'>More Rooms in Rawalpindi <ArrowRightAltIcon/> </NavLink>
                    </div>
                </div> {/*City Closing Tag*/}
    
                <div> {/*More Rooms Opening  Tag*/}
                <div  className='py-[20px] px-[5px] bg-custom_lightCamel'>   {/* City Open Tag */}
                    <div>
                        <p className='text-custom_lightBrown  text-[1.2rem] '>More Rooms</p>
                    </div>
    
                    <div  className='grid  lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 p-[10px] gap-2 '> {/*Rooms Opening Tag*/}
                    
                    {
                            allData.map((val, i)=>{
                                return(
                                <RoomCards data={val} key={i} />
                                )
                            })
                        }
    
                    </div> {/*Rooms Closing Tag*/}
                    <div className='flex justify-center items-center'> 
                         <NavLink to="/search/room/all" className='w-[30vw] block md:mx-[40vw] mx-[30vw] text-center my-[20px] bg-custom_camel text-custom_white duration-[.4s] rounded-[5px] hover:bg-custom_lightBrown py-[5px]'>See All Rooms <ArrowRightAltIcon/> </NavLink>
                    </div>
                </div> {/*City Closing Tag*/}
                </div> {/*More Rooms Closing  Tag*/}

                <div>
                    <div className='grid sm:grid-cols-2 grid-cols-1 p-[10px]'>
                        <div>
                        <img src={map} alt="" className='' />
                        </div>
                        <div className='p-[10px]'>
                        <p className='text-[1.5rem] my-[10px] font-bold'>There is a Paradise around, Always.</p>
                        <p className='my-[10px]'>More Destinations. More Ease. More Affordable</p>

                        <div className='flex gap-4'>
                            <div>
                                <p className='text-[2rem] font-bold'>35+</p>
                                <p className='text-custom_grey'>Countries</p>
                            </div>
                            <div>
                                <p className='text-[1.8rem] font-bold'>174,000+</p>
                                <p className='text-custom_grey'>Hotels and Homes</p>
                            </div>
                        </div>
                        <div className='grid grid-cols-3'>
                            <p className='my-[10px]'><FiberManualRecordIcon style={{color: "green", fontSize: ".8rem"}}  />  Indonesia</p>
                            <p className='my-[10px]'><FiberManualRecordIcon style={{color: "red", fontSize: ".8rem"}}  />  Malaysia</p>
                            <p className='my-[10px]'><FiberManualRecordIcon style={{color: "orange", fontSize: ".8rem"}}  />  Denmark</p>
                            <p className='my-[10px]'><FiberManualRecordIcon style={{color: "skyblue", fontSize: ".8rem"}}  />  US</p>
                            <p className='my-[10px]'><FiberManualRecordIcon style={{color: "pink", fontSize: ".8rem"}}  />  UK</p>
                            <p className='my-[10px]'><FiberManualRecordIcon style={{color: "purple", fontSize: ".8rem"}}  />  Netherlands</p>
                        </div>
                        </div>
                    </div>
                </div>
            </div>
    
    
        </div> {/* Body Content Close Tag */}
        </div> //{/* Body Close Tag */}
        
        <Footer/>
        </>
        :
        <Loader />
    }
    
    </div>    

    </>
  )
}

export {HeroAndHeader}