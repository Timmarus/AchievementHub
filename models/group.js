/* Group model */
'use strict';

const mongoose = require('mongoose')

const AchievementSchema = new mongoose.Schema({
    name: String,
    game: String,
    date: String,
    achiever: String
});

const GroupSchema = new mongoose.Schema({
    groupName: {
		type: String,
		required: true,
		minlength: 1,
		trim: true,
		unique: true
    },
    owner: {
        type: String,
        required: true
    },
    members: [{
        type: String
    }],
    achievements: [AchievementSchema],
    pic: {
        type: Number
    }
})

const Group = mongoose.model('Group', GroupSchema)
module.exports = { Group }