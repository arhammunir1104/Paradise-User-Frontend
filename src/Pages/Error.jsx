import React from 'react'
import { Header } from '../Components/Header';
import { NavLink } from 'react-router-dom';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { Home } from '@mui/icons-material';

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

function Error() {
  return (
    <>
        <Header />
        <div className='py-[60px] min-h-[80vh] '>

            <div className='flex justify-center items-center flex-col py-[5%]'>
            <div>
                <p className='text-[3rem] text-custom_camel'>Lost Your Way?</p>
            </div>
            
            <div>
                <p>Sorry, we can't find that page. You'll find lots to explore on the home page.</p>
            </div>
            
            <div className='w-[60%] flex justify-center my-[5%]'>
                <Stack spacing={2} direction="row">
                    <NavLink to={"/"} >
                        <Button variant="contained" style={{backgroundColor : "#EBD7B2", borderRadius : "10px", margin : "0px 5px", width: "130%", }}><Home />  Home  </Button>
                    </NavLink>
                </Stack>
            </div>
            </div>

        </div>
    </>
  )
}

export {Error}