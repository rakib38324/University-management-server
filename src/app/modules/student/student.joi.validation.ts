import Joi from 'Joi';

//CREATEING A SCHEMA WITH JOI

const userNameValidationJoiSchema = Joi.object({
  firstName: Joi.string()
    .required()
    .trim()
    .max(20)
    .pattern(/^[A-Za-z]+$/)
    .message('First name must be alphanumeric'),

  middleName: Joi.string().trim().max(20),

  lastName: Joi.string()
    .required()
    .trim()
    .max(20)
    .pattern(/^[A-Za-z]+$/)
    .message('Last name must be alphanumeric'),
});

const guardianValidationJoiSchema = Joi.object({
  fatherName: Joi.string().required().trim().max(50),

  fatherContactNum: Joi.string().required().trim(),

  fatherOccupation: Joi.string().required().trim(),

  motherName: Joi.string().required().trim().max(50),

  motherContactNum: Joi.string().required().trim(),

  motherOccupation: Joi.string().required().trim(),
});

const localGuardianValidationJoiSchema = Joi.object({
  relation: Joi.string().required().trim(),

  name: Joi.string().required().trim().max(50),

  contactNum: Joi.string().required().trim(),

  occupation: Joi.string().required().trim(),

  address: Joi.string().required().trim().max(200),
});

const studentValidationJoiSchema = Joi.object({
  id: Joi.string().required(),

  name: userNameValidationJoiSchema.required(),

  gender: Joi.string().valid('Male', 'Female', 'Other').required(),

  dateOfBirth: Joi.string(),

  email: Joi.string().email().required(),

  contactNum: Joi.string().required(),

  emergencyContactNum: Joi.string().required(),

  bloodGroup: Joi.string().valid(
    'A+',
    'B+',
    'AB+',
    'O+',
    'A-',
    'B-',
    'AB-',
    'O-',
  ),

  presentAddress: Joi.string().required(),

  permanentAddress: Joi.string().required(),

  guardian: guardianValidationJoiSchema.required(),

  localGuardian: localGuardianValidationJoiSchema.required(),

  profileImage: Joi.string(),

  isActive: Joi.string().valid('active', 'blocked').default('active'),
});

export default studentValidationJoiSchema;
