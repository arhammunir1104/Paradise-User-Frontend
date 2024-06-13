import React, { useEffect, useState } from 'react'
import  "../Css/NavigationMenuCss.css";
import Stack from '@mui/material/Stack';
import { Home } from '@mui/icons-material';
import Button from '@mui/material/Button';
import PersonIcon from '@mui/icons-material/Person';
import { useAuth } from '../Store/auth';
import { NavLink, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

function openNav() {
  document.getElementById("mySidenav").style.width = "250px";
}

function closeNav() {
  document.getElementById("mySidenav").style.width = "0";
}

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



function NavigationMenu() {
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
              setTimeout(()=>{
                  navigate("/login");
              }, 2500)
          }

      }
      catch(e){
          console.log("Error while looging out user.", e);
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
    <>
    <div id="mySidenav" className="sidenav">
  <a href="javascript:void(0)" className="closebtn text-left" onClick={()=>{closeNav()}}>&times;</a>
  <div className='mt-[10%]'>
        <Stack spacing={2} direction="row" className='text-center'>
          {
            (login)
            ?
            
          <Button variant="text" style={{borderRadius : "10px", margin : "0px 5px", color : "white", textAlign : "center", width: "100%", fontSize : "1.2rem"}}> <Home /> Reservation </Button>
            :
            ""
          }
        </Stack>
  </div>
  <div className='mt-[10%]'>
        <Stack spacing={2} direction="row" className='text-center'>
          {
            (login)
            ?
            <Button variant="text" style={{borderRadius : "10px", margin : "0px 5px", color : "white", textAlign : "center", width: "100%", fontSize : "1.2rem"}} onClick={logoutUser}> <PersonIcon /> Logout </Button>
            :
            <NavLink to={"/login"}>
              
          <Button variant="text" style={{borderRadius : "10px", margin : "0px 5px", color : "white", textAlign : "center", width: "100%", fontSize : "1.2rem"}}> <PersonIcon /> Login </Button>
            </NavLink>
          }
        </Stack>
  </div>
</div>
<span style={{fontSize: "1.2rem",cursor:"pointer"}} onClick={()=>{openNav()}}>&#9776; </span>

    </>
  )
}

export {NavigationMenu}