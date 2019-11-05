import { Get, Controller, Post, Body, Res, Delete, Param, Put } from '@nestjs/common';
import { FeedbackModel } from '../models/feedback.model';
import { EventService } from '../services/event.service';

@Controller('feedback')
export class FeedbackController {
    constructor(private readonly eventService: EventService) { }
    @Post('/post/:idEvent')
    async create(@Body() model: FeedbackModel, @Param() idEvent: string, @Res() res) {
        try {
            const feedback = await this.eventService.createFeedback(model, idEvent);
            return res.status(200).json(feedback);
        } catch (e) {
            return res.status(500).json(e);

        }
    }
}