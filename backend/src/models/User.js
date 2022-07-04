const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: String,
    required: true
  }
});

userSchema.pre('save', function(next) {
  const user = this;
  if (!user.isModified('password')) {       // check if user did not change his password
    return next();
  }

  bcrypt.genSalt(10, (err, salt) => {       // generating salt (random string of 10 characters) for the password
    if (err) { return next(err); }

    bcrypt.hash(user.password, salt, (err, hash) => {
      if (err) { return next(err); }
      user.password = hash;
      next();
    });
  });
});

userSchema.methods.comparePassword = function(passwordToVerify) {
  const user = this;

  return new Promise((resolve, reject) => {
    bcrypt.compare(passwordToVerify, user.password, (err, isMatch) => {
      if (err) {
        return reject(err);
      }

      if (!isMatch) {
        return reject(false);
      }

      resolve(true);
    });
  });
};

mongoose.model('User', userSchema);
