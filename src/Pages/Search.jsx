import React, { useEffect, useState } from 'react'
import {Header} from "../Components/Header";
import { RoomCards } from '../Components/RoomCards';
import { useParams, useNavigate } from 'react-router-dom';
import { Footer } from '../Components/Footer';
import { Loader } from '../Components/Loader';
import { useAuth } from '../Store/auth';
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
function Search() {
    let navigate = useNavigate();
    let {city, starting, ending, bed, room} = useParams();
    let {get_token, admin_verify, search} = useAuth();
    let [show, setShow] = useState(false);
    let [data, setData] = useState([]);
    let [status, setStatus] = useState(true);
    let [msg, setMsg] = useState("");
    useEffect(()=>{
        console.log(city);
    },[city, starting, ending, bed, room]);

    let [userInput, setUserInput] = useState({
        city: "karachi",
        starting: " ",
        ending: " ",
        bed :"single",
        room: "standard"
    })

    function handleInput(e){
        let name = e.target.name;
        let value = e.target.value;
        setUserInput({
            ...userInput,
            [name] : value
        })
    }

    async function handleSubmit(e){
        try{
            e.preventDefault();
            console.log(userInput);
            navigate(`/search/${userInput.city}/${userInput.starting}/${userInput.ending}/${userInput.bed}/${userInput.room}/`);
        }
        catch(e){
            console.log("Error while searchin data", e)
        }
    }

    useEffect(()=>{
        async function getData(){
            try{
                setShow(false);
                let data = await search(city, starting, ending,bed,room);
                console.log(data);
                setData(data.data);
                setMsg(data.msg);
                setStatus(data.status);
                setShow(true);

            }
            catch(e){
                console.log("Error while searching data", e)
            }
        };
        getData();
    }, [city, starting, ending, bed, room])

  return (
    <>
    <Header />
    {
        (show)
        ?
        <>
        
            <div className='py-[65px] min-h-[80vh] '>
    <div>
                <form onSubmit={handleSubmit}>
                    <div className='grid lg:grid-cols-6 md:grid-cols-3 grid-cols-2 px-[5%] relative py-[10px] pb-[20px] mx-[2%]' >
                        <div className='w-[100%] absolute h-[100%] z-[-1] bg-black opacity-[.5]'></div>
                        {/* <div >
                            <label htmlFor="city" className="text-custom_white">City
                            <input type="text" name="city" placeholder='Karachi' id='city' className='md:h-[50px] h-[40px]  px-[10px] outline-none text-custom_black w-[100%] lg:rounded-tl-[10px] lg:rounded-bl-[10px]' autoComplete='off' value={userInput.city} onChange={handleInput} required  />
                            </label>
                        </div> */}
                        <div >
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
                            <input type="date" name="starting" placeholder='Check in Date' id='checkin' onFocus={(e)=>{e.type = "date"}} className='md:h-[50px] h-[40px]  px-[10px] outline-none text-custom_black w-[100%]' value={userInput.starting} onChange={handleInput} required  />
                            </label>
                        </div>
                        <div >
                            <label htmlFor="checkout" className="text-custom_white">Check Out Date:
                            <input type="date" name="ending" placeholder='Check out Date' id='checkout' className='md:h-[50px] h-[40px] px-[10px] outline-none text-custom_black w-[100%]' value={userInput.ending} onChange={handleInput} required  />
                            </label>
                        </div>
                        <div >
                            <label htmlFor="bed" className="text-custom_white">Beds
                            <select name="bed" id="bed" autoFocus={true} className='md:h-[50px] h-[40px]  px-[10px] outline-none text-custom_black w-[100%]' value={userInput.bed} onChange={handleInput} required >
                                <option value="single" selected={true} className='text-custom_black'>Single bed</option>
                                <option value="double">Double bed</option>
                                <option value="master">Master bed</option>
                            </select>
                            </label>
                        </div>
                        <div >
                            <label htmlFor="roomtype" className="text-custom_white">Room Type
                            <select name="room" id="roomtype" autoFocus={true} className='md:h-[50px] h-[40px]  px-[10px] outline-none text-custom_black w-[100%]  lg:rounded-tr-[10px] lg:rounded-br-[10px]' value={userInput.room} onChange={handleInput} required >
                                <option value="standard" selected={true} className='text-custom_black'>Standard Room</option>
                                <option value="luxuxry">Luxury Room</option>
                            </select>
                            </label>
                        </div>

                        <div  className='flex justify-center items-center'>
                            <button className="bg-custom_camel mt-[20px] md:h-[50px] h-[40px]  lg:rounded-[10px] md:none rounded-[10px] w-[100%] py-[7px] duration-[.4s] ease-in-out hover:bg-custom_lightBrown text-custom_white ml-[10px]" type='submit'>Search</button>
                        </div>
                    </div>
                </form>
            </div>
            {
            (status)

            ?
            <div className='my-[3%] px-[2%]'> {/*Room data open*/}
                <div>
                    <p className='font-bold text-[1.2rem]'>Found <span className='text-custom_camel'>{data.length}</span> Results:</p>
                </div>

                <div className='grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2  grid-cols-1 p-[10px] gap-2'>
                    {
                        data.map((val, i)=>{
                            return(
                                <RoomCards data={val} key={i} />
                            )
                        })
                    }
                </div>
            </div> //{/*Room data close*/}
            :
                
            <ErrorHandlingPage msg={msg} />
        
        }
          
    </div>

        </>
        
        :
        <Loader />
    }
    
    <Footer />
    </>
  )
}

export {Search}