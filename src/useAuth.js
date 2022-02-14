import React,{createContext, useState} from "react";
const authContext = React.createContext();

 function useAuth(){
    const [authed ,setAuthed ]= createContext();
    return{
        authed,
        login() {
            return new Promise((res )=>{setAuthed(true)})
        }
    }

}