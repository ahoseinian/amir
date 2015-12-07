var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');

var UserSchema = new mongoose.Schema({
  username: {type:String, unique: true},
  password: String,
  fullname: String,
  admin: Boolean,
});

UserSchema.methods.verifyPassword = function(password, next){
	return this.password == password;
}

UserSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', UserSchema);