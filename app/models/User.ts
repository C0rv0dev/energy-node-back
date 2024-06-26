import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: String,
  email: {
    type: String,
    unique: true,
    required: true,
    index: true,
  },
  password: {
    type: String,
    required: true,
  },
  settings: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'AppSettings',
  },
});

const User = mongoose.model('User', UserSchema);

export default User;
