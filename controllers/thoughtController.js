const { User, Thought} = require('../models');

const thoughtController = {

    getAllThought(req, res) {
        Thought.find({})
            .populate({
                path: 'reactions',
                select: '-__v'
            })
            .select('-__v')
            .sort({ _id: -1 })
            .then(thoughtData => res.json(thoughtData))
            .catch(err => {
                console.log(err);
                res.sendStatus(400);
            });
    },
    
    getThoughtById({ params }, res) {
        Thought.findOne({ _id: params.id })
            .populate({
                path: 'reactions',
                select: '-__v'
            })
            .select('-__v')
            .sort({ _id: -1 })
            .then(thoughtData => {
                if (!thoughtData) {
                res.status(404).json({ message: 'No thoughts found!' });
                return;
            }

            res.json(thoughtData);

            })
            .catch(err => {
                console.log(err);
                res.sendStatus(400);
            });
    },

    createThought({ body }, res) {
        Thought.create(body)
            .then(({ _id }) => {
                return User.findOneAndUpdate(
                { _id: body.userId },
                { $push: { thoughts: _id } },
                { new: true }
            );
            })
            .then(thoughtData => {
                if (!thoughtData) {
                    res.status(404).json({ message: 'User not found!' });
                    return;
            }

            res.json(thoughtData);

            })
            .catch(err => {
                console.log(err);
                res.sendStatus(400);
            })
    },

    updateThought({ params, body }, res) {
        Thought.findOneAndUpdate(
            { _id: params.id }, 
            body, 
            { new: true, runValidators: true })
            .then(thoughtData => {
                if (!thoughtData) {
                    res.status(404).json({ message: 'No thoughts found!' });
                    return; 
            }
                
            res.json(thoughtData);

            })
            .catch(err => {
                console.log(err);
                res.sendStatus(400);
            })
    },
    
    deleteThought({ params }, res) {
        Thought.findOneAndDelete({ _id: params.id })
            .then(thoughtData => {
                if (!thoughtData) {
                    res.status(404).json({ message: 'No thoughts found!' });
                    return;
                }
                return User.findOneAndUpdate(
                    { _id: params.userId },
                    { $pull: { thoughts: params.Id } },
                    { new: true }
                )
            })
            .then(userData => {
                if (!userData) {
                    res.status(404).json({ message: 'User not found!' });
                    return;
                }

                res.json(userData);
            })
            .catch(err => {
                console.log(err);
                res.sendStatus(400);
            })
    },
        
    createReaction({ params, body }, res) {
        Thought.findOneAndUpdate(
            { _id: params.thoughtId }, 
            { $push: { reactions: body } }, 
            { new: true, runValidators: true })
            .populate({ path: 'reactions', select: '-__v' })
            .select('-__v')
            .then(thoughtData => {
                if (!thoughtData) {
                    res.status(404).json({ message: 'No thoughts found!' });
                    return;
                }

                res.json(thoughtData);
            })
            .catch(err => {
                console.log(err);
                res.sendStatus(400);
            })
    },

    deleteReaction({ params }, res) {
        Thought.findOneAndUpdate(
            { _id: params.thoughtId },
            { $pull: { reactions: { reactionId: params.reactionId } } },
            { new: true })
            .then(thoughtData => {
                if (!thoughtData) {
                    res.status(404).json({ message: 'No thoughts found!' });
                    return;
                }
                res.json(thoughtData);
            })
            .catch(err => {
                console.log(err);
                res.sendStatus(400);
            })
    }

};


module.exports = thoughtController
