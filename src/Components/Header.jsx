import React, { useEffect, useState } from 'react'
import logo from "../Img/logo.png"
import { NavigationMenu } from './NavigationMenu';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import PersonIcon from '@mui/icons-material/Person';
import SearchIcon from '@mui/icons-material/Search';
import HomeIcon from '@mui/icons-material/Home';
import { Home } from '@mui/icons-material';
import { NavLink, useNavigate } from 'react-router-dom';
import { SearchBar } from './SearchBar';
import { useAuth } from '../Store/auth';
import { toast } from 'react-toastify';


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



function Header() {
    let [login, setLogin] = useState(false);
    let {get_token, admin_verify, logout} = useAuth();
    let navigate = useNavigate();
    async function logoutUser(){
        try{
            // alert("Logging out");
            let data = await logout();
            if(data.status === true || data.status){
                setLogin(false);
                // alert("Logged out Successfully");
                toast.success("Logged out Successfully", {
                    position: "top-right",
                    autoClose: 1500,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                    });
            }
            else{
                // alert("Error occured while logging out user, please login again.");
                toast.error("Error occured while logging out user, please login again.", {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                    });
                setTimeout(()=>{
                    navigate("/login");
                }, 2500)
            }

        }
        catch(e){
            console.log("Error while looging out user", e);
            toast.error("Error while looging out user.", {
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
    };


    useEffect(()=>{
        async function verify(){
            setLogin(false);
            try{
                let token = await get_token();
                // console.log(token);
                if(token !== null){
                    let data = await admin_verify();
                    // console.log(data);
                    if(data.verified=== true || data.verified){
                                setLogin(true);
                                setShow(true);
                    }
                    else{
                        setLogin(false);
                        setShow(true);
                }
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
    <div className='relative clear-both p-[10px] z-[100]' >
        <div  className={`grid grid-cols-2 w-[100vw] left-0 top-0 bg-transparent fixed h-[60px] p-[5px] clear-both`}>
            <div style={{backgroundColor: "black"}} className='absolute w-[100vw] h-[60px] z-[-1] opacity-[.5]'></div>
            <div className='flex items-center'>
                <NavLink to="/">
                <img src={logo} alt="" className='md:w-[100px] md:ml-[20px] w-[100px]' />
                </NavLink>
            </div>
            <div  >  
                <div className='sm:flex justify-end items-center px-[5%] mt-[5px] hidden' >
                    
                    <div >
                        <Stack spacing={2} direction="row">
                            <SearchBar />
                        </Stack>
                    </div>
                    <div >
                        <Stack spacing={2} direction="row">
                        {
                                (login)
                                ?
                                
                                <NavLink to={"/reservations"}>
                                <Button variant="outlined" style={{borderRadius : "10px", margin : "0px 5px", color: "#FFFFFF", fontSize: ".7rem" ,borderColor : "#FFFFFF"}} ><Home /> Reservations </Button>
                                </NavLink>
                                :
                                ""
                            }
                                </Stack>
                    </div>
                    <div >
                        <Stack spacing={2} direction="row">
                            {
                                (login)
                                ?
                                <Button variant="contained" style={{backgroundColor : "#EBD7B2",  fontSize: ".7rem" , borderRadius : "10px", margin : "0px 5px"}} onClick={logoutUser}><PersonIcon /> Logout </Button>
                                :
                                <NavLink to={"/login"} >
                                <Button variant="contained" style={{backgroundColor : "#EBD7B2",  fontSize: ".7rem" , borderRadius : "10px", margin : "0px 5px"}}><PersonIcon /> Login </Button>
                                </NavLink>
                            }
                        </Stack>
                    </div>
                </div>
                <div className="flex justify-evenly mt-[8px]">
                <div className="sm:hidden flex">
                        <Stack spacing={2} direction="row">
                            <SearchBar />
                        </Stack>
                </div>
                <div className='float-right sm:hidden flex'>
                    <button className='text-custom_white md:px-[30px] md:py-[7px] px-[20px] py-[5px] rounded-[20px] md:mx-[10px] mx-[2px]'><NavigationMenu /></button>
                </div>


                </div>
             </div>
        </div>
    </div>
  )
}

export {Header}