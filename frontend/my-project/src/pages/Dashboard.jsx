import { useNavigate } from "react-router-dom";
import { Appbar } from "../components/Appbar";
import { Balance } from "../components/BalanceComponent";
import { UsersComponent } from "../components/UsersComponent";
import { useEffect, useState } from "react";



export default function Dashboard(){
    const [balance,setBalance]=useState("");
     useEffect(()=>{

        fetch("http://localhost:3000/api/v1/account/balance",{
            headers:{
                "authorization":"Bearer "+localStorage.getItem("token")
            }
        }).then(async (resp)=>{
            let data=await resp.json();
            setBalance(data.balance);
        })

     },[])
    return <div>
        <Appbar></Appbar>
        <Balance label={balance}></Balance>
        <UsersComponent ></UsersComponent>
    </div>
}