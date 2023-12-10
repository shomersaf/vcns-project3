
    
import { pool } from "../../database"

async function getCurrentVacationsHandler(limit:String | undefined) {
console.log("limit on sql:", limit)
  
    const query=`select distinct v.*, count(f.fUserId) over (partition by v.destination) as followers
    from project3.vacations as v 
    JOIN project3.following AS f 
    on v.vcnId = f.fVacationId 
    where toDate > now()
    and fromDate <= now() ${limit};`
    const results = await pool.execute(query);
    const [data] = results;
    return data;
}


export { getCurrentVacationsHandler }