import React, { useEffect, useState } from 'react'
import { Header } from '../Components/Header';
import img from "../Img/1.jpg";
import hotel_logo from "../Img/hotel_logo.png";
import { useNavigate, useParams } from 'react-router-dom';
import { RoomCards } from '../Components/RoomCards';
import { Loader } from '../Components/Loader';
import { useAuth } from '../Store/auth';
import ErrorHandlingPage from './ErrorHandlingPage';
import { Footer } from '../Components/Footer';

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
function Hotel() {
    let navigate = useNavigate();
    let params = useParams();
    
    let [show, setShow]= useState(false);
    let {get_token, admin_verify, getHotelData} = useAuth();
    let [data, setData] = useState([]);
    let [status, setStatus] = useState(true);
    let [msg, setMsg] = useState("");
    let [rooms, setRooms] = useState([]);
    useEffect(()=>{
        window.scrollTo(0, 0);
        async function getData(){
            try{
                let data = await getHotelData(params.id);
                console.log(data);
                setData(data.data);
                setStatus(data.status);
                setMsg(data.msg);
                setRooms(data.rooms);
                setShow(true);
            }
            catch(e){
                console.log("Error while finding Hotel Data", e)
            }
        };
        getData();
    }, []);

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
            <> 
                <div className='py-[40px] min-h-[80vh] '>
        <div className='relative'> {/*Hotel Content open*/}
            <div>
                <img src={img} alt="" className='h-[200px]  object-cover w-[100%]' />
                <div>
                     <img src={data.hotel_logo} alt="" style={{border: ".1px solid #333333"}} className='absolute md:top-[100px] sm:top-[120px] top-[120px] md:left-[45%] sm:left-[40%] left-[38%] md:w-[120px] sm:w-[100px] md:h-[120px] sm:h-[100px] w-[100px] h-[100px] object-cover rounded-[100%]' />
                </div>
            </div>

            <div className='grid md:grid-cols-3 grid-cols-1 gap-2 p-[10px] sm:mt-[2vh] '> {/*Hotel Rooms and Details Open*/}
                <div className='grid col-span-1 h-[fit-content] p-[10px] rounded-[5px] shadow-md sm:mt-[2vh] mt-[5vh]'>
                    <div> 
                        <p className='font-bold text-[.95rem]'>Hotel Name: <span className=' text-custom_lightBrown font-normal capitalize'> {data.hotel_name}</span></p>
                        <p className='font-bold text-[.95rem]'>Hotel Contact No: <span className=' text-custom_lightBrown font-normal capitalize'> {data.hotel_contact_no}</span></p>
                        <p className='font-bold text-[.95rem]'>Hotel Email: <span className=' text-custom_lightBrown font-normal capitalize'> {data.hotel_email}</span></p>
                        <p className='font-bold text-[.95rem]'>City: <span className=' text-custom_lightBrown font-normal capitalize'>{data.hotel_city}</span></p>
                        <p className='font-bold text-[.95rem]'>Total Rooms: <span className=' text-custom_lightBrown font-normal'>{rooms.length}</span></p>
                        <p className='font-bold text-[.95rem] break-words text-wrap'>Address: <span className=' text-custom_lightBrown font-normal capitalize'>{data.hotel_add} </span></p>
                    </div>
                </div>
                <div className='grid col-span-2 lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-3 p-[10px]'>
                    {
                        rooms.map((val, i)=>{
                            return(
                                <RoomCards data={val} key={i} />
                            )
                        })                        
                    }
                </div>
            </div> {/*Hotel Rooms and Details  close*/}
        </div> {/*Hotel Content close*/}
    </div>
            </>

            :
            // <ErrorHandlingPage />
            ""
        }
        </>
        :
        <Loader />
    }
    <Footer />
    </>
  )
}

export {Hotel}