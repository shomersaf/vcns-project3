import { pool } from "../../database";
import bcrypt from "bcryptjs"
import jsonwebtoken from "jsonwebtoken"
import dotenv from "dotenv"
dotenv.config()
import { getHashedPassword } from "./postUserHandler";

async function postLoginHandler(email:string, 
    pswrd:string){
        const hashedPassword = await getHashedPassword(pswrd)
        const query =`SELECT userRole,pswrd FROM project3.users WHERE email='${email}';`
        const result = await pool.execute(query)
        const [data] = result;
        let checkup: any = data;
        const isPasswordValid = bcrypt.compareSync(pswrd,checkup[0]?.pswrd)
        const userRole = checkup[0]?.userRole
        if(!isPasswordValid) { throw new Error ('The password entered is not valid')} else{
            const signedToken = jsonwebtoken.sign({ userName: email, role: userRole }, process.env.SECRET as string, { expiresIn: '7d' })
            console.log(signedToken)
        return {result, signedToken, userRole}}
        }
        export { postLoginHandler };