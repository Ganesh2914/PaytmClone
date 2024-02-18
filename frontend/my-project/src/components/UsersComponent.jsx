import { useEffect, useState } from "react";
import { Button } from "./Button";
import { useNavigate } from "react-router-dom";


export function UsersComponent(){
    const [users, setUsers] = useState([{
        firstname: "Harkirat",
        lastname: "Singh",
        _id: 1
    }]);
    const [filter,setFilter]=useState("");
    useEffect(()=>{
        fetch("http://localhost:3000/api/v1/user/bulk?filter="+filter,{
            headers:{
                "authorization": "Bearer "+ localStorage.getItem("token")
            }
        }).then(async(resp)=>{
            let data=await resp.json();
            // console.log(data.user)
            setUsers(data.user);
        })
    },[filter])
    
    return <>
     <div className="font-bold m-2">Users</div>

        <input className="w-full px-2 py-1  border rounded border-slate-200" type="text" onChange={e=>{
            setFilter(e.target.value);
        }} placeholder="Search Users" />

        <div> {users.map(user => <User key={user._id} user={user} />)} </div>
    </>
}

function User({user}){
     const navigate=useNavigate();
    return <div className="flex justify-between items-center mt-4">
            {console.log(user)}
            <div className="flex items-center">
            <div className="bg-slate-300 flex justify-center items-center rounded-full w-12 h-12 mt-1 ml-2 font-bold">{user.firstname[0]}</div>
            <div className="font-bold ml-2">{user.firstname+" "+ user.lastname}</div>
            </div>

            <div className="flex justify-center h-ful mt-2 mr-4">
            <Button onClick={()=>{
                navigate("/sendMoney?id="+user._id+"&name="+user.username)
            }} label={"Send Money"} />
        </div>
            
    </div>
}