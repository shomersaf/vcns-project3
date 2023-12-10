
import express, { Request, Response, NextFunction } from "express"
import {getFollowingsByUserHandler} from "./handlers/getFollowingsByUserHandler";
import {getFollowingsByVacation} from "./handlers/getFollowingsByVacation";
import {postFollowingHandler } from "./handlers/postFollowingHandler";
import {deleteFollowingHandler } from "./handlers/deleteFollowingHandler";

const followingRouter = express.Router();

followingRouter.get("/by_user/:email",getFollowingByUser)
followingRouter.get("/by_vacation/:vcnId",getFollowingByVacation)
followingRouter.post("/new",postFollowing)
followingRouter.delete("/delete",deleteFollowing)

async function deleteFollowing(req: Request, res: Response, next: NextFunction) {
  try {
    const {email, vcnId } = req.body;
    const result = await deleteFollowingHandler(email, vcnId);
      if(result)console.log('unfollowed')
    res.status(200).json(result)
  } catch (error) {
    res.status(500).send({
      message: error
  });
    return next(error);
  }
}


async function postFollowing(req: Request, res: Response, next: NextFunction) {
  try {
    const { email, vcnId } = req.body;
    const result = await postFollowingHandler( email, vcnId );
      if(result)console.log('following added')
    res.json(result)
  } catch (error) {
    res.status(500).send({
      message: error
  });
    return next(error);
  }
}

async function getFollowingByVacation(req: Request, res: Response, next: NextFunction) {
  try {
    const { vcnId } = req.params;
    const result = await getFollowingsByVacation(+vcnId);
    console.log(result);
    res.json(result);
  } catch (error) {
    return next(error);
  }
}

async function getFollowingByUser(req: Request, res: Response, next: NextFunction) {
  try {
    const { email } = req.params;
    console.log(email);
    const result = await getFollowingsByUserHandler(email);

    res.status(200).json(result);
  } catch (error) {
    return next(error);
  }
}
    export { followingRouter };

