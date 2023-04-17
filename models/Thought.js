const mongoose = require('mongoose');

const thoughtSchema = new mongoose.Schema({
    thoughtText: { 
            type: String, 
            required: true,
            minlength: 1,
            maxlength: 280
            },
    createdAt: { 
            type: Date,
            default: Date.now,
            get: (timeCreated) => dateFormat(timeCreated)
            },
    username: [{ 
            type: String, 
            ref: 'thought' 
            }],
    reactions: [ 
            ReactionSchema 
            ]
},
{
    toJSON: {
            virtuals: true,
            getters: true,
            },
    id: false,
});

usersSchema.virtual('reactionCount').get(function () {
    return this.reactions.length;
  });

const Thought = model("Thought", ThoughtSchema);

module.exports = Thought;