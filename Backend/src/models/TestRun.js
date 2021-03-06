const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator')
const { Schema } = mongoose;

var testRunSchema=new Schema({
    userName: {
        type: String
      },
      projectName:{
        type: String
      },
    arn:{
        type: String,
      },
    name:{
        type: String,
        required: [true, 'Test Runner Name is mandatory'],
      },
    type:{
        type: String
      },
    platform:{
        type: String
      },
    status:{
        type: String
      },
    result:{
        type: String
      },
    counters:{},
    totalJobs:Number,
    deviceMinutes:{},
    jobs:[]
});

testRunSchema.plugin(uniqueValidator);
const testerRun = mongoose.model('testRun', testRunSchema);

module.exports = testerRun;

