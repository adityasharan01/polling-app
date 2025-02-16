import { Schema, model } from "mongoose"

const optionSchema = new Schema({
    text: {
        type: String,
        required: true,
        trim: true
    },
    votes: {
        type: Number,
        default: 0
    }
});

const pollSchema = new Schema({
    question: {
        type: String,
        required: true,
        trim: true
    },
    options: [optionSchema],
    totalVotes: {
        type: Number,
        default: 0
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Poll = model('Poll', pollSchema);
export default Poll;