import { pool } from "../../database";
import bcrypt from "bcryptjs"

async function postUserHandler(
  firstName:string,
  lastName:string,
  email:string, 
  pswrd:string, 
  userRole:string
) {
 
  const hashedPassword = await getHashedPassword(pswrd)
  const query = `INSERT INTO project3.users ( firstName, lastName, email, pswrd, userRole) VALUES (?,?,?,?,?);`;
  const result = await pool.execute(query, [
 firstName,
 lastName,
 email, 
 hashedPassword.password, 
 userRole
  ]);
  return result;
  
}

export { postUserHandler };

export async function getHashedPassword(password: string, salt?: string): Promise<{ password: string, salt?: string }> {
  const s = salt || bcrypt.genSaltSync(5)
  const hashed = await bcrypt.hash(password, s)
  return { password: hashed, salt: s}}
