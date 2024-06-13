import React, { useEffect, useState } from 'react'
import { Header } from '../Components/Header'
import { RoomListingImages } from '../Components/RoomListingImages'
import hotel_logo from "../Img/hotel_logo.png";
import LocationOnIcon from '@mui/icons-material/LocationOn';
import AcUnitIcon from '@mui/icons-material/AcUnit';
import TvIcon from '@mui/icons-material/Tv';
import WifiIcon from '@mui/icons-material/Wifi';
import ElectricBoltIcon from '@mui/icons-material/ElectricBolt';
import HeatPumpIcon from '@mui/icons-material/HeatPump';
import LocalParkingIcon from '@mui/icons-material/LocalParking';
import { CameraOutdoor, CheckCircle, CreditCard, Elevator, Height, Restaurant } from '@mui/icons-material';
import { RoomCards } from '../Components/RoomCards';
import { NavLink, useParams } from 'react-router-dom';
import { useAuth } from '../Store/auth';
import { Loader } from '../Components/Loader';
import ErrorHandlingPage from './ErrorHandlingPage';
import { Footer } from '../Components/Footer';
import Modal from '@mui/material/Modal';
import loader from "../essentials/loader.gif";
import { toast } from 'react-toastify';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import HomeIcon from '@mui/icons-material/Home';
import AddIcon from '@mui/icons-material/Add';
import KingBedIcon from '@mui/icons-material/KingBed';
// import { toast } from 'react-toastify';

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
const style2 = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 150,
    p: 4,
  };
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 350,
    bgcolor: 'background.paper',
    boxShadow: 24,
    borderRadius : "10px",
    p: 2,
    height: 180
  };
  const style3 = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 350,
    bgcolor: 'background.paper',
    boxShadow: 24,
    borderRadius : "10px",
    p: 2,
    height: 340
  };

  
  const style5 = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 350,
    bgcolor: 'background.paper',
    boxShadow: 24,
    borderRadius : "10px",
    p: 2,
    height: 160
  };

  function formatDateTime(isoString) {
    const date = new Date(isoString);

    const year = date.getFullYear();
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const month = monthNames[date.getMonth()];
    const day = date.getDate();

    let hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    const strMinutes = minutes < 10 ? '0' + minutes : minutes;

    const formattedDateTime = `${year}-${month}-${day} : ${hours}:${strMinutes} ${ampm}`;
    return formattedDateTime;
}

// Usage
// const isoString = '2024-06-13T12:48:38.344+00:00';
// const formattedDateTime = formatDateTime(isoString);
// console.log(formattedDateTime);

function RoomListing() {
    let {get_token, admin_verify, getRoomsData, check, userdata, reserve, addComment} = useAuth();
    let [show, setShow] = useState(false);
    let [msg, setMsg] = useState("");
    let [status , setStatus] = useState(true);
    let [data, setData] = useState([]);
    let [moreRooms, setMoreRooms] = useState([]);
    let params = useParams();
    let [disable, setDisable] = useState(true);
    let [availibilityMsg, setAvailibilityMsg] = useState("");
    let [reservationMsg, setReservationMsg] = useState("");
    let [reservationStatus, setReservaitonStatus] = useState(true);
    let [commentStatus, setCommentStatus] = useState(true);
    let [commentMsg, setCommentMsg] = useState("");


    const [open, setOpen] = React.useState(false);
    const [open2, setOpen2] = React.useState(false);
    const [open3, setOpen3] = React.useState(false);
    const [open4, setOpen4] = React.useState(false);
    const [open5, setOpen5] = React.useState(false);
    const [open6, setOpen6] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const handleOpen2 = () => setOpen2(true);
    const handleClose2 = () => setOpen2(false);
    const handleOpen3 = () => setOpen3(true);
    const handleClose3 = () => setOpen3(false);
    const handleOpen4 = () => setOpen4(true);
    const handleClose4 = () => setOpen4(false);
    const handleOpen5 = () => setOpen5(true);
    const handleClose5 = () => setOpen5(false);
    const handleOpen6 = () => setOpen6(true);
    const handleClose6 = () => setOpen6(false);

    let [userInput, setUserInput] = useState({
        city: "",
        starting: "",
        ending: "",
        // bed :"single",
        // room: "standard"
    });
    let [user, setUser]= useState([]);
    let [reservationdet, setReservationDet] = useState({
        room_id : "",
        room_price : "",
        user_id : "",
        starting: "",
        ending: "",
        total_days : "",
        total_price: ""
    });
    let [comment, setComment] = useState({
        user_message: ""
    })
    function handleInput(e){
        let name = e.target.name;
        let value = e.target.value;
        setUserInput({
            ...userInput,
            [name] : value
        })

    };
    function handleCommentChange(e){
        let name = e.target.name;
        let value = e.target.value;
        setComment({
            ...userInput,
            [name] : value
        })
    }

    useEffect(()=>{
        window.scrollTo(0, 0);
        // let date = formatDateTime("2024-06-13T12:48:38.344+00:00");
        // console.log(date);
        async function getData(){
            setShow(false);
            try{
            let data = await getRoomsData(params.id);
            console.log(data);
            if(data.status === true || data.status){
                setData(data.data);
                setMoreRooms(data.moreRooms);
                setShow(true);
                setUserInput({
                    ...userInput,
                    city: data.data.room_city
                })
            }
            else{
                setShow(true);
                setStatus(data.status);
                setMsg(data.msg);
            }
            }
            catch(e){
                console.log("Error while fetching room data", e)
            }
        };
        getData();
    }, [params.id]);

    async function checkAvailibility(e){
        try{
            e.preventDefault();
            handleOpen3();
            let token = await get_token();
            // console.log(token)
            if(token  !== null){
                let verify = await admin_verify(token);
                console.log(verify);
                if(verify.verified=== true || verify.verified){
                    // console.log(userInput);
                    if(userInput.starting ==="" || userInput.ending === ""){
                        setDisable(true);
                        setAvailibilityMsg("Please select your Reservation Dates.");
                        handleClose3();
                        handleOpen2();
                    }
                    else{
                        let data = await check(params.id, userInput.starting, userInput.ending);
                        console.log(data);
                        if(data.status === true || data.status){
                            setDisable(false);
                        }
                        setAvailibilityMsg(data.msg);
                        handleClose3();
                        handleOpen2();
                    }
                }
                else{
                    handleClose3()
                    handleOpen();
                }
            } 
            else{
                handleClose3()
                handleOpen();
            }
        }
        catch(e){
            console.log("Wrror while checking availibily",e);
        }
    };

    async function confirmreservation(e){
        try{
            e.preventDefault();
            handleOpen3();
            let user = await userdata();
            let startDateStr = userInput.starting;
            let endDateStr = userInput.ending;

            let startDate = new Date(startDateStr);
            let endDate = new Date(endDateStr);

            let timeDifference = endDate - startDate;
            const daysDifference = timeDifference / (1000 * 60 * 60 * 24);
            let totaldays= daysDifference+1;
            setReservationDet({
                ...reservationdet,
                user_id : user.data._id,
                room_id: params.id,
                room_price : data.room_price,
                starting : userInput.starting,
                ending : userInput.ending,
                total_days: totaldays,
                total_price : ( data.room_price*totaldays)
            })
            console.log(user);
            setUser(user.data);
            handleOpen3();
            handleOpen4();
        }
        catch(e){
            console.log("Wrror while checking availibily",e);
        }
    };

    async function confirmedReservation(){
        try{
            handleClose4();
            let data = await reserve(reservationdet);
            console.log(data);
            setReservationMsg(data.msg);
            setReservaitonStatus(data.status);
            handleClose3();
            handleOpen5();
            setDisable(true);
        }
        catch(e){
            console.log("Error while reserving room", e)
        }
    }
    
    async function handleCommentSubmit(e){
        try{
            e.preventDefault();
            handleOpen3();
            let token = await get_token();
            // console.log(token)
            if(token  !== null){
                let verify = await admin_verify(token);
                console.log(verify);
                if(verify.verified=== true || verify.verified){
                    // console.log(userInput);
                    if(comment.user_message === ""){
                        alert("Enter your feedback");
                    }
                    else{
                        let token = get_token();
                        let room_id = params.id;
                        let user_message = comment.user_message;
                        console.log(token, room_id, msg);
                        let d={token,room_id,user_message}
                        let data = await addComment(d);
                        console.log(data);
                        setCommentMsg(data.msg);
                        setCommentStatus(data.status);
                        handleClose3();
                        handleOpen6();
                    }
                }
                else{
                    handleClose3()
                    handleOpen();
                }
            } 
            else{
                handleClose3()
                handleOpen();
            }
        }
        catch(e){
            console.log("Wrror while checking availibily",e);
        }
    };

  return (
    <>
    <Header />
    {
        (show)

        ?      
        <>
        {
            (status)
            ?
            <div className='pt-[37px]'> {/*Main Listing Body  Container Open*/}
        <div className='h-[90vh] grid lg:grid-cols-2 grid-cols-1'> {/*Hero Container Open*/}
            <div> {/*Image Slider Open*/}
                    <RoomListingImages data={data.room_images} />
            </div>  {/*Image Slider Close*/}

            <div className=''> {/*Reservation  Container Open*/}
                <div className='px-[3%] py-[2%]'>
                    
                <div>
                    <p className='text-[1.2rem] text-custom_darkBrown font-bold mt-[3%] capitalize'>{data.room_title}</p>
                </div>
                <div>
                    <p className="text-[.8rem] text-custom_darkBrown capitalize my-[2%]">{data.room_add}</p>
                </div>
                <div  className="flex my-[3%]">
                    <NavLink to={`/hotel/${data.hotel_data[0].hotel_id}`} className="flex my-[3%]">
                    <div>
                        <img src={data.hotel_data[0].hotel_logo} alt="" style={{border: ".1px solid #333333"}} className='w-[50px] h-[40px] mt-[5px] rounded-[100%]' />
                    </div>
                    <div className='mt-[5%]  mx-[3%]'>
                        <p className='text-[1.05rem] font-bold text-custom_darkBrown capitalize'>{data.hotel_data[0].hotel_name}</p>
                        <p className="text-[.7rem] flex text-custom_darkBrown"><LocationOnIcon style={{fontSize: ".9rem", color: "#EBD7B2"}} />{data.room_city}</p>
                    </div>
                    </NavLink>
                </div>
                <div className='mt-[3%] mb-[3%]'>
                    <p className='text-[1.2rem] font-bold text-custom_darkBrown'>Rs. {data.room_price} <span className='text-[.7rem] line-through text-custom_grey'>{data.room_dis_price} </span> / per day  </p>
                </div>
                <div className='flex justify-between p-[10px]'>
                    <div>
                        <p className='text-[.9rem] capitalize text-custom_darkBrown'> <b> <KingBedIcon style={{color: "#EBD7B2"}} /> {data.room_bed} Bed  </b></p>  
                    </div>
                    <div>
                        <p className='text-[.9rem] capitalize text-custom_darkBrown'><HomeIcon style={{ color: "#EBD7B2", textTransform : "capitalize"}} /> {(data.room_type !== "standard" ? <sup><AddIcon style={{ color: "black",  fontSize: ".6rem", marginLeft : "-8px"}} /></sup> : "")} <b> {data.room_type} Room </b></p>   
                    </div>
                </div>
                <div>
                <form onSubmit={checkAvailibility}>
                    <div className='grid lg:grid-cols-2 md:grid-cols-2 px-[5%] relative py-[10px] pb-[20px]' >
                        <div className='w-[100%] absolute h-[100%] z-[-1] bg-black opacity-[.5]'></div>
                        {/* <div className='col-span-2'>
                            <label htmlFor="city" className="text-custom_white">City
                            <input type="text" name="city" placeholder='Karachi' id='city' className='md:h-[50px] h-[40px]  px-[10px] outline-none text-custom_black md:w-[100%] ' autoComplete='off' />
                            </label>
                        </div> */}
                        <div >
                            <label htmlFor="checkin" className="text-custom_white">Check In Date:
                            <input type="date" name="starting" placeholder='Check in Date' id='checkin' onFocus={(e)=>{e.type = "date"}} className='md:h-[50px] h-[35px]  px-[10px] outline-none text-custom_black w-[100%]' value={userInput.starting} onChange={handleInput} required={true} />
                            </label>
                        </div>
                        <div >
                            <label htmlFor="checkout" className="text-custom_white">Check Out Date:
                            <input type="date" name="ending" placeholder='Check out Date' id='checkout' className='md:h-[50px] h-[35px] px-[10px] outline-none text-custom_black w-[100%]' value={userInput.ending} onChange={handleInput} required={true} />
                            </label>
                        </div>
                        {/* <div >
                            <label htmlFor="bed" className="text-custom_white">Beds
                            <select name="bed" id="bed" autoFocus={true} className='md:h-[50px] h-[40px]  px-[10px] outline-none text-custom_black w-[100%]' value={userInput.bed} onChange={handleInput} required={true} >
                                <option value="single" selected={true} className='text-custom_black'>Single bed</option>
                                <option value="double">Double bed</option>
                                <option value="master">Master bed</option>
                            </select>
                            </label>
                        </div> */}
                        
                        {/* <div >
                            <label htmlFor="roomtype" className="text-custom_white">Room Type
                            <select name="room" id="roomtype" autoFocus={true} className='md:h-[50px] h-[40px]  px-[10px] outline-none text-custom_black w-[100%]  lg:rounded-tr-[10px] lg:rounded-br-[10px]' value={userInput.room} onChange={handleInput} required={true} >
                                <option value="standard" selected={true} className='text-custom_black'>Standard Room</option>
                                <option value="luxuxry">Luxury Room</option>
                            </select>
                            </label>
                        </div> */}
                        
                        <div className='grid grid-cols-2 md:col-span-2 col-span-1 w-[100%]'>
                            

                        <div  className='flex justify-center items-center w-[100%]'>
                                <button className="bg-custom_camel mt-[20px] md:h-[50px] h-[35px] md:text-[1rem] text-[.8rem] lg:rounded-[10px] md:none rounded-[10px] w-[100%] py-[7px] duration-[.4s] ease-in-out hover:bg-custom_lightBrown text-custom_white ml-[10px]"  type='submit' onClick={checkAvailibility}>Check Availibility</button>
                        </div>
                        <div  className='flex justify-center items-center w-[100%]'>
                            {
                                (disable) 
                                ?
                                <button className={`bg-custom_grey mt-[20px] md:h-[50px] h-[35px] md:text-[1rem] text-[.8rem]  lg:rounded-[10px] md:none rounded-[10px] w-[100%] py-[7px] duration-[.4s] ease-in-out cursor-not-allowed text-custom_white ml-[10px]`} disabled >Pay and Reserve</button>
                                :
                                <button className={`bg-custom_camel mt-[20px] md:h-[50px] h-[35px] md:text-[1rem] text-[.8rem]  lg:rounded-[10px] md:none rounded-[10px] w-[100%] py-[7px] duration-[.4s] ease-in-out hover:bg-custom_lightBrown text-custom_white ml-[10px]`} onClick={confirmreservation} >Pay and Reserve</button>
                            }
                        </div>

                        </div>
                    </div>
                </form>
                </div>
                </div>
            </div>  {/*Reservation  Container Close*/}

            <div></div>
        </div> {/*Hero Container Close*/}

        <div> {/*Conteent Container Open*/}
            <div className='lg:mt-[5%] md:mt-[55%] mt-[60%] grid md:grid-cols-2 grid-cols-1 mx-[2%]'> {/*Sub Conteent 1 Container Open*/}
                <div className="p-[5px]"> {/*Description Container Open*/}
                    <p className="text-[1.3rem] font-bold ">Description</p>
                    <p className='text-[.8rem] leading-6  text-custom_darkBrown pt-[2%]  px-[5px] capitalize'>{data.room_des}</p>
                </div> {/*Description Container Close*/}
                <div className='grid grid-cols-3 p-[5px] gap-10 mt-[10%]  text-[.9rem] h-[fit-content] text-custom_darkBrown'> {/*Facilites Container Open*/}
                        <p><AcUnitIcon style={{color : "#EBD7B2",  marginRight: "5px"}} /> AC </p>
                        <p><TvIcon   style={{color : "#EBD7B2", marginRight: "5px"  }}/>TV</p>
                        <p><WifiIcon  style={{color : "#EBD7B2", marginRight: "5px"  }}/>Free Wifi</p>
                        <p><ElectricBoltIcon  style={{color : "#EBD7B2", marginRight: "5px"  }}/>Electric Backup</p>
                        <p><HeatPumpIcon  style={{color : "#EBD7B2", marginRight: "5px"  }}/>Heater</p>
                        <p><Elevator  style={{color : "#EBD7B2", marginRight: "5px"  }}/>Elevator</p>
                        <p><Restaurant  style={{color : "#EBD7B2", marginRight: "5px"  }}/>In house Resturant</p>
                        <p><CreditCard  style={{color : "#EBD7B2", marginRight: "5px"  }}/>Card Payment</p>
                        <p><CameraOutdoor  style={{color : "#EBD7B2", marginRight: "5px"  }}/>CCTV Camera</p>
                        <p><CheckCircle  style={{color : "#EBD7B2", marginRight: "5px"  }}/>Daily House Keeping</p>
                </div> {/*Facilites Container Close*/}  
            </div> {/*Sub Conteent Container 1 Close*/}

            <div className="p-[10px] mx-[2%]">  {/*Sub Conteent Container 2 Open*/}
                <div>
                    <p className="text-[1.3rem] font-bold ">Policies</p>
                </div>
                <div className="p-[10px] list-outside">
                    <ul className="text-custom_darkBrown">
                        
                    {
                        data.room_policy.map((val, i)=>{
                            return(     
                            <li className='my-[5px] list-disc capitalize text-[.8rem] leading-6' key={i}>{val}</li>
                            )
                        })
                    }
                        {/* <li className='my-[5px] list-disc'>Guests can check in using any local or outstation ID proof (PAN card not accepted).</li>
                        <li className='my-[5px] list-disc'>Only Indian Nationals allowed</li>
                        <li className='my-[5px] list-disc'>As a complimentary benefit, your stay is now insured by Acko.</li>
                        <li className='my-[5px] list-disc'>This hotel is serviced under the trade name of Hotel Lotus Palace as per quality standards of O</li> */}
                    </ul>
                </div>
            </div> {/*Sub Conteent Container 2 Close*/}

            <div>
                <div>
                    <div className='my-[10px]'> {/*Comment Form Open*/}
                        <form onSubmit={handleCommentSubmit}>
                            
                            <div className='flex justify-center items-center w-[100%]' >
                            {/* <input type="text" placeholder='Add Comment..' name='user_message'/> */}
                            <div className='w-[60%] mx-[1px]'>
                                <input type="text" name="user_message" placeholder='Add Comment..' className=' rounded-[5px] md:h-[50px] h-[40px]  px-[10px] outline-none text-custom_black w-[100%]' autoComplete='off' style={{border : "1px solid #978667"}}  onChange={handleCommentChange} value={comment.user_message}  />
                            </div>
                            <div>
                                <Button variant='outlined' onClick={handleCommentSubmit} className='md:h-[50px] h-[40px] px-[10px] text-custom_camel' style={{color: "#EBD7B2", borderColor : "#EBD7B2"}}>Submit</Button>
                            </div>
                            </div>
                        </form>
                    </div> {/*Comment Form Close*/}

                    <div> {/*Comment Section Open*/}
                        

                        <div className='p-[5px] mb-[5%]'>
                        {
                            (data.comments.length>0)
                            ?
                            <>
                                {
                                    
                            data.comments.reverse().map((val, i)=>{
                                return(
                                <>
                                    <div  className='md:mx-[5%] mx-[3%] p-[.5%] break-words text-wrap w-[70%]'>
                                        <div>
                                            <p className='text-custom_darkBrown my-[5px] capitalize'>{val.user_name} <span className='text-[.8rem] mx-[8px] text-custom_grey'>{formatDateTime(val.creationData)}</span> </p>
                                        </div>
                                        <div>
                                            <p className='text-custom_darkBrown my-[5px] text-[.9rem]'>{val.user_message}</p>
                                        </div>
                                    </div>
                                    <hr className='text-[2rem] border-[.5px] w-[60%] md:mx-[5%] mx-[3%] border-custom_darkBrown' />
                                </>
                                )
                            })
                                }
                            </>
                            :
                            <p className='text-custom_darkBrown my-[5px] capitalize mx-[5%]'> No Comments. </p>
                        }
                          </div>
                    </div> {/*Comment Section Close*/}
                </div>
            </div>

            <div> {/*Sub Conteent Container 3 Open*/}
                <div className="p-[10px] mx-[2%]">
                <p className="text-[1.5rem] font-bold ">Rooms Nearby</p>
                </div>

                <div  className='grid  md:grid-cols-4 grid-cols-2  p-[10px] gap-2 md:px-[40px] px-[2px]'>
                    {
                        moreRooms.map((val, i)=>{
                            return(
                                <RoomCards data={val} key={i} />   
                            )
                        })
                    }
                </div>
            </div> {/*Sub Conteent Container 3 Close*/}

           

            
        </div> {/*Conteent Container Close*/}
    </div> //{/*Main Listing Body  Container Close*/}
            :
            
            <ErrorHandlingPage msg={msg} />
        }
            
        </>

        :
        <Loader />
    }
    <Footer />
    
    <Modal
        open={open3}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style2}>
          <img src={loader} alt="" />
        </Box>
      </Modal>

      <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                <div>
                    <p className='text-[1.2rem] font-bold'> You are not Logged in</p>
                    <p className='text-[.9rem]'>Please login to your account to confirm your Reservation.</p>
                </div>
                    <div className='my-[20px] flex justify-end'>
                        <Button variant="outlined" style={{margin: "0px 10px", borderColor: "gray", color: "gray"}} onClick={handleClose}>Later</Button>
                        <NavLink to={"/login"}><Button variant="contained" style={{backgroundColor : "#EBD7B2"}} >Login</Button></NavLink> 
                    </div>
                </Box>
            </Modal>

            <Modal
                open={open2}
                onClose={handleClose2}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                <div>
                    <p className='text-[1.2rem] font-bold'>Availibility Status</p>
                    <p className='text-[.9rem]'>{availibilityMsg}</p>
                </div>
                    <div className='my-[20px] flex justify-end'>
                        <Button variant="outlined" style={{margin: "0px 10px", borderColor: "gray", color: "gray"}} onClick={handleClose2}>Ok</Button>
                        {/* <NavLink to={"/login"}><Button variant="contained" style={{backgroundColor : "#EBD7B2"}} >Login</Button></NavLink>  */}
                    </div>
                </Box>
            </Modal>

            <Modal
                open={open5}
                onClose={handleClose5}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style5}>
                <div>
                    {(reservationStatus)
                    ?
                    <>
                    <p className='text-[1.2rem] font-bold'><CheckCircle style={{ color :"green"}} /> Reservation Confirmed. </p>
                    <p className='text-[.9rem] my-[5px] mx-[25px]'>{reservationMsg}</p>
                    </>
                    :
                    <>
                    <p className='text-[1.2rem] font-bold'><CancelIcon style={{color: "red"}} /> Reservation Confirmed. </p>
                    <p className='text-[.9rem] my-[5px] mx-[25px]'>{reservationMsg}</p>
                    </>
                    }
                </div>
                    <div className='my-[20px] flex justify-end'>
                        <Button variant="outlined" style={{margin: "0px 10px", borderColor: "gray", color: "gray"}} onClick={handleClose5}>Ok</Button>
                        {/* <NavLink to={"/login"}><Button variant="contained" style={{backgroundColor : "#EBD7B2"}} >Login</Button></NavLink>  */}
                    </div>
                </Box>
            </Modal>

            
            <Modal
                open={open6}
                onClose={handleClose6}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style5}>
                <div>
                    {(commentStatus)
                    ?
                    <>
                    <p className='text-[1.2rem] font-bold'><CheckCircle style={{ color :"green"}} /> Feedback Submitted. </p>
                    <p className='text-[.9rem] my-[5px] mx-[25px]'>{commentMsg}</p>
                    <div className='my-[20px] flex justify-end'>
                        <Button variant="outlined" style={{margin: "0px 10px", borderColor: "gray", color: "gray"}} onClick={()=>{handleClose6(); window.location.reload();}}>Ok</Button>
                        {/* <NavLink to={"/login"}><Button variant="contained" style={{backgroundColor : "#EBD7B2"}} >Login</Button></NavLink>  */}
                    </div>
                    </>
                    :
                    <>
                    <p className='text-[1.2rem] font-bold'><CancelIcon style={{color: "red"}} /> Feedback Submission Failed. </p>
                    <p className='text-[.9rem] my-[5px] mx-[25px]'>{commentMsg}</p>
                    <div className='my-[20px] flex justify-end'>
                        <Button variant="outlined" style={{margin: "0px 10px", borderColor: "gray", color: "gray"}} onClick={()=>{handleClose6();}}>Ok</Button>
                        {/* <NavLink to={"/login"}><Button variant="contained" style={{backgroundColor : "#EBD7B2"}} >Login</Button></NavLink>  */}
                    </div>
                    </>
                    }
                </div>
                </Box>
            </Modal>




            <Modal
                open={open4}
                onClose={handleClose4}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style3}>
                <div>
                    <p className='text-[1.2rem] font-bold my-[5px]'>Reservation Details.</p>
                    <p className='text-[.9rem] my-[2px]'><b>Name</b>: {user.name}</p>
                    <p className='text-[.9rem] my-[2px]'><b>Email:</b> {user.email}</p>
                    <p className='text-[.9rem] my-[2px]'><b>Phone No:</b> {user.phone}</p>
                    <p className='text-[.9rem] my-[2px]'><b>CINC No:</b> {user.cnic}</p>
                    <p className='text-[.9rem] my-[2px]'><b>Starting Date:</b> {userInput.starting}</p>
                    <p className='text-[.9rem] my-[2px]'><b>Ending / Departure Date:</b> {userInput.ending}</p>
                    <p className='text-[.9rem] my-[2px]'><b>Room Price (Per Day):</b> {data.room_price}</p>
                    <p className='text-[.9rem] my-[2px]'><b>Total Days:</b> {reservationdet.total_days}</p>
                    <p className='text-[.9rem] my-[2px]'><b>Total Price:</b> {reservationdet.total_price}</p>
                </div>
                    <div className='my-[20px] flex justify-end'>
                        <Button variant="outlined" style={{margin: "0px 10px", borderColor: "#978667", color: "#978667",}} onClick={confirmedReservation}>Confirm </Button>
                        {/* <NavLink to={"/login"}><Button variant="contained" style={{backgroundColor : "#EBD7B2"}} >Login</Button></NavLink>  */}
                    </div>
                </Box>
            </Modal>
    </> 
  )
}

export {RoomListing}