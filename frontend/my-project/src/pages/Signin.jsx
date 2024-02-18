import { Link, useNavigate } from "react-router-dom";
import { BottomWarning } from "../components/BottomWarning";
import { Button } from "../components/Button";
import { Heading } from "../components/Heading";
import { InputBox } from "../components/InputBox";
import { useState } from "react";


export default function Signin() {
    const [username,setUsername]=useState("");
    const [password,setPassword]=useState("");
    const navigate=useNavigate();
    return <div className="bg-slate-300 h-screen flex justify-center ">
        <div className="flex flex-col justify-center">
             <div className=" rounded-lg bg-white w-80 text-center p-2 h-max px-4 ">
                <Heading label={"Sign in"}></Heading>
                <InputBox onChange={e=>{  
                    setUsername(e.target.value);
                }} label={"Email"} placeholder={"john"}></InputBox>
                <InputBox onChange={e=>{
                    setPassword(e.target.value);
                }} label={"Password"} placeholder={"123456"}></InputBox>
                <div className="pt-2">
                <Button onClick={()=>[
                    fetch("http://localhost:3000/api/v1/user/signin",{
                        method:"POST",
                        body:JSON.stringify({
                            username,password
                        }),
                        headers:{
                            "Content-Type":"application/json"
                        }
                    }).then(async (resp)=>{
                        let data= await resp.json();

                        localStorage.setItem("token",data.token);    
                        if(data.success){
                            navigate("/dashboard");
                        }
                    })
                ]}  label={"Sign in"}></Button>
                </div>
                <div><BottomWarning label={"Dont have an account? "} buttonText={"sign up"} to={"/signup"}  > </BottomWarning></div>
             </div>
        </div>
    </div>
}