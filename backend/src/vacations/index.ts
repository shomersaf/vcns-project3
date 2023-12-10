
import express, { Request, Response, NextFunction } from "express"
import {getVacationsHandler } from "./handlers/getVacationsHandler";

import {putVacationHandler } from "./handlers/putVacationHandler";
import {deleteVacationHandler } from "./handlers/deleteVacationHandler";
import {postVacationHandler } from "./handlers/postVacationHandler";
import { getFavouriteVacationsHandler } from "./handlers/getFavouriteVacationsHandler";
import { getCurrentVacationsHandler } from "./handlers/getCurrentVacationsHandler";
import { getUpcomingVacationsHandler } from "./handlers/getUpcomingVacationsHandler ";

const vacationsRouter = express.Router();

vacationsRouter.get("/",getVacations)

vacationsRouter.post("/new",postVacation)
vacationsRouter.put("/edit",putVacation)
vacationsRouter.delete("/delete/:vcnId",deleteVacation)


async function deleteVacation(req: Request, res: Response, next: NextFunction) {
  try {
    const { vcnId } = req.params;
    console.log("vcnId at index",vcnId)
    const result = await deleteVacationHandler(Number(vcnId));
      if(result)console.log('vacation deleted')
      res.status(200).json(result)
  } catch (error) {
    res.status(500).send({
      message: error
  });
    return next(error);
  }
}


async function putVacation(req: Request, res: Response, next: NextFunction) {
  try {
    const { destination, about, fromDate, toDate, price, imageSrc, vcnId } = req.body;
    if (!destination || !about || !fromDate || !toDate || !price ) throw new Error('Some data not entered');
    if (typeof destination !="string" || typeof about !="string"|| typeof imageSrc !="string" ) throw new Error('Irrelevant data type entered');
    if (isNaN(price)) throw new Error("Price should be a number");
    const isimageSrcValid = checkURL(imageSrc);
    if (isimageSrcValid ==false) throw new Error("Unproper image URL format entered");
    const result = await putVacationHandler(destination, about, fromDate, toDate, price, imageSrc, vcnId );
    // console.log(result);
    res.status(200).json(result);
  } catch (error) {
    res.status(400).send(error);
    return next(error);
  }
}


async function postVacation(req: Request, res: Response, next: NextFunction) {
  try {
    const { destination, about, fromDate, toDate, price, imageSrc } = req.body;
    if (!destination || !about || !fromDate || !toDate || !price || !imageSrc  ) throw new Error('Some data not entered');
    if (typeof destination !="string" || typeof about !="string"|| typeof imageSrc !="string" ) throw new Error('Irrelevant data type entered');
    if (isNaN(price)) throw new Error("price should be a number");
    const isimageSrcValid = checkURL(imageSrc);
    if (isimageSrcValid ==false) throw new Error("Unproper image URL format entered");
    const result = await postVacationHandler(destination, about, fromDate, toDate, price, imageSrc );
      if(result) console.log('vacation added')
      res.status(200).json(result)
  } catch (error) {
    res.status(400).send(error);
    return next(error);
  }
}




async function getVacations(req: Request, res: Response, next: NextFunction) {
  
  try {
   const {_stepFrom,_filterName, _filterBy } = req.query;
   const step = ",10"

   var limitPossible:any;
   if (_stepFrom?.toString().startsWith("all") == true){
    limitPossible =''
   }else{
    limitPossible ="LIMIT "+ _stepFrom+step
   }


  console.log("limitPossible: ", limitPossible)
  let result:any;
  
  if (_filterName =="all"){
    console.log("_filterBy:all ");
    result = await getVacationsHandler(limitPossible);
  }else if (_filterName =="favourites"){
    console.log("_filterBy:favourites ");
    result = await getFavouriteVacationsHandler(limitPossible, _filterBy);
  }else if (_filterName =="current"){
    console.log("_filterBy:current ");
    result = await getCurrentVacationsHandler(limitPossible);
  }else if (_filterName =="upcoming"){
    console.log("_filterBy:upcoming ");
    result = await getUpcomingVacationsHandler(limitPossible);
  }

  res.status(200).json(result);
  } catch (error) {
    return next(error);
  }
}



function checkURL(url:string) {
  var r = /^(ftp|http|https):\/\/[^ "]+$/;
  
if (r.test(url) && url.match(/\.(jpeg|jpg|gif|png)$/)) {
  return true
}else{
  return false} 
}

    export { vacationsRouter };

