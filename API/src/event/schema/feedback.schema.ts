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
    feedbackBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        require: true,
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