const mongoose = require('mongoose');

const usersSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true  },
  thought: [{ type: Schema.Types.ObjectId, ref: 'thought' }],
  friends: [{ type: Schema.Types.ObjectId, ref: 'user' }]
});

usersSchema.virtual('friendsCount').get(function () {
    return this.friends.length;
  });

  
const Users = mongoose.model('Users', userSchema);

const handleError = (err) => console.error(err);

module.exports = Users;