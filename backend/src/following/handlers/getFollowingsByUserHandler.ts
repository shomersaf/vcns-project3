 
import { pool } from "../../database"

async function getFollowingsByUserHandler(email:string) {
    const query1 = `SELECT userId FROM project3.users WHERE email='${email}'`;
    const result1 = await pool.execute(query1);
    const inResult: any = result1
    const userId =inResult[0][0].userId
    const query2 = `SELECT fVacationId FROM project3.following WHERE fUserId = ?`
    const results = await pool.execute(query2,[userId]);
    const [data] = results;
    return data;
}

export { getFollowingsByUserHandler }