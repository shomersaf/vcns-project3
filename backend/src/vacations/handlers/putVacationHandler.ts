
    
import { pool } from "../../database"

async function putVacationHandler(destination:string, about:string, fromDate:string, toDate:string, price:number, imageSrc:string, vcnId:number, ) {
    const query = `UPDATE project3.vacations SET destination = ?, about = ?, fromDate = ?, toDate = ?, price = ?, imageSrc =? WHERE (vcnId = ?);`
    const results = await pool.execute(query,[destination, about, fromDate, toDate, price, imageSrc, vcnId]);
    const [data] = results;
    return data;
}

export { putVacationHandler }