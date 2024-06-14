import { useContext, createContext, useEffect, useState, Children, } from "react";

let baseURL= "https://paradise-user-backend.vercel.app";

export let AuthContext= createContext();
export let AuthProvider = ({children})=>{

    async function admin_verify(token){
        // console.log(token);
        let d = {
            token
        }
        try{
            let data = await fetch("http://localhost:3000/admin_verify", {
                method : "POST",
                headers: {
                   "Content-Type": "application/json",
                },
                body : JSON.stringify(d)
        });
        // console.log(data);
        let res = await data.json();
        // console.log(res);
        return(res)
        }
        catch(e){
            console.log("Admin Account Verification Error",e);
        }
    };

    function set_token(token){
            localStorage.setItem("token", token);
    };
    
    function get_token(){
       return( localStorage.getItem("token"));
    };

    async function logout(){
        try{
            let token = get_token();
            let d ={
                token
            }
            console.log(token)
            if(!token || token === null){
                return({msg: "You are not loggedin , please login First", logout: false});
            }
            else{        
                console.log(token);        
                let data = await fetch(`${baseURL}/logout`, {
                    method : "POST",
                    headers: {
                       "Content-Type": "application/json",
                    },
                    body : JSON.stringify(d)
                });
                let res = await data.json();
                localStorage.removeItem("token");
                return(res);
            }

        }
        catch(e){
            console.log("Logging out Error", e);
        }
    };

    
    async function HomeData(){
        try{
            let token =  get_token();
            let data = await fetch(`${baseURL}/getData`, {
                method : "GET",
                headers: {
                   "Content-Type": "application/json",
                },
        });
        // console.log(data);
        let res = await data.json();
        // console.log(res);
        return(res)
        }
        catch(e){
            console.log("Admin Account Verification Error",e);
        }
    };
    
    async function getRoomsData(id){
        console.log(id)
        try{    
            let data = await fetch(`${baseURL}/room/${id}`, {
                method : "GET",
                headers: {
                   "Content-Type": "application/json",
                },
        });
        // console.log(data);
        let res= await data.json();
        // console.log(res);
        return(res);
        } 
        catch(e){
            console.log("Hotel Data Fetching Error",e);
        }
    };

    
    async function getRoomsCityData(city){
        // console.log(id)
        try{    
            let data = await fetch(`${baseURL}/search/rooms/${city}`, {
                method : "GET",
                headers: {
                   "Content-Type": "application/json",
                },
        });
        // console.log(data);
        let res= await data.json();
        // console.log(res);
        return(res);
        }
        catch(e){
            console.log("Hotel Data Fetching Error",e);
        }
    };

    
    async function getHotelData(id){
        try{    
            let data = await fetch(`${baseURL}/hotel/${id}`, {
                method : "GET",
                headers: {
                   "Content-Type": "application/json",
                },
        });
        // console.log(data);
        let res= await data.json();
        // console.log(res);
        return(res);
        }
        catch(e){
            console.log("Room Data Fetching Error",e);
        }
    };

    async function Register(name,email,phone,cnic,city,password){
        // console.log(d);
        let d={
            name,
            email,
            phone,
            cnic,
            city,
            password
        }
        // console.log(d)
        try{    
            let data = await fetch(`${baseURL}/register`, {
                method : "POST",
                headers: {
                   "Content-Type": "application/json",
                },
                body: JSON.stringify(d)
        });
        // console.log(data);
        let res= await data.json();
        if(res.status === true || res.status){
            set_token(res.token);
        }
        // console.log(res);
        return(res);
        }
        catch(e){
            console.log("Room Status Changin Error",e);
        }
    };

    async function Login(email,password){
        // console.log(d);
        let d={
            email,
            password
        }
        // console.log(d)
        try{    
            let data = await fetch(`${baseURL}/login`, {
                method : "POST",
                headers: {
                   "Content-Type": "application/json",
                },
                body: JSON.stringify(d)
        });
        // console.log(data);
        let res= await data.json();
        if(res.status === true || res.status){
            set_token(res.token);
        }
        // console.log(res);
        return(res);
        }
        catch(e){
            console.log("Room Status Changin Error",e);
        }
    };

    async function admin_verify(){
        // console.log(token);
        let token = get_token();
        try{
            let data = await fetch(`${baseURL}/verify`, {
                method : "POST",
                headers: {
                   "Content-Type": "application/json",
                },
                body : JSON.stringify({token})
        });
        // console.log(data);
        let res = await data.json();
        // console.log(res);
        return(res)
        }
        catch(e){
            console.log("Admin Account Verification Error",e);
        }
    };
    async function search(city, starting, ending,bed,room){
        try{    
            let data = await fetch(`${baseURL}/search/${city}/${starting}/${ending}/${bed}/${room}`, {
                method : "GET",
                headers: {
                   "Content-Type": "application/json",
                },
        });
        // console.log(data);
        let res= await data.json();
        // console.log(res);
        return(res);
        }
        catch(e){
            console.log("Room Status Changin Error",e);
        }
    };

    async function check(room_id, starting, ending){
        console.log(room_id, starting, ending);
        try{    
            let data = await fetch(`${baseURL}/check` , {
                method : "POST",
                headers: {
                   "Content-Type": "application/json",
                },
                body: JSON.stringify({room_id,starting,ending})
        });
        // console.log(data);
        let res= await data.json();
        // console.log(res);
        return(res);
        }
        catch(e){
            console.log("Room Status Changin Error",e);
        }
    };
    async function check(room_id, starting, ending){
        console.log(room_id, starting, ending);
        try{    
            let data = await fetch(`${baseURL}/check` , {
                method : "POST",
                headers: {
                   "Content-Type": "application/json",
                },
                body: JSON.stringify({room_id,starting,ending})
        });
        // console.log(data);
        let res= await data.json();
        // console.log(res);
        return(res);
        }
        catch(e){
            console.log("Room Status Changin Error",e);
        }
    };
    async function userdata(){
        let token = get_token();
        try{    
            let data = await fetch(`${baseURL}/userData` , {
                method : "POST",
                headers: {
                   "Content-Type": "application/json",
                },
                body: JSON.stringify({token})
        });
        // console.log(data);
        let res= await data.json();
        // console.log(res);
        return(res);
        }
        catch(e){
            console.log("Room Status Changin Error",e);
        }
    };

    async function reserve(d){
        console.log(d);
        try{    
            let data = await fetch(`${baseURL}/confirmreservation` , {
                method : "POST",
                headers: {
                   "Content-Type": "application/json",
                },
                body: JSON.stringify(d)
        });
        // console.log(data);
        let res= await data.json();
        // console.log(res);
        return(res);
        }
        catch(e){
            console.log("Room Status Changin Error",e);
        }
    };

    async function reservationHistory(d){
        console.log(d);
        let token = get_token();
        try{    
            let data = await fetch(`${baseURL}/reservationhistory` , {
                method : "POST",
                headers: {
                   "Content-Type": "application/json",
                },
                body: JSON.stringify({token})
        });
        // console.log(data);
        let res= await data.json();
        // console.log(res);
        return(res);
        }
        catch(e){
            console.log("Room Status Changin Error",e);
        }
    };
    
    

    async function addComment(d){
        try{    
            let data = await fetch(`${baseURL}/addComment`, {
                method : "POST",
                headers: {
                   "Content-Type": "application/json",
                },
                body: JSON.stringify(d)
        });
        // console.log(data);
        let res= await data.json();
        // console.log(res);
        return(res);
        }
        catch(e){
            console.log("Room Status Changin Error",e);
        }
    };

    return(
        <AuthContext.Provider value={{
            set_token,
            get_token,
            logout,
            admin_verify, 
            HomeData,
            getRoomsData,
            getRoomsCityData,
            getHotelData,
            Register,
            Login,
            search,
            reserve,
            reservationHistory,
            check,
            userdata,
            addComment
                
            
            }}>
            {children}
        </AuthContext.Provider>
    )
};

export let useAuth = function(){
    let authContextValue = useContext(AuthContext);

    if(!authContextValue){
        throw new Error("UseAuth used outside of the provider")
    }
    return(authContextValue);
}