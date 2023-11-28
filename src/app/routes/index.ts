import { Router } from "express";
import { StudentRoutes } from "../modules/student/student.route";
import { User_Routers } from "../modules/user/user.router";
import { AcademicSemesterRoutes } from "../modules/academicSemester/academicSemester.route";

const router = Router();

const moduleRoutes = [
    {
        path: '/users',
        route: User_Routers,
    },
    {
        path: '/student',
        route: StudentRoutes,
    },
    {
        path: '/academic-semesters',
        route: AcademicSemesterRoutes,
    },
]

moduleRoutes.forEach(route => router.use(route.path, route.route));
export default router;