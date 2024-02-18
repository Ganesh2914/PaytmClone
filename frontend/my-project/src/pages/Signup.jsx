import { BottomWarning } from "../components/BottomWarning";
import { Heading } from "../components/Heading";
import { InputBox } from "../components/InputBox";
import { SubHeading } from "../components/SubHeading";
import { Button } from "../components/Button";
import { useState } from "react";
import { useNavigate } from "react-router-dom";


export default function Signup(){
    

    const [firstname,setFname]=useState("");
    const [lastname,setLname]=useState("");
    const [username,setUsername]=useState("");
    const [password,setPassword]=useState("");
    let navigate=useNavigate();

    return <div className="bg-slate-300 h-screen flex justify-center">
          <div className="flex flex-col justify-center">
      <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
        <Heading label={"Sign up"} />
        <SubHeading label={"Enter your infromation to create an account"} />
        <InputBox onChange={e=>{
          setFname(e.target.value)
        }} placeholder="John"   label={"First Name"}  />
        <InputBox onChange={e=>{
          setLname(e.target.value)
        }} placeholder="Doe" label={"Last Name"} />
        <InputBox onChange={e=>{
          setUsername(e.target.value)
        }} placeholder="harkirat_01" label={"Username"} />
        <InputBox onChange={e=>{
          setPassword(e.target.value);
        }} placeholder="123456" label={"Password"} />
        <div className="pt-4">
          <Button onClick={()=>{
              fetch("http://localhost:3000/api/v1/user/signup",{
                method:"POST",
                body:JSON.stringify({
                  username,
                  firstname,
                  lastname,
                  password,
                }),
                headers:{
                  "Content-Type":"application/json"
                }
              }).then( async (resp)=>{
                  const data=await resp.json();
                  if(data.success){
                      navigate("/dashboard")
                  }
              })
          }} label={"Sign up"} />
          <BottomWarning label={"Already have an account?"} buttonText={"Sign in"} to={"/signin"}></BottomWarning>
        </div>
         
      </div>
    </div>
        
    </div>
}