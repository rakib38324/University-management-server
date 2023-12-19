import { Schema, model } from 'mongoose';
import { TUser, UserModel } from './user.interface';
import bcrypt from 'bcrypt';
import config from '../../config';

const User_Schema = new Schema<TUser, UserModel>(
  {
    id: {
      type: String,
      require: true,
      unique: true,
    },
    password: {
      type: String,
      require: true,
      select: 0,
    },
    needsPasswordChange: {
      type: Boolean,
      default: true,
    },
    passwordChangedAt: {
      type: Date,
    },
    role: {
      type: String,
      enum: ['admin', 'student', 'faculty'],
    },
    status: {
      type: String,
      enum: ['in-progress', 'blocked'],
      default: 'in-progress',
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

//================= make middleware=================

User_Schema.pre('save', async function (next) {
  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const user = this;

  //hashing password and save into DB
  user.password = await bcrypt.hash(
    user.password,
    Number(config.bcrypt_salt_round),
  );

  next();
});

//========= pre save middleware/ hook ==============
//--> set "" after saving password
User_Schema.post('save', function (doc, next) {
  doc.password = '';
  next();
});

User_Schema.statics.isUserExistsByCustomId = async function (id: string) {
  return await User.findOne({ id }).select('+password');
};

User_Schema.statics.isPasswordMatched = async function (
  plainTextPassword: string,
  hasPassword: string,
) {
  return await bcrypt.compare(plainTextPassword, hasPassword);
};

export const User = model<TUser, UserModel>('User', User_Schema);
