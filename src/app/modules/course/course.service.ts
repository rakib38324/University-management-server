import mongoose from 'mongoose';
import QueryBulider from '../../builder/QueryBuilder';
import { courseSearchableFields } from './course.constant';
import { TCourse, TCourseFaculty } from './course.interface';
import { Course, courseFaculty } from './course.model';
import AppError from '../../errors/AppError';
import httpStatus from 'http-status';

const createCourseIntoDB = async (payload: TCourse) => {
  const result = await Course.create(payload);
  return result;
};

const getAllCoursesFromDB = async (query: Record<string, unknown>) => {
  const courseQuery = new QueryBulider(
    Course.find().populate('preRequisiteCourses.course'),
    query,
  )
    .search(courseSearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await courseQuery.modelQuery;

  return result;
};

const getSingleCourseFromDB = async (id: string) => {
  const result = await Course.findById(id).populate(
    'preRequisiteCourses.course',
  );
  return result;
};

const deleteCourseFromDB = async (id: string) => {
  const result = await Course.findByIdAndUpdate(
    id,
    { isDeleted: true },
    { new: true },
  );
  return result;
};

const updateCourseIntoDB = async (id: string, payload: Partial<TCourse>) => {
  const { preRequisiteCourses, ...courseRemainingCourse } = payload;

  const session = await mongoose.startSession();
  try {
    session.startTransaction();

    //=====> step-1: basic course info update
    const updateCourseIntoDB = await Course.findByIdAndUpdate(
      id,
      courseRemainingCourse,
      {
        new: true,
        runValidators: true,
        session,
      },
    );

    if (!updateCourseIntoDB) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Fail to update Course.');
    }

    if (preRequisiteCourses && preRequisiteCourses.length > 0) {
      const deletedPreRequisites = preRequisiteCourses
        .filter((el) => el.course && el.isDeleted)
        .map((el) => el.course);

      const deletedPreRequisitesCourse = await Course.findByIdAndUpdate(
        id,
        {
          $pull: {
            preRequisiteCourses: { course: { $in: deletedPreRequisites } },
          },
        },
        {
          new: true,
          session,
        },
      );

      if (!deletedPreRequisitesCourse) {
        throw new AppError(httpStatus.BAD_REQUEST, 'Fail to update Course.');
      }

      const newPreRquisite = preRequisiteCourses?.filter(
        (el) => el.course && !el.isDeleted,
      );

      const newPreRquisiteCourses = await Course.findByIdAndUpdate(
        id,
        {
          $addToSet: { preRequisiteCourses: { $each: newPreRquisite } },
        },
        {
          new: true,
          session,
        },
      );

      if (!newPreRquisiteCourses) {
        throw new AppError(httpStatus.BAD_REQUEST, 'Fail to update Course.');
      }
    }

    await session.commitTransaction();
    await session.endSession();

    const result = await Course.findById(id).populate(
      'preRequisiteCourses.course',
    );

    return result;
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    throw new AppError(httpStatus.BAD_REQUEST, 'Failed to update Course');
  }
};

const assignFacultiesWithCourseIntoDB = async (
  id: string,
  payload: Partial<TCourseFaculty>,
) => {
  const result = await courseFaculty.findByIdAndUpdate(
    id,
    {
      course: id,
      $addToSet: { faculties: { $each: payload } },
    },
    {
      upsert: true,
      new: true,
    },
  );

  return result;
};

const removeFacultiesFromCourseFromDB = async (
  id: string,
  payload: Partial<TCourseFaculty>,
) => {
  const result = await courseFaculty.findByIdAndUpdate(
    id,
    {
      $pull: { faculties: { $in: payload } },
    },
    {
      new: true,
    },
  );

  return result;
};

export const CourseServices = {
  createCourseIntoDB,
  getAllCoursesFromDB,
  getSingleCourseFromDB,
  deleteCourseFromDB,
  updateCourseIntoDB,
  assignFacultiesWithCourseIntoDB,
  removeFacultiesFromCourseFromDB,
};
