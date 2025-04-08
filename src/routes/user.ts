import { Router, Request, Response } from 'express'
import { machineIdSync } from 'node-machine-id';
import { userRegister } from '../services/userServices';
import { userGetByEmail } from '../models/model_user';
import { User } from '@prisma/client';

const router: Router = Router()
export default router

router.get("/", (req: Request, res: Response) => {
    res.redirect("/user/home/");
});

router.get("/home", (req: Request, res: Response) => {
    res.render("user/home", {
        title: "User | Home",
    });
});

router.get("/signup", (req: Request, res: Response) => {
    res.render('user/signup', {
        title: 'User | Signup'
    })
});

router.post("/signup", (req: Request, res: Response) => {
    res.send("halaman signup");
});

router.get("/signin", (req: Request, res: Response) => {
    res.render("user/signin", {
        title: "User | SignIn",
    });
});

router.post("/signin", async (req: Request, res: Response) => {
    const { email, password } = req.body;

    const result: User | null = await userGetByEmail(email)
    if (!result) {
        res.render("user/signin", {
            title: "User | SignIn",
        });
        return
    }

    if (result.password === password) {
        res.redirect("user/home");
        return
    }

    res.render("user/signin", {
        title: "User | SignIn",
    });
    return

});
