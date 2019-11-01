import { UserModel } from "src/user/models/user.model";

export class FeedbackModel {
    public id: string;
    public text: string;
    public createdBy: UserModel;
    public createdAt: string;
    public like: number;
    public dislike: number;
}