import express, { Request, Response } from "express";
import { get_user_by_id, create_new_user } from "../controllers/user_controllers";

const user = express.Router();
user.use(express.json())

user.put("/", (req: Request, res: Response) => {
    try{
        let user = req.body;
        let status, data = create_new_user(user);
        res.json({data})
        if (status == 200) {res.sendStatus(200);}
        if (status == 400) {res.sendStatus(400);}
    }
    catch (err: any) {
        res.status(400);
        res.json({"errType": err.name, "errMsg": err.message});
    }
});

user.get("/:user_id", (req: Request, res: Response) => {
    let user_id = req.params.user_id
    try{
        let status, data = get_user_by_id(user_id)
        res.json({data})
        if (status == 200) {res.sendStatus(200);}
        if (status == 404) {res.sendStatus(404);}
    }
    catch (err: any) {
        res.status(400);
        res.json({"errType": err.name, "errMsg": err.message});
    }
});


module.exports = user;
