import React from 'react'
import { Footer } from '../Components/Footer'

function ErrorHandlingPage({msg}) {
  return (
    <>
        <div className='py-[60px] min-h-[80vh] ' >

            <div className='flex justify-center items-center flex-col py-[5%] h-[80vh]'  >
            <div>
                <p className='text-[2rem] text-custom_camel text-center'>Oops! Some Error Occured</p>
            </div>
            
            <div className='flex justify-center items-center text-center' >
                <p>{msg}</p>
            </div>
            
            <div className='w-[60%] flex justify-center my-[5%]'>
                {/* <Stack spacing={2} direction="row">
                    <NavLink to={"/login"} >
                        <Button variant="contained" style={{backgroundColor : "#EBD7B2", borderRadius : "10px", margin : "0px 5px", width: "130%", }}><Home /> Login </Button>
                    </NavLink>
                </Stack> */}
            </div>
            </div>

        </div>
        
    </>
  )
}

export default ErrorHandlingPage