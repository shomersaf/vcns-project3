import express, {Request, Response, NextFunction} from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import jsonwebtoken from "jsonwebtoken"
import { usersRouter } from './users';
import { vacationsRouter } from './vacations';
import { followingRouter } from './following';

dotenv.config()

const app = express();
app.use(express.json());
app.use(cors())
app.listen(process.env.PORT,()=> {
    console.log({ message: `Server is active on Port ${process.env.PORT}` })
})
app.get("/health-check", function (req, res, next) {
    res.send(`API IS OK ${new Date().toISOString()}`)
})

app.use("/users", usersRouter)
app.use(verifyToken)
app.use("/vacations", vacationsRouter)
app.use("/following", followingRouter)


function verifyToken(req: Request, res: Response, next: () => any){
    const result =  req?.headers?.authorization
    let token:any;
    if(result){
         token =  result.replace("Bearer ","")
    }
    console.log("token: ",token)
    jsonwebtoken.verify(token as string, process.env.SECRET as string, function (err, decoded) {
        if (err) {
            return res.status(401).send("Authentication error")
        } else {
            console.log(decoded)
            return next()
        }
   });
}

