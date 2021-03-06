var mongoose = require('mongoose');
var schema = mongoose.Schema;
var bcrypt = require('bcrypt-nodejs');
var uid = require('uniqid');

var employeeSchema = new schema({
    employeeId: {
        type: String,
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
        type: String
    },
    firstName: {
        type: String,
        required: true
    },
    middleName: {
        type: String
    },
    lastName: {
        type: String
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
    addressId: {
        type: String,
        ref: "Role"
    },
    roleName: {
        type: String,
        ref: "Role"
    },
    departmentName: {
        type: String,
        ref: "Department"
    },
    projectName: {
        type: String,
        ref: "Project"
    },
    leaveId: {
        type: String,
        ref: "Leave"
    },
    appraisalId: {
        type: String,
        ref: "Appraisal"
    },
    salaryId: {
        type: String,
        ref: "Salary"
    },
    timesheetId: {
        type: String,
        ref: "Timesheet"
    }
});

employeeSchema.pre('save', function (next) {
    this.employeeId = uid();
    this.password = uid();
    bcrypt.hash(this.password, null, null, function (err, hash) {
        if (err) {
            return next(err);
        }
        this.password = hash;
        next();
    });
});

module.exports = mongoose.model('Employee', employeeSchema);