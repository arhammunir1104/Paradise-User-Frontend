import React, {useState, } from 'react'
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import SearchIcon from '@mui/icons-material/Search';
import { useNavigate } from 'react-router-dom';



const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    pt: 2,
    px: 4,
    pb: 3,
    borderRadius : "10px",
    height: "60vh"
  };

  
function SearchBar() {
    const [open, setOpen] = React.useState(false);
    let navigate = useNavigate();
    const handleOpen = () => {
      setOpen(true);
    };
    const handleClose = () => {
      setOpen(false);
    };
    let [userInput, setUserInput] = useState({
        city: "karachi",
        starting: "",
        ending: "",
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

    function handleSubmit(e){
        e.preventDefault();
        // console.log(userInput);
        handleClose();
        navigate(`/search/${userInput.city}/${userInput.starting}/${userInput.ending}/${userInput.bed}/${userInput.room}/`)
        // handleClose();
    }


  return (
    <div>
    <Button  variant="outlined" onClick={handleOpen} style={{borderRadius : "10px", margin : "0px 5px", fontSize: ".7rem" ,color: "#FFFFFF", borderColor : "#FFFFFF"}}><SearchIcon />Search</Button>
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="parent-modal-title"
      aria-describedby="parent-modal-description"
    >
      <Box sx={{ ...style, width: 500, borderRadius: "20px" }}>
      <div className='md:h-[80vh] h-[70vh]'>
                    <form action="" onSubmit={handleSubmit} className='grid grid-cols-2 md:w-[90%] w-[90%] mt-[5%] md:mx-[5%] mx-[5%] px-[4%] rounded-[10px]  md:h-[fit-content] h-[fit-content]'>                   
                        {/* <div className='col-span-2'>
                            <label htmlFor="city" className="text-custom_black" >City
                            <input type="text" name="city" placeholder='Karachi' id='city' className='md:h-[50px] h-[40px]  px-[10px] outline-none text-custom_black w-[100%] rounded-[5px]' style={{border: "2px solid grey"}} autoComplete='off' value={userInput.city} onChange={handleInput} required />
                            </label>
                        </div> */}

                        <div className='col-span-2'>
                                    <label htmlFor="roomtype" className="text-custom_black">City
                                    <select name="city" id="city" autoFocus={true} className='md:h-[50px] h-[40px] border-1 border-custom_black px-[10px] outline-none text-custom_black w-[100%]  lg:rounded-[10px]' value={userInput.city} onChange={handleInput} required style={{border: "2px solid #4B514D"}}>
                                        <option value="karachi" selected={true} className='text-custom_black'>Karachi</option>
                                        <option value="lahore">Lahore</option>
                                        <option value="islamabad">Islamabad</option>
                                        <option value="rawalpindi">Rawalpindi</option>
                                        {/* <option value="lahore">Lahore</option> */}
                                    </select>
                                    </label>
                                </div>
                        <div >
                            <label htmlFor="checkin" className="text-custom_black">Check In Date:
                            <input type="date" name="starting" placeholder='Check in Date' id='checkin' onFocus={(e)=>{e.type = "date"}} className='md:h-[50px] h-[40px]  px-[10px] outline-none text-custom_black w-[100%] rounded-[5px]' style={{border: "2px solid grey"}} value={userInput.starting} onChange={handleInput} required/>
                            </label>
                        </div>
                        <div >
                            <label htmlFor="checkout" className="text-custom_black">Check Out Date:
                            <input type="date" name="ending" placeholder='Check out Date' id='checkout' className='md:h-[50px] h-[40px] px-[10px] outline-none text-custom_black w-[100%] rounded-[5px]'  style={{border: "2px solid grey"}} value={userInput.ending} onChange={handleInput} required/>
                            </label>
                        </div>
                        <div >
                            <label htmlFor="bed" className="text-custom_black">Beds
                            <select name="bed" id="bed" autoFocus={true} className='md:h-[50px] h-[40px]  px-[10px] outline-none text-custom_black w-[100%] rounded-[5px]'  style={{border: "2px solid grey"}} value={userInput.bed} onChange={handleInput} required>
                                <option value="single" selected={true} className='text-custom_black'>Single bed</option>
                                <option value="double">Double bed</option>
                                <option value="master">Master bed</option>
                            </select>
                            </label>
                        </div>
                        <div >
                            <label htmlFor="roomtype" className="text-custom_white">Room Type
                            <select name="room" id="roomtype" autoFocus={true} className='md:h-[50px] h-[40px]  px-[10px] outline-none text-custom_black w-[100%] rounded-[5px]' style={{border: "2px solid grey"}} value={userInput.room} onChange={handleInput} required>
                                <option value="standard" selected={true} className='text-custom_black'>Standard Room</option>
                                <option value="luxuxry">Luxury Room</option>
                            </select>
                            </label>
                        </div>

                    
                    <Stack spacing={2} direction="row" className='col-span-2'>
                        <Button variant="contained" type="submit" className="col-span-2 text-custom_camel w-[100%] my-[2%] bg-custom_camel" style={{margin: "4%", backgroundColor : "#EBD7B2"}} >Search</Button>
                    </Stack>
                    </form>
                    </div>
      </Box>
    </Modal>
  </div>
  )
}

export {SearchBar}