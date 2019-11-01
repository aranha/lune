import { CategoryModel } from './category.model';
import { TagModel } from './tag.model';
import { UserModel } from 'src/user/models/user.model';
import { FeedbackModel } from './feedback.model';
export class EventModel {
    public id: string;
    public status: string;
    public title: string;
    public description: string;
    public price: number;
    public vacancies: number;
    public category: CategoryModel;
    public tag: TagModel;
    public hours: number;
    public link: string;
    public picture: String;
    public address: {
        street: string;
        number: number;
        complements: string;
        zipCode: number;
        district: string;
        city: string;
        state: string;
    };
    public feedback: FeedbackModel[];
    public startDate: string;
    public startHour: string;
    public endDate: string;
    public endHour: string;
    public observation: string;
    public createdBy: UserModel;
    public approvedBy: UserModel;
}
