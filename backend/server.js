const express=require('express');
const app = express();
const cors=require('cors');
const port= process.env.PORT || 3000; 
const userRouter=require("./routes/userRouter")
const accountRouter=require("./routes/accountRouter")
app.use(express.json())
app.use(cors());
app.use("/api/v1/user",userRouter)
app.use("/api/v1/account",accountRouter)

app.listen(port,()=>{
    console.log("App listening at port "+port)
})


 
 
