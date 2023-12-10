
import { pool } from "../../database"

async function deleteFollowingHandler(email:string,vcnId:number) {
    const query1 = `SELECT userId FROM project3.users WHERE email='${email}'`;
    const query2 = `DELETE FROM project3.following WHERE fUserId =? AND fVacationId = ?`
    const result1 = await pool.execute(query1);
    const inResult: any = result1
    const userId =inResult[0][0].userId
    //console.log("userId:", userId)
    const result2 = await pool.execute(query2,[userId, vcnId]);
    const [data] = result2;
    return data;
}

export { deleteFollowingHandler }