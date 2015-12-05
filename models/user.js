var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
  username: String,
  password: String,
  fullname: String,
  admin: Boolean,
});

UserSchema.methods.verifyPassword = function(password, next){
	return this.password == password;
}

module.exports = mongoose.model('User', UserSchema);