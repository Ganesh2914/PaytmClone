import { Navigate, useNavigate } from "react-router-dom"


export function Appbar(){
        const navigate=useNavigate();
return <div className="shadow-lg h-14 flex justify-between ">
        <div className="flex items-center pl-2 font-bold">PayTM App</div>
        <div className="flex ">
        <div className="flex items-center font-bold pr-6">Hello</div>
        <div className="flex justify-center items-center m-2 h-10 w-10 rounded bg-slate-300 rounded-full" onClick={()=>{
                localStorage.setItem("token","")
                navigate("/signin")
        }}>U</div>
        </div>
         
</div>

} 