  
import { pool } from "../../database"

async function postVacationHandler(destination:string, about:string, fromDate:string, toDate:string, price:number, imageSrc:string) {
    
    const query = `INSERT INTO project3.vacations (destination, about,fromDate, toDate, price, imageSrc) VALUES (?, ?, ?, ?, ?, ?);`
    const results = await pool.execute(query,[destination, about, fromDate, toDate, price, imageSrc]);
   // console.log(results)
    const [data] = results;
    return data;
}

export { postVacationHandler }