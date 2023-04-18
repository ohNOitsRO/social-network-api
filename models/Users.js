const mongoose = require('mongoose');

const usersSchema = new mongoose.Schema({
  username: { 
      type: String, 
      required: true, 
      unique: true, 
      trim: true 
      },
  email: { 
      type: String, 
      required: true, 
      unique: true, 
      match: [/.+\@.+\..+/] 
      },
  thought: [{ 
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'thought' 
      }],
  friends: [{ 
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'user' 
      }],
  },
  {
  toJSON: {
      virtuals: true,
      getters: true
      },
  id: false
  }
);

usersSchema.virtual('friendsCount').get(function () {
    return this.friends.length;
  });

  
const Users = mongoose.model('Users', usersSchema);

module.exports = Users;