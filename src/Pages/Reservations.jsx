import React, { useEffect, useState } from 'react'
import { Header } from '../Components/Header'
import img from "../Img/1.jpg";
import hotel_logo from "../Img/hotel_logo.png";
import LocationOnIcon from '@mui/icons-material/LocationOn';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../Store/auth';
import { Loader } from '../Components/Loader';
import ErrorHandlingPage from './ErrorHandlingPage';

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

function Reservations() {
    let {get_token, admin_verify, reservationHistory} = useAuth();
    let [show, setShow] = useState(false);
    let [status, setStatus] = useState(true);
    let [msg, setMsg] = useState(""); 
    let [data, setData] = useState([]);
    let navigate = useNavigate();
    useEffect(()=>{
        window.scrollTo(0, 0);
        async function getData(){
            try{
                let token = await get_token();
                // console.log(token);
                if(token  !== null){
                    let data = await admin_verify();
                    // console.log(data);
                    if(data.verified=== true || data.verified){
                        let data = await reservationHistory();
                        console.log(data);
                        if(data.status === true || data.status){
                            setData(data.data);
                            setShow(true);
                        }
                        else{
                            setMsg(data.msg);
                            setStatus(data.status);
                            setShow(true);
                        }
                    }}

                    else{
                        setShow(true);
                        navigate("/login");
                    }
            }
            catch(e){
                console.log("Error while finding reservation data", e);
            }
        };
        getData();
    }, [])
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
                    <div className='py-[60px] min-h-[80vh] '>
        <div> {/*Reservation list open */}
            {
                data.map((val, i)=>{
                    return(
                        <div className='grid md:grid-cols-3 grid-cols-1 my-[3%] p-[10px] mx-[5] shadow-lg rounded-[10px]'>
                <div className='flex justify-center'>
                    <img src={val.room_main_img} alt="" className='w-[300px]' />
                </div>
                <div className='p-[5%] gap-5'>
                    <div className='my-[2%]'>
                        <p className='font-bold'>Reservation ID : <span className='font-normal text-[.9rem]'>{val._id}</span></p>
                    </div>
                    <div className='my-[2%]'>
                        <p className='font-bold'>Reservation Status : <span className={`font-normal text-[.9rem] capitalize ${(val.reservation_status === "pending" || val.reservation_status === "cancelled" ? "text-red-600" : "text-green-600")}`}>{val.reservation_status}</span></p>
                    </div>
                    
                    <div className='my-[2%]'>
                        <p className='font-bold'>Arriving Date : <span className='font-normal'>{val.starting}</span></p>
                    </div>
                    
                    <div className='my-[2%]'>
                        <p className='font-bold'>Departure Date : <span className='font-normal'>{val.ending}</span></p>
                    </div>
                    
                    
                    <div className='my-[2%]'>
                        <p className='font-bold'>Total Days: <span className='font-normal'>{val.total_days}</span></p>
                    </div>

                    <div className='my-[2%]'>
                        <p className='font-bold'>Total Price: <span className='font-normal'>{val.total_price}</span></p>
                    </div>

                </div>
                <div className='p-[10px] justify-center items-end'>
                    {/* <div>
                    <p className='text-[1.05rem] font-bold mt-[3%] capitalize'>{val.room_title}</p>
                    </div> */}
                <div className='md:mt-[50%]  mx-[3%]'>
                    <Stack spacing={2} direction="row">
                        <NavLink to={`/room/${val.room_id}`} className="w-[100%]"><Button variant="contained" style={{backgroundColor : "#EBD7B2", borderRadius : "10px", margin : "0px 5px", width : "100%"}} > View Room </Button></NavLink> 
                        </Stack>
                </div>
                </div>
            </div>
                    )
                })
            }
            
        </div> {/*Reservation list close */}

    </div>
                </>

                :
                <ErrorHandlingPage msg={msg} />
            }
        </>
        :
        <Loader />
    }
    
    </>
  )
}

export {Reservations}