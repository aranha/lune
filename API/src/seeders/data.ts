import * as mongoose from 'mongoose';
import { UserModel } from '../user/models/user.model';

export const users: UserModel[] = [
  {
    _id: mongoose.Types.ObjectId('000000000000000000000001'),
    id: '000000000000000000000001',
    role: 'Admin',
    firstName: 'Ad',
    lastName: 'min',
    email: 'admin@hublle.com',
    password: '123456',
    phoneNumber: null,
    interestCategories: [],
    favoritedEvents: [],
    participatedEvents: [],
    createdEvents: [],
  },
];
