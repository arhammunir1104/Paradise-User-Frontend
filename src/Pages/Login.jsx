import React, {useEffect, useState} from 'react'
import { Header } from '../Components/Header';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import FormControl, { useFormControl } from '@mui/material/FormControl';
import PersonIcon from '@mui/icons-material/Person';
import img from "../Img/home_2.jpg"
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../Store/auth';
import Modal from '@mui/material/Modal';
import loader from "../essentials/loader.gif";
import { toast } from 'react-toastify';
import { Loader } from '../Components/Loader';
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

const style2 = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 150,
    p: 4,
  };

function Login(){
    let [visibility, setVisibility] = useState(false);
    const [open3, setOpen3] = React.useState(false);
    const handleOpen3 = () => setOpen3(true);
    const handleClose3 = () => setOpen3(false);
    let [show, setShow] = useState(false);
    let navigate = useNavigate();
    let {get_token, admin_verify, Login} = useAuth();

    let [userInput, setUserInput] = useState({
        email: "",
        password : ""
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
            handleOpen3();
            console.log(userInput);
            let data = await Login(userInput.email,userInput.password);
            console.log(data);
            if(data.status === true || data.status){
                handleClose3();
                // alert(data.msg);
                toast.success(data.msg, {
                    position: "top-right",
                    autoClose: 1500,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                    });
                setTimeout(()=>{
                    navigate("/");
                }, 1500)
            }
            else{
                handleClose3();
                // alert(data.msg);
                toast.error(data.msg, {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                    });
            }

        }
        catch(e){
            console.log("Error while submitting user details", e)
            toast.error("Error Logging in user, please try again in a few minutes.", {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
                theme: "light",
                });
        }
    }
    
    useEffect(()=>{
        window.scrollTo(0, 0);
        async function verify(){
            setShow(false);
            try{
                let token = await get_token();
                // console.log(token);
                if(token  !== null){
                    let data = await admin_verify();
                    // console.log(data);
                    setShow(true);
                    if(data.verified=== true || data.verified){
                                navigate("/");
                    }
                    // else{
                    //     alert(data.msg);
                    
                    //     setTimeout(()=>{
                    //         navigate("/login");
                    // }, 2000);
                }
                else{
                    setShow(true);
                }
            }
            catch(e){

            }
        };
        verify();
        
    }, []);

  return (
    <>
        <Header />
        {
            (show)
            ?
            <>
            <div className='pt-[60px]'>
            <div>
                <div  className='h-[80vh] mb-[5%] flex justify-center items-center'>
                    <div className='md:h-[80vh] h-[70vh] lg:w-[50vw] sm:w-[60vw] w-[80vw]'>
                    <form action="" onSubmit={handleSubmit} className=' md:w-[80%] w-[90%] mt-[5%] md:mx-[10%] mx-[5%] px-[5%]  rounded-[10px] shadow-xl md:h-[60vh] h-[50vh]'>
                        <p className="md:text-[1.5rem] text-[1.2rem] md:text-left text-center mt-[10%] text-custom_lightBrown"> <PersonIcon />Login to your Account</p>
                        <p className='text-[.8rem] mx-[10px] text-custom_grey md:text-left text-center'>Book your Room anywhere in the world</p>
                    
                    <div className='mt-[5px]'>
                        <input type="email" name="email" placeholder='Email' id='email' className='md:h-[50px] h-[40px]  px-[10px] outline-none text-custom_black w-[100%]' autoComplete='off' style={{borderBottom : "1px solid #EBD7B2"}} value={userInput.email} onChange={handleInput} />
                    </div>
                    <div  className='mt-[5px] relative'>
                        <input type={`${(!visibility) ?"text" :"password"}`} name="password" placeholder='Password' id='password' className='relative md:h-[50px] h-[40px]  px-[10px] outline-none text-custom_black w-[100%]' autoComplete='off' style={{borderBottom : "1px solid #EBD7B2"}} value={userInput.password} onChange={handleInput} />
                        {(!visibility) ? <p className='absolute top-2 right-0'  onClick={(e)=>{setVisibility(true)}}><VisibilityOffIcon /></p> : <p className='absolute top-2 right-0' onClick={(e)=>{setVisibility(false);}}><VisibilityIcon /></p>}
                    </div>
                    
                    <p className='my-[2%] mx-[10px] text-[.8rem]'>Don't have an Account? <NavLink to="/register" className="text-blue-400 underline">Create Account</NavLink></p>
                    <Stack spacing={2} direction="row">
                        <Button variant="contained" type="submit" className="text-custom_camel w-[100%] my-[2%] bg-custom_camel" style={{margin: "4%", backgroundColor : "#EBD7B2"}} >Create Account</Button>
                    </Stack>
                    </form>
                    </div>
                    
                    {/* <div className='md:flex hidden'>
                        <img src={img} alt="" className='h-[66%] w-[100%]' />
                    </div> */}

                </div>
            </div>
        </div>
        
        <Modal
        open={open3}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style2}>
          <img src={loader} alt="" />
        </Box>
      </Modal>
      </>
            :
            <Loader />
        }

        <Footer />
    </>
  )
}

export {Login}