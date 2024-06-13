import React from 'react'
import playstore from "../Img/googleplay.png";
import appstore from "../Img/appstore.png";
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import YouTubeIcon from '@mui/icons-material/YouTube';
import PinterestIcon from '@mui/icons-material/Pinterest';
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

function Footer() {
  return (
    <>
    <div className='relative mb-[-10%]'> {/*Footer open*/}
            <div className='w-[100%] absolute h-[100%] z-[-1] bg-black opacity-[.7]'></div>
        <div className='relative z-[20]'>
        <div className='grid md:grid-cols-3 grid-cols-1 px-[20px] py-[5px]'>
            <div>
                <p className='py-[5px] text-custom_white'>Download Paradise App for exciting offers.</p>

                <div className='grid grid-cols-2 h-[200px]'>
                <div className=''>
                    <img src={playstore} alt="" className=''  />
                </div>
                <div className=''>
                    <img src={appstore} alt="" className="mt-[60px]" />
                </div>
                </div>
            </div>
            <div>
                <div className='flex justify-center items-center'>
                    <ul className='mt-[10%]'>
                        <a href="" className=' text-custom_white text-[.9rem] leading-5 my-[10px] hover:text-custom_camel duration-[.4s] ease-in-out'><li className='  my-[10px]'><KeyboardDoubleArrowRightIcon style={{color :"#EBD7B2"}} /> About Us</li></a>
                        <a href=""  className=' text-custom_white text-[.9rem] leading-5 my-[10px] hover:text-custom_camel duration-[.4s] ease-in-out'><li className=' my-[10px]'><KeyboardDoubleArrowRightIcon style={{color :"#EBD7B2"}}/>Teams/Careers</li></a>
                        <a href=""  className=' text-custom_white text-[.9rem] leading-5 my-[10px] hover:text-custom_camel duration-[.4s] ease-in-out'><li className='  my-[10px]'><KeyboardDoubleArrowRightIcon style={{color :"#EBD7B2"}}/>Blogs</li></a>
                        <a href=""  className=' text-custom_white text-[.9rem] leading-5 my-[10px] hover:text-custom_camel duration-[.4s] ease-in-out'><li className=' my-[10px]'><KeyboardDoubleArrowRightIcon style={{color :"#EBD7B2"}}/>Support</li></a>
                    </ul>
                </div>
            </div>
            <div>
                <div className='flex justify-center items-center'>
                    <ul className='mt-[10%]'>
                        <a href="" className='text-custom_white text-[.9rem] leading-5 my-[10px] hover:text-custom_camel duration-[.4s] ease-in-out'><li className='  my-[10px]'><KeyboardDoubleArrowRightIcon style={{color :"#EBD7B2"}} />Terms and Conditions</li></a>
                        <a href=""  className='text-custom_white text-[.9rem] leading-5 my-[10px] hover:text-custom_camel duration-[.4s] ease-in-out'><li className='  my-[10px]'><KeyboardDoubleArrowRightIcon style={{color :"#EBD7B2"}}/>Guest Policies</li></a>
                        <a href=""  className='text-custom_white text-[.9rem] leading-5 my-[10px] hover:text-custom_camel duration-[.4s] ease-in-out'><li className='  my-[10px]'><KeyboardDoubleArrowRightIcon style={{color :"#EBD7B2"}}/>Privacy Policy</li></a>
                        <a href=""  className='text-custom_white text-[.9rem] leading-5 my-[10px] hover:text-custom_camel duration-[.4s] ease-in-out'><li className='  my-[10px]'><KeyboardDoubleArrowRightIcon style={{color :"#EBD7B2"}}/>Trust and Safety</li></a>
                    </ul>
                </div>
            </div>
        </div>

        <div className='flex justify-between'>
            <hr style={{color: "red", borderColor : "red"}}  />
            <div className='flex flex-[.5]'>
                <a href="" className='text-custom_camel m-[10px]'><FacebookIcon/></a>
                <a href="" className='text-custom_camel m-[10px]'><InstagramIcon/></a>
                <a href="" className='text-custom_camel m-[10px]'><TwitterIcon/></a>
                <a href="" className='text-custom_camel m-[10px]'><YouTubeIcon/></a>
                <a href="" className='text-custom_camel m-[10px]'><PinterestIcon/></a>
            </div>
            <div className='flex flex-[.5] justify-end items-center px-[20px] text-[.9rem] text-custom_camel'>
                <p>2013-2022 © Oravel Stays Limited</p>
            </div>
        </div>
        </div>
    </div>  {/*Footer Close*/}
    </>
  )
}

export {Footer}