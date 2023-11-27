import { Router } from "express";
import { StudentRoutes } from "../modules/student/student.route";
import { User_Routers } from "../modules/user/user.router";

const router = Router();

const moduleRoutes = [
    {
        path:'/users',
        route: User_Routers,
    },
    {
        path:'/student',
        route: StudentRoutes,
    }
]

moduleRoutes.forEach(route => router.use(route.path, route.route));
export default router;