import express from 'express';
import { AdminControllers } from './admin.controller';
import { updateAdminValidationSchema } from './admin.validation';
import ValidateRequest from '../../middlwares/validateRequest';
import Auth from '../../middlwares/auth';

const router = express.Router();

router.get('/', Auth('admin'), AdminControllers.getAllAdmins);

router.get('/:adminId', Auth('admin'), AdminControllers.getSingleAdmin);

router.patch(
  '/:adminId',
  Auth('admin'),
  ValidateRequest(updateAdminValidationSchema),
  AdminControllers.updateAdmin,
);

router.delete('/:adminId', Auth('admin'), AdminControllers.deleteAdmin);

export const AdminRoutes = router;
