"use strict";
const log = console.log;
const express = require("express")
const path = require('path')
const bodyParser = require("body-parser");

const { mongoose } = require("./db/mongoose")

mongoose.set('useFindAndModify', false);
const { ObjectID } = require("mongodb");

const { User, Profile } = require("./models/user");
const { Group } = require("./models/group");

const app = express()
app.use(bodyParser.json());

const session = require("express-session");
app.use(bodyParser.urlencoded({ extended: true }));

function isMongoError(error) { // checks for first error returned by promise rejection if Mongo database suddently disconnects
    return typeof error === 'object' && error !== null && error.name === "MongoNetworkError"
}

// middleware for mongo connection error for routes that need it
const mongoChecker = (req, res, next) => {
    // check mongoose connection established.
    if (mongoose.connection.readyState != 1) {
        log('Issue with mongoose connection')
        res.status(500).send('Internal server error')
        return;
    } else {
        next()  
    }   
}


// Middleware for authentication of resources
const authenticate = (req, res, next) => {
    if (req.session.user) {
        User.findById(req.session.user).then((user) => {
            if (!user) {
                return Promise.reject()
            } else {
                req.user = user
                next()
            }
        }).catch((error) => {
            res.status(401).send("Unauthorized")
        })
    } else {
        res.status(401).send("Unauthorized")
    }
}


/*** Session handling **************************************/
// Create a session and session cookie
app.use(
    session({
        secret: "our hardcoded secret",
        resave: false,
        saveUninitialized: false,
        cookie: {
            expires: 900000, // 15 minute session
            httpOnly: true
        }
    })
);

// A route to login and create a session
app.post("/users/login", (req, res) => {
    const userName = req.body.loginUserName;
    const password = req.body.loginPassword;
    //log(req);
    log("logging in...")
    // Use the static method on the User model to find a user
    // by their email and password
    User.findByUserPassword(userName, password)
        .then(user => {
            // Add the user's id to the session.
            // We can check later if this exists to ensure we are logged in.
            req.session.user = user._id;
            req.session.userName = user.userName; // we will later send the user to the browser when checking if someone is logged in through GET /check-session (we will display it on the frontend dashboard. You could however also just send a boolean flag).
            res.send({ currentUser: user, userProfile: user.profile });
        })
        .catch(error => {
            res.status(400).send()
        });
});

// A route to logout a user by destroying the current session
app.get("/users/logout", (req, res) => {
    // Remove the session
    req.session.destroy(error => {
        if (error) {
            res.status(500).send(error);
        } else {
            res.send("Logged in")
        }
    });
});


// A route to check if a user is logged in on the session
app.get("/users/check-session", (req, res) => {
    log(req.session);
    log(req.session.user);
    if (req.session.user) {
        User.findOne({"_id": req.session.user}).then((user) => {
            res.send({ currentUser: user });
        })
        .catch(err => {
            log(err);
            res.status(400).send("Bad Request")
        });
        
    } else {
        res.status(401).send();
    }

})

//*************API ROUTES****************/

// Create a new user
app.post('/api/users', mongoChecker, async (req, res) => {
    const joinTime = Date.now();
    const newProfile = {
        realName: req.body.registerRealName,
        email: req.body.registerEmail,
        joined: joinTime,
        achievements: [],
        groups: [],
        linkedAccounts: [],
        pic: Math.floor((Math.random() * 4) + 1)
    }
    // Create a new user
    const user = new User({
        userName: req.body.registerUserName,
        password: req.body.registerPassword,
        isAdmin: false,
        profile: newProfile
    })


    try {
        // Save the user
        const newUser = await user.save()
        res.send({currentUser: newUser})
    } catch (error) {
        if (error && error.code && error.code == 11000) {
            log(error);
            //const errors = Object.values(err.errors).map(el => el.message);
            //const fields = Object.values(err.errors).map(el => el.path);
            res.status(409).send(error);//{messages: errors, fields: fields});
        } else if (error) {
            log(error);
            res.status(500).send("Internal server error");
        } else {
            res.status(400).send("Bad Request");
        }
/*
        if (isMongoError(error)) { // check for if mongo server suddenly disconnected before this request.
            res.status(500).send('Internal server error')
        } else {
            log(error)
            res.status(400).send('Bad Request') // bad request for changing the student.
        }
        */
    }
})

app.get('/api/users', mongoChecker, async (req, res) => {
    const userId = req.body.currentUser._id;
    User.findById(userId, function(err, user) {
        if (err) {
            res.status(404).send("User not found");
            return;
        }
        res.status(200).send({userData: user})
    });
})


// Change a user's username
app.patch('/api/users/username', authenticate, mongoChecker, async (req, res) => {
    log(req.body)

    const oldUser = req.body.currentUser; // the user's current username
    const newUser = req.body.state.accountChangeUsername; // the user's new username
    
    User.findOneAndUpdate({"userName": oldUser},
                            {"userName": newUser},
                            {new: true, useFindAndModify: false})
                            .then((user) => {
                                user.save();
                                res.status(200).send("Username Changed")
                            })
                            .catch((error) => {
                                log(error)
                                res.status(500).send("Internal Server error")
                            })

})

// Change a user's password
app.patch('/api/users/password', authenticate, mongoChecker, async (req, res) => {
    log(req.body)

    // check if new password and confirm new password fields are the same
    if(req.body.state.accountNewPassword != req.body.state.accountNewPasswordConfirm){
        res.status(400).send("Passwords don't match")
    }

    const oldUser = req.body.currentUser; // the user's current username
    const newPassword = req.body.state.accountNewPassword; // the user's new username

    log(oldUser)
    log(newPassword)
    User.findOne({"userName": oldUser}, function (err, user) {
        user.password = newPassword;
    
        user.save(function (err) {
            if(err) {
                console.log(err);
                res.status(500).send("Internal server error")
            }
            else{
                res.status(200).send("password changed")
            }
        });
    });
})

// Delete a user
app.delete('/api/users/delete', authenticate, mongoChecker, async (req, res) => {
    log(req.body)


    const oldUser = req.body.currentUser; // the user's current username

    log(oldUser)
    User.findOneAndDelete({"userName": oldUser})
    .then(() => {
        res.status(200).send("Account deleted successfully")
    })
    .catch(error)
})

// Make a user an admin
app.patch('/api/users/admin', (req, res) => {
    log(req.body)
    const username = req.body.userName;

    User.findOneAndUpdate({"userName": username}, { "isAdmin": true}, {new: true, useFindAndModify: false}).then((user) => {
        user.save();
        res.status(200).send("User changed to admin.")
    })
    .catch((error) => {
        log(error)
        res.status(500).send("Internal Server error")
    })
})

/**************** USER PROFILE ENDPOINTS **************/

app.patch('/api/users/updateProfile', authenticate, mongoChecker, async (req, res) => {
    const newRealName = req.body.newRealName;
    const newUsername = req.body.newUsername;
    const newEmail = req.body.newEmail;
    const userId = req.body.currentUser._id;
    console.log(userId);
    User.findById(userId, function(err, user) {
        if (newRealName)
            user.profile.set({realName: newRealName});
        if (newUsername)
            user.set({userName: newUsername});
        if (newEmail)
            user.profile.set({email: newEmail});
        user.save(function (err) {
            if (err && err.code && err.code == 11000) {
                log(err);
                //const errors = Object.values(err.errors).map(el => el.message);
                //const fields = Object.values(err.errors).map(el => el.path);
                res.status(409).send(err);//{messages: errors, fields: fields});
            } else if (err) {
                log(err);
                res.status(500).send("Internal server error");
            } else {
                res.status(200).send({newUserData: user});
            }
        })
    })
});


app.patch('/api/users/linkedAccounts', authenticate, mongoChecker, async (req, res) => {
    const accountType = req.body.accountType;
    const accountUsername = req.body.accountUsername;
    const newAccount = {"type": accountType, "username": accountUsername}
    const userId = req.body.currentUser._id;
    User.findOne({"_id": userId}, function(err, user) {
        const linkedAccounts = user.profile.linkedAccounts;
        const accountExists = linkedAccounts.filter(function(account) {
            return account.type == accountType;
        }).pop();
        if (accountExists) {
            const existingAccount = linkedAccounts.id(accountExists._id)
            existingAccount.set(newAccount);
            user.save(function (err) {
                if (err.code) {
                    log(err);
                    res.status(500).send("Internal server error");
                } else {
                    res.status(200).send({newUserData: user});
                }
            });
        } else {
            linkedAccounts.push(newAccount);
            user.save(function (err) {
                if (err) {
                    log(err);
                    res.status(500).send("Internal server error");
                } else {
                    res.status(200).send({newUserData: user});
                }
            });
            
        }
    })
});

app.delete('/api/users/linkedAccounts', authenticate, mongoChecker, async (req, res) => {
    const linkedAccountId = req.body.linkedAccountId;
    const userId = req.body.userId;
    console.log(linkedAccountId);
    console.log(userId);
    User.findById(userId, function(err, user) {
        const linkedAccounts = user.profile.linkedAccounts;
        const accountExists = linkedAccounts.filter(function(account) {
            return linkedAccountId == account._id;
        }).pop();
        if (accountExists) {
            linkedAccounts.id(accountExists._id).remove();
            user.save(function (err) {
                if (err) {
                    log(err);
                    res.status(500).send("Internal server error");
                } else {
                    res.status(200).send({newUserData: user});
                }
            });
        } else {
            log("Linked account not found");
            res.status(404).send({newUserData: user});            
        }
    })
});


// change a user's profile picture
app.patch("/api/users/profilePic", mongoChecker, async (req, res) => {
    const {userName, picNum} = req.body;

    User.findOne({"userName": userName})
        .then((user) => {
            user.profile.set({"pic": picNum});
            user.save();
            res.status(200).send({currentUser: user})
        })
        .catch(err => {
            log(err);
            res.status(500).send("internal server error")
        })

})


// --------------------------Group-------------------------------------
// Create a new group
// Expected body
// {
//     "groupName" : "Test",
//     "owner" : "user",
// }
// Should add achievements of owner to group
app.post('/api/groups', (req, res) => {
    const { groupName, owner } = req.body

    let ownerAchievements = null;
    User.findOneAndUpdate({"userName": owner}, { "$push": { "profile.groups" : { "name": groupName, "admin": true } } } , {new: true, useFindAndModify: false}).then((user) => {
        ownerAchievements = user.profile.achievements
        res.send({ currentUser: user, userProfile: user.profile })
    }).catch((error) => {
        log(error) 
		if (isMongoError(error)) { 
			res.status(500).send('Internal server error')
		} else {
			res.status(400).send('Bad Request in User')
		}
    })
    const group = new Group({
        groupName,
        owner,
        members: [owner],
        achievements: ownerAchievements ? ownerAchievements : []
    })
    group.save().then((result) => {
		log(result)
	}).catch((error) => {
		log(error) 
		if (isMongoError(error)) { 
			res.status(500).send('Internal server error')
		} else {
			res.status(400).send('Bad Request')
		}
	})
})

// Add a member with :userName to a group with :groupName. This gets called when a user accepts an invite to the group.
app.post('/api/groups/:groupName/invite/:userName', (req, res) => {
    log(req.body)
    const groupName = req.params.groupName;
    const userName = req.params.userName;
    const currUser = req.body.currentUser;
    log(groupName)
    log(userName)

    Group.findOneAndUpdate({"groupName": groupName}, {"$push": {members: userName}}, {new: true, useFindAndModify: false}).then((group) => {
        group.save();
        res.status(200).send("Member " + userName + " has been added to group " + groupName + ".");
    })
    .catch((error) => {
        log(error)
        res.status(500).send("Internal Server error")
    })
    User.findOneAndUpdate({"userName": userName}, { "$push": { "profile.groups" : { "name": groupName, "admin": false } } } , {new: true, useFindAndModify: false}).then((user) => {
        log('Group has been added to user.profile.groups.')
    }).catch((error) => {
        log(error) 
		if (isMongoError(error)) { 
			res.status(500).send('Internal server error')
		} else {
			res.status(400).send('Bad Request in User')
		}
    })
    User.findOne({"userName": currUser})
    .then((user) => {
        log("groups")
        log(user.profile.groups)
        res.status(200).send({currentUser: user})
    })
    .catch(err => {
        res.status(500).send('Internal server error')
    })
})

// Delete a group
app.delete('/api/groups/', (req, res) => {
    const { groupName } = req.body;
    const currUser = req.body.userName;
    Group.findOne({"groupName": {"$eq": groupName}}).then((found) => {
        const { members } = found

        members.forEach(member => {
            User.findOne({"userName": member})
            .then(user => {
                let groupFound;
                user.profile.groups.forEach(group => {
                    if (group.name == groupName){ //
                        groupFound = group
                    }
                })

                user.profile.groups.pull(groupFound._id);
                user.save()
            })
            .catch((error) => {
                log(error) 
                if (isMongoError(error)) { 
                    res.status(500).send('Internal server error')
                } else {
                    res.status(400).send('Bad Request in User')
                }
            })
        })
    }).catch((error) => {
		log(error) 
		if (isMongoError(error)) { 
			res.status(500).send('Internal server error')
		} else {
			res.status(400).send('Bad Request')
		}
	})
    Group.deleteOne({"groupName": {"$eq": groupName}})
        .catch((error) => {
            log(error) 
            if (isMongoError(error)) { 
                res.status(500).send('Internal server error')
            } else {
                res.status(400).send('Bad Request')
            }
    })

    User.findOne({"userName": currUser})
    .then((user) => {
        log("groups")
        log(user.profile.groups)
        res.status(200).send({currentUser: user})
    })
    .catch(err => {
        res.status(500).send('Internal server error')
    })
})

// Remove a member with :userName from a group with :groupName. This gets called when a user LEAVES a group.
app.delete('/api/groups/:groupName/leave/:userName', (req, res) => {
    log(req.body)
    const groupName = req.params.groupName;
    const userName = req.params.userName;
    const currUser = req.body.currentUser;

    Group.findOneAndUpdate({"groupName": groupName}, {"$pull": {members: userName}}, {new: true, useFindAndModify: false}).then((group) => {
        group.save();
        res.status(200).send("Member " + userName + " has been removed from group " + groupName + ".");
    })
    .catch((error) => {
        log(error)
        if (isMongoError(error)) { 
			res.status(500).send('Internal server error')
		} else {
			res.status(400).send('Bad Request')
		}
    })
    User.findOne({"userName": userName}).then((user) => {
        user.profile.groups.forEach(group => {
            if (group.name == groupName){ 
                user.profile.groups.pull(group._id)
            }
        })
        user.save()
    }).catch((error) => {
        log(error) 
        if (isMongoError(error)) { 
            res.status(500).send('Internal server error')
        } else {
            res.status(400).send('Bad Request in User')
        }
    })    

    User.findOne({"userName": currUser})
    .then((user) => {
        log("groups")
        log(user.profile.groups)
        res.status(200).send({currentUser: user})
    })
    .catch(err => {
        res.status(500).send('Internal server error')
    })
})

// Get all members for a given group
app.get("/api/groups", (req, res) => {
    const groupName = req.body.groupName;
    Group.findOne({ "groupName" : groupName }).then((group) => {
        res.status(200).send(group.members);
    }).catch((error) => {
        log(error) 
        if (isMongoError(error)) { 
            res.status(500).send('Internal server error')
        } else {
            res.status(400).send('Bad Request in Group')
        }
    })
})

// --------------------------Achievements-------------------------------------
// NOT A SEPERATE COLLECTION
// Add achievement
// Expected body:
// {
//     "name": "Achievement",
//     "game": "Game",
//     "date": "Dec 11 2020"
// }
app.post('/api/achievements/:username', (req, res) => {
    const { username } = req.params
    const achievement = {
        name: req.body.name,
        game: req.body.game,
        date: req.body.date
    }
    User.findOneAndUpdate({"userName": username}, { "$push": { "profile.achievements" : achievement } } , {new: true, useFindAndModify: false}).then((user) => {
        const achievementWithAchiever = {
            name: req.body.name,
            game: req.body.game,
            date: req.body.date,
            achiever: username
        }
        user.profile.groups.forEach(group => {
            Group.findOneAndUpdate({"groupName": group.name}, { "$push": { "achievements" : achievementWithAchiever } } , {new: true, useFindAndModify: false}).then((group) => {
                log(group)
            }).catch((error) => {
                log(error) 
                if (isMongoError(error)) { 
                    res.status(500).send('Internal server error')
                } else {
                    res.status(400).send('Bad Request in User')
                }
            })
        })
        res.send({user})
    }).catch((error) => {
        log(error) 
		if (isMongoError(error)) { 
			res.status(500).send('Internal server error')
		} else {
			res.status(400).send('Bad Request in User')
		}
    })
})

// Get all achievements from all user's groups
app.get("/api/achievements/:username", (req, res) => {
    const { username } = req.params
    Group.find({"members": {"$in" : [username]} }).then((groups) => {
        let achievementArray = []
        groups.forEach(group => {
            achievementArray = achievementArray.concat(group.achievements)
        })
        res.send({"achievementArray" : achievementArray})
    })
})

// --------------------------Webpage-------------------------------------

app.use(express.static(path.join(__dirname, "/client/build")));

app.get("*", (req, res) => {
    const goodPageRoutes = ["/", "/Login", "/Admin", "/NewAchievement",
     "/Achievement", "/AllAchievements", "/Profile", "/ManageGroup", "/NewGroup", "/ManageMembers", "/ChoosePic"];

    if (!goodPageRoutes.includes(req.url)) {
        // if url not in expected page routes, set status to 404.
        res.status(404);
    }

    // send index.html
    res.sendFile(path.join(__dirname, "/client/build/index.html"));
});


/*************************************************/
// Express server listening...
const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Listening on port ${port}...`);
});