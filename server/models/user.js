const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');
const crypto = require('crypto');
mongoose.promise = Promise;

// Define userSchema
const userSchema = new Schema({
	firstName: { type: String, unique: false },
	lastName: { type: String, unique: false },
  	username: { type: String, unique: false, required: false },
  	password: { type: String, unique: false, required: false },
	email: { type: String, unique: false, required: false},
	teacherCode: {type: Schema.Types.ObjectId, ref: 'User',required: false},
	difficulty: {type:String, default: 'beginner'},
	grades:{
		beginner: {
			correct: {type: Number, default: 0},
			total: {type: Number, default: 0}
		},
		intermediate: {
			correct: {type: Number, default: 0},
			total: {type:Number, default: 0}
		},
		advanced:{
			correct: {type: Number, default: 0},
			total: {type: Number, default: 0}
		}
	}
});

// Define schema methods
userSchema.methods = {
	checkPassword: function(inputPassword) {
		return bcrypt.compareSync(inputPassword, this.password);
	},
	hashPassword: plainTextPassword => {
		return bcrypt.hashSync(plainTextPassword, 10);
	}
};

// Define hooks for pre-saving
userSchema.pre('save', function(next) {
	if (!this.password) {
		console.log('No password provided!');
		next();
	} else {
		// if (this.isTeacher) {
		// 	this.teacherCode = crypto.randomBytes(10).toString('hex');
		// }
		this.password = this.hashPassword(this.password);
		next();
	}
})

// Create reference to User & export
const User = mongoose.model('User', userSchema);
module.exports = User;
