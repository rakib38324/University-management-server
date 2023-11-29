import { Router } from "express";
import { StudentRoutes } from "../modules/student/student.route";
import { User_Routers } from "../modules/user/user.router";
import { AcademicSemesterRoutes } from "../modules/academicSemester/academicSemester.route";
import { AcademicFacultyRoutes } from "../modules/academicFaculty/academicFaculty.router";

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
    {
        path: '/academic-faculties',
        route: AcademicFacultyRoutes,
    },
]

moduleRoutes.forEach(route => router.use(route.path, route.route));
export default router;