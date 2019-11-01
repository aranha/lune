import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { FeedbackModel } from "../models/feedback.model";
import { Model, Types } from 'mongoose';
import { EventService } from "./event.service";

@Injectable()
export class FeedbackService {
    constructor(@InjectModel('Feedback') private readonly model: Model<FeedbackModel>, private readonly eventService: EventService) { }

    async create(model: FeedbackModel, idEvent: string): Promise<FeedbackModel> {
        const feedback = new this.model(model);
        const event = await this.eventService.getEventById(idEvent);
        await feedback.save();
        event.feedback.push(feedback);
        return feedback;
    }

}