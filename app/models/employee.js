var mongoose = require('mongoose');
var schema = mongoose.Schema;
var bcrypt = require('bcrypt-nodejs');
var uid = require('uniqid');

var employeeSchema = new schema({
    employeeId: {
        type: String,
        required: true,
        unique: true
    },
    username: {
        type: String,
        lowercase: true,
        required: true,
        unique: true,
        trim: true
    },
    password: {
        type: String,
        required: true
    },
    firstName: {
        type: String,
        required: true
    },
    middleName: {
        type: String
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        lowercase: true,
        required: true,
        unique: true,
        trim: true
    },
    gender: {
        type: String,
        required: true
    },
    dateOfBirth: {
        type: Date,
        default: Date.now
    },
    phoneNumber: {
        type: String,
        required: true
    },
    roleId: {
        type: String,
        required: true,
        ref: "Role"
    }
});

employeeSchema.pre('save', function(next) {
    this.employeeId = uid();
    this.password = uid();
    bcrypt.hash(this.password, null, null, function(err, hash) {
        if (err) {
            return next(err);
        }
        this.password = hash;
        next();
    });
});

module.exports = mongoose.model('Employee', employeeSchema);