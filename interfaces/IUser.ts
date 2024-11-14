import { ObjectId } from 'mongoose';

interface IUser {
	_id: ObjectId;
	username: string;
	email: string;
	password: string;
	firstName: string;
	lastName: string;
}

export default IUser;
