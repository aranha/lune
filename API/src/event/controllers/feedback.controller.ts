import { Get, Controller, Post, Body, Res, Delete, Param } from '@nestjs/common';
import { FeedbackModel } from '../models/feedback.model';
import { CategorySchema } from '../schema/category.schema';
import { EventService } from '../services/event.service';
import { UserService } from 'src/user/user.service';
import { FeedbackService } from '../services/feedback.service';

@Controller('feedback')
export class FeedbackController {
    constructor(private readonly service: FeedbackService, private readonly eventService: EventService) { }
    @Post()
    async create(@Body() model: FeedbackModel, idEvent: string, @Res() res) {
        try {
            const feedback = await this.service.create(model, idEvent);
            return res.status(200).json(feedback);
        } catch (e) {
            return res.status(500).json(e);
        }
    }
    async postLike(idEvent: string, idFeedback: string, @Res() res): Promise<FeedbackModel> {
        try {
            const event = await this.eventService.getEventById(idEvent);
            const feedbacks = event.feedback;
            feedbacks.filter(feedback => {
                if (feedback.id == idFeedback) {
                    feedback.like++;
                }
            })

        } catch (e) {
            return res.status(500).json(e);
        }
    }

    async postDislike(idEvent: string, idFeedback: string, @Res() res): Promise<FeedbackModel> {
        try {
            const event = await this.eventService.getEventById(idEvent);
            const feedbacks = event.feedback;
            feedbacks.filter(feedback => {
                if (feedback.id == idFeedback) {
                    feedback.dislike++;
                }
            })
        } catch (e) {
            return res.status(500).json(e);
        }

    }
}