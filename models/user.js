const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const { Schema } = mongoose;

const UserSchema = new Schema({
  username: {
    type: String,
    required: [true, 'Username is required'],
    unique: true,
    minlength: 3,
    maxlength: 20,
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: 8,
    maxlength: 100,
  },
});

UserSchema.pre('save', async function hash(next) {
  try {
    const salt = await bcrypt.genSalt(10);

    const hashedPassword = await bcrypt.hash(this.password, salt);

    this.password = hashedPassword;

    next();
  } catch (error) {
    next(error);
  }
});

UserSchema.methods.isValidPassword = async function isValidPassword(password) {
  return bcrypt.compare(password, this.password);
};

module.exports = mongoose.model('User', UserSchema);
