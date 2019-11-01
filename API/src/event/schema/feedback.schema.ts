import * as mongoose from 'mongoose';

export const FeedbackSchema = new mongoose.Schema({
    text: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        require: true,
    },
    like: {
        type: Number,
        default: 0
    },
    dislike: {
        type: Number,
        default: 0
    },
},
    {
        toJSON: {
            versionKey: false,
            virtuals: true,
        },
    });

const Feedback = mongoose.model('Feedback', FeedbackSchema);
module.exports = Feedback; 