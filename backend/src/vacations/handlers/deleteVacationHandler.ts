    
import { pool } from "../../database"

async function deleteVacationHandler(vcnId:number) {
    console.log("vcnId at backend: ", vcnId)
    const query = `DELETE FROM project3.vacations WHERE vcnId =?`
    const results = await pool.execute(query,[vcnId]);
    const [data] = results;
    return data;
}

export { deleteVacationHandler }