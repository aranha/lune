import { EventModel } from './../../event/models/event.model';
import { FeedbackModel } from 'src/event/models/feedback.model';
export class UserModel {
    constructor(
        public _id: string,
        public id: string,
        public firstName: string,
        public lastName: string,
        public phoneNumber: string,
        public email: string,
        public password: string,
        public hours: number,
        public role: string,
        public interestCategories: string[],
        public favoritedEvents: EventModel[],
        public participatedEvents: EventModel[],
        public createdEvents: EventModel[],
        public feedback: FeedbackModel[]
    ) { }
}
