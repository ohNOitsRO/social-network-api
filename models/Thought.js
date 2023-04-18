const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const reactionSchema = new mongoose.Schema({
    reactionId: {
        type: Schema.Types.ObjectId,
        default: () => new Types.ObjectId(),
        },
    reactionBody: {
        type: String,
        required: true,
        maxlength: 280,
        },
    username: {
        type: String,
        required: true,
        },
    createdAt: {
        type: Date,
        default: Date.now, 
        get: (timeCreated) => dateFormat(timeCreated),
      },
    },
    {
      toJSON: {
        getters: true,
      },
      id: false,
    }
  );

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
        reactionSchema 
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

const Thought = model('Thought', thoughtSchema);

module.exports = Thought;