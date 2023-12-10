
    
import { pool } from "../../database"

async function getVacationsHandler(limit:String | undefined) {
console.log("limit on sql:", limit)
    const query = `SELECT distinct vcnId, destination, about, fromDate, toDate, price, imageSrc, count(fUserId) over (partition by destination) as followers FROM project3.vacations LEFT JOIN  project3.following ON project3.vacations.vcnId=project3.following.fVacationId ORDER BY fromDate ${limit};`
 
    const results = await pool.execute(query);
    const [data] = results;
    return data;
}


export { getVacationsHandler }