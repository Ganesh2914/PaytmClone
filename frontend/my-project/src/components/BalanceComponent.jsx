

export function Balance({label}){

    return <div className="shadow mt-2 h-14 flex items-center">
        <div className="pl-4 font-bold" >Your Balance :</div>
        <div className="pl-4 font-bold" >Rs {label}</div>
    </div>

}