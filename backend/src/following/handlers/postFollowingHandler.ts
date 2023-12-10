
// import { pool } from "../../database";

// async function postFollowingHandler(
//   userId:number,
//   vcnId:number
//   ) {
//     const query = `INSERT INTO project3.following (fUserId, fVacationId) VALUES (?,?);`;
//     const result = await pool.execute(query, [
// userId, vcnId
//     ]);
//     return result;  
//   }

//   export { postFollowingHandler }


import { pool } from "../../database";

async function postFollowingHandler(
  email:string,
  vcnId:number
  ) {
    const query1 = `SELECT userId FROM project3.users WHERE email='${email}'`;
    const query2 = `INSERT INTO project3.following (fUserId, fVacationId) VALUES (?,?)`;
    const result1 = await pool.execute(query1);
    const inResult: any = result1
    const userId =inResult[0][0].userId
    // console.log("userId:", userId)
    const result2 = await pool.execute(query2,[userId,vcnId]);

    return result2;  
  }

  export { postFollowingHandler }