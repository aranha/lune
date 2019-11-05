import { EventModel } from './../models/event.model';
import { InjectModel, MongooseModule } from '@nestjs/mongoose';
import { Injectable, Body, Res } from '@nestjs/common';
import { Model, Types } from 'mongoose';
import { FeedbackModel } from '../models/feedback.model';

@Injectable()
export class EventService {
    constructor(@InjectModel('Event') private readonly model: Model<EventModel>, @InjectModel('Feedback') private readonly feedbackModel: Model<FeedbackModel>) { }

    async get(): Promise<EventModel[]> {
        return await this.model.find().exec();
    }
    async getEventById(idEvent: string): Promise<EventModel> {
        return await this.model.findOne({ _id: idEvent });
    }

    async create(model: EventModel): Promise<EventModel> {
        const event = new this.model(model);
        return await event.save();
    }
    async createFeedback(feedbackModel: FeedbackModel, idEvent: string): Promise<EventModel> {
        const eventIdaux = JSON.stringify(idEvent);
        const eventId = JSON.parse(eventIdaux);
        const feedback = new this.feedbackModel(feedbackModel);
        await feedback.save();
        const feedbackId = JSON.stringify(feedback);
        const feedbackParse = JSON.parse(feedbackId);
        const feedbackMongo = Types.ObjectId(feedbackParse.id)
        const event = await this.getEventById(eventId.idEvent);
        event.feedback.push(feedbackMongo);
        await this.model.findOneAndUpdate({ _id: eventId.idEvent }, event).exec();
        return event;
    }

    async update(model: EventModel, id: string): Promise<EventModel> {
        return await this.model.findOneAndUpdate({ _id: id }, model, { new: true }).exec();
    }

    async getEventDetail(id: string) {
        var query = [];
        if (id) {
            query.push('');
        }
        query.push({
            '$unwind': {
                'path': '$tag',
                'preserveNullAndEmptyArrays': true
            }
        }, {
            '$lookup': {
                'from': 'tags',
                'localField': 'tag',
                'foreignField': '_id',
                'as': 'tags_doc'
            }
        }, {
            '$lookup': {
                'from': 'users',
                'localField': 'createdBy',
                'foreignField': '_id',
                'as': 'user_doc'
            }
        }, {
            '$lookup': {
                'from': 'users',
                'localField': 'approvedBy',
                'foreignField': '_id',
                'as': 'app_doc'
            }
        }, {
            'lookup': {
                'from': 'feedback',
                'localField': 'feedback',
                'foreignField': '_id',
                'as': 'feed_doc'

            }
        }, {
            'lookup': {
                'from': 'users',
                'localField': 'feedback',
                'foreignField': '_id',
                'as': 'feed_doc'

            }
        },
            {
                '$lookup': {
                    'from': 'categories',
                    'localField': 'category',
                    'foreignField': '_id',
                    'as': 'cat_doc'
                }
            }, {
            '$group': {
                '_id': '$_id',
                'status': {
                    '$first': '$status'
                },
                'tag': {
                    '$addToSet': {
                        '$arrayElemAt': [
                            '$tags_doc', 0
                        ]
                    }
                },
                'title': {
                    '$first': '$title'
                },
                'description': {
                    '$first': '$description'
                },
                'startDate': {
                    '$first': '$startDate'
                },
                'startHour': {
                    '$first': '$startHour'
                },
                'endHour': {
                    '$first': '$endHour'
                },
                'endDate': {
                    '$first': '$endDate'
                },
                'observation': {
                    '$first': '$observation'
                },
                'price': {
                    '$first': '$price'
                },
                'hours': {
                    '$first': '$hours'
                },
                'createdBy': {
                    '$first': {
                        '$arrayElemAt': [
                            '$user_doc', 0
                        ]
                    }
                },
                'approvedBy': {
                    '$first': {
                        '$arrayElemAt': [
                            '$app_doc', 0
                        ]
                    }
                },
                'feedback': {
                    '$addToSet': {
                        '$arrayElemAt': [
                            '$tags_doc', 0
                        ]
                    }
                },
                'address': {
                    '$first': '$address'
                },
                'picture': {
                    '$first': '$picture'
                },
                'link': {
                    '$first': '$link'
                },
                'vacancies': {
                    '$first': '$vacancies'
                },
                'category': {
                    '$first': {
                        '$arrayElemAt': [
                            '$cat_doc', 0
                        ]
                    }
                }
            }
        }, {
            '$project': {
                'tag.createdAt': 0,
                'tag.updatedAt': 0,
                'tag.__v': 0,
                'createdBy.createdAt': 0,
                'createdBy.updatedAt': 0,
                'createdBy.__v': 0,
                'createdBy.password': 0,
                'createdBy.email': 0,
                'createdBy.interestCategories': 0,
                'createdBy.favoritedEvents': 0,
                'createdBy.participatedEvents': 0,
                'createdBy.createdEvents': 0,
                'approvedBy.createdAt': 0,
                'approvedBy.updatedAt': 0,
                'approvedBy.__v': 0,
                'approvedBy.password': 0,
                'approvedBy.email': 0,
                'approvedBy.interestCategories': 0,
                'approvedBy.favoritedEvents': 0,
                'approvedBy.participatedEvents': 0,
                'approvedBy.createdEvents': 0,
                'category.createdAt': 0,
                'category.updatedAt': 0,
                'category.__v': 0, 'feedback.text': 0,
                'feedback.createdAt': 0,
                'feedback.createdBy': 0,
                'feedback.like': 0,
                'feedback.dislike': 0
            }
        }
        )
        if (id) {
            query[0] = {
                ...{
                    '$match': {
                        '_id': Types.ObjectId(id)
                    }
                }
            };
        }
        return await this.model.aggregate([query]);
    }

    async getEventByStatus(status: string): Promise<EventModel> {
        return await this.model.find({ status: status });
    }

    async deleteEventByObjectId(id: string) {
        this.model.findOneAndDelete({ _id: id }).exec().then(res => {
            return
        })
    }
}
