import Poll from "../Models/poll.model.js"

export const getAllPolls = async (req, res) => {
    try {
        // Get polls
        const polls = await Poll.find()
                .sort({ createdAt: -1 })

        res.send({ polls });
    } catch (error) {
        console.error('Error fetching polls:', error);
        res.status(500).json({ message: `Server error while fetching polls. Error: ${error}` });
    }
}

export const getPollById = async (req, res) => {
    try {
        const pollId = req.body.pollId
        if (!pollId) {
            throw new Error('Invalid poll-id')
        }
        const polls = await Poll.find({_id: pollId})
        res.send({ polls });
    } catch (error) {
        console.error('Error fetching polls:', error);
        res.status(500).json({ message: `Server error while fetching poll with id: ${req.body.pollId}` });
    }
}

export const votePollById = async (req, res) => {
    try {
        const { optionIndex, pollId } = req.body;

        // Validate option index
        if (typeof optionIndex !== 'number' || optionIndex < 0) {
            return res.status(400).json({
                message: 'Valid option index is required'
            });
        }

        // Find poll and ensure option exists
        const poll = await Poll.findById(pollId);

        if (!poll) {
            return res.status(404).json({ message: 'Poll not found' });
        }

        if (optionIndex >= poll.options.length) {
            return res.status(400).json({ message: 'Invalid option index' });
        }

        // Update using MongoDB's atomic operators
        const updatedPoll = await Poll.findOneAndUpdate(
            { _id: req.params.id },
            {
                $inc: {
                    [`options.${optionIndex}.votes`]: 1,
                    totalVotes: 1
                }
            },
            { new: true } // Return updated document
        );

        res.json(updatedPoll);
    } catch (error) {
        // Check if error is due to invalid ObjectId
        if (error.kind === 'ObjectId') {
            return res.status(400).json({ message: 'Invalid poll ID format' });
        }

        console.error('Error voting on poll:', error);
        res.status(500).json({ message: `Server error while voting. Error: ${error}` });
    }
}

export const createPoll = async (req, res) => {
    try {
        const { question, options } = req.body;

        // Validation
        if (!question || !question.trim()) {
            return res.status(400).json({ message: 'Question is required' });
        }

        if (!Array.isArray(options) || options.length < 2) {
            return res.status(400).json({
                message: 'At least two options are required'
            });
        }

        // Validate each option
        const validOptions = options.every(option =>
            option && typeof option === 'string' && option.trim()
        );

        if (!validOptions) {
            return res.status(400).json({
                message: 'All options must be non-empty strings'
            });
        }

        // Create poll with formatted options
        const poll = new Poll({
            question: question.trim(),
            options: options.map(option => ({
                text: option.trim(),
                votes: 0
            })),
            totalVotes: 0
        });

        const savedPoll = await poll.save();
        res.status(201).json(savedPoll);
    } catch (error) {
        console.error('Error creating poll:', error);
        res.status(500).json({ message: `Server error while creating poll. Error: ${error}` });
    }
}