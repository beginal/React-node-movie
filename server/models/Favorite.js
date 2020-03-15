const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  userFrom: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  }

})

const Favorite = mongoose.model('Favorite', userSchema);

module.exports = { Favorite }