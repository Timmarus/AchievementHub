import { getAllAchievements } from "./achievement";
// user action functions
const log = console.log
// Send a request to check if a user is logged in through the session cookie
export const checkSession = async (app) => {
    const url = "/users/check-session";

    var userName;
    await fetch(url)
        .then(res => {
            if (res.status === 200) {
                return res.json();
            }
        })
        .then(json => {
            if (json && json.currentUser) {
                userName = json.currentUser.userName
                app.setState({ currentUser: json.currentUser });
                // getAllAchievements(json.currentUser.userName, app);
            }
        })
        .catch(error => {
            console.log("user actions")
            console.log(error);
            
        });
    log(userName)
    
    await fetch("/api/achievements/" + userName)
        .then(res => {
            if (res.status === 200) {
                console.log("Achievements retrieved successfully.")
                return res.json();
            }
        }).then(json => {
            console.log(json);
            app.setState({ allAchievements: json.achievementArray});
            
        }).catch(error => {
            console.log(error);
        });
};


// General handler for taking form data into 
export const formToState = (component, field) => {
    const value = field.value;
    const name = field.name;
    component.setState({
        [name]: value
    });
    console.log(value + ": " + name)
}

// A functon to update the login form state
export const updateLoginForm = (loginComp, field) => {
    const value = field.value;
    const name = field.name;

    loginComp.setState({
        [name]: value
    });
};

// A function to send a POST request with the user to be logged in
export const login = (loginComp, app) => {
    // Create our request constructor with all the parameters we need
    document.removeEventListener("keydown", loginComp.handleEnter);
    const request = new Request("/users/login", {
        method: "post",
        body: JSON.stringify(loginComp.state),
        headers: {
            Accept: "application/json, text/plain, */*",
            "Content-Type": "application/json"
        }
    });

    var userName;

    // Send the request with fetch()
    userName = fetch(request)
        .then(res => {
            if (res.status === 200) {
                console.log("user auth okay")
                return res.json();
            }
        })
        .then(json => {
            
            //console.log(json);
            userName = json.currentUser.userName
            if (json.currentUser !== undefined) {
                app.setState({ currentUser: json.currentUser });
            }
            return json.currentUser.userName;
            
        })
        .catch(error => {
            console.log(error);
        });
    userName.then(userName => {
        fetch("/api/achievements/" + userName)
        .then(res => {
        if (res.status === 200) {
            console.log("Achievements retrieved successfully.")
            return res.json();
        }
    }).then(json => {
        console.log(json);
        app.setState({ allAchievements: json.achievementArray});
        
    }).catch(error => {
        console.log(error);
    });
    })
    
};

// A function to send a GET request to logout the current user
export const logout = (app) => {
    const url = "/users/logout";

    fetch(url)
        .then(res => {
            app.setState({
                currentUser: null,
                message: { type: "", body: "" },
                currentPage: null
            });
        })
        .catch(error => {
            console.log(error);
        });
};

export const signUp = (loginComp, app) => {
    // Create our request constructor with all the parameters we need
    const request = new Request("/api/users", {
        method: "post",
        body: JSON.stringify(loginComp.state),
        headers: {
            Accept: "application/json, text/plain, */*",
            "Content-Type": "application/json"
        }
    });
    //console.log(JSON.stringify(loginComp.state));
    document.removeEventListener("keydown", loginComp.handleEnter);
    // Send the request with fetch()
    fetch(request)
        .then(res => {
            if (res.status === 200) {
                console.log("account created")
                return res.json();
            } else if (res.status == 409) {
                res.json().then(returnedJson => {
                    const fields = Object.keys(returnedJson.keyValue);
                    loginComp.setState({errors: true, errorFields: fields})
                })
            }
        })
        .then(json => {
            console.log(json);
            if (json.currentUser !== undefined) {
                app.setState({ currentUser: json.currentUser });
            }
            
        })
        .catch(error => {
            console.log(error);
        });
}

export const updateProfileData = (profileComp, app) => {
    const newRealName = profileComp.state.realName;
    const newUsername = profileComp.state.username;
    const newEmail = profileComp.state.email;

    const request = new Request("/api/users/updateProfile", {
        method: "PATCH",
        body: JSON.stringify({"newRealName": newRealName,
               "newUsername": newUsername,
               "newEmail": newEmail,
                "currentUser": app.state.currentUser}),
        headers: {
            Accept: "application/json, text/plain, */*",
            "Content-Type": "application/json"
        }
    });
    fetch(request)
        .then(res => {
            if (res.status == 200) {
                console.log("User info updated.");
                res.json().then(returnedJson => {
                    let newData = returnedJson.newUserData;
                    app.setState({currentUser: newData});
                    profileComp.setState({errors: false})
                });
                return true;
            } else if (res.status == 409) {
                res.json().then(returnedJson => {
                    console.log("Failed to update user data");
                    //console.log(returnedJson);
                    const fields = Object.keys(returnedJson.keyValue);
                    profileComp.setState({errors: true, errorFields: fields})
                    console.log(fields);
                })
                return false;
            }
        }).catch(err => {
            console.log(err);
        })
}


export const addLinkedAccount = (profileComp, app) => {
    const newLinkedAccountType = profileComp.state.newLinkedAccountType;
    const newLinkedAccountName = profileComp.state.newLinkedAccountName;
    const request = new Request("/api/users/linkedAccounts", {
        method: "PATCH",
        body: JSON.stringify({"accountType": newLinkedAccountType,
               "accountUsername": newLinkedAccountName,
                "currentUser": app.state.currentUser}),
        headers: {
            Accept: "application/json, text/plain, */*",
            "Content-Type": "application/json"
        }
    });
    fetch(request)
        .then(res => {
            if (res.status == 200) {
                console.log("Linked account added");
                res.json().then(returnedJson => {
                    let newData = returnedJson.newUserData;
                    app.setState({currentUser: newData});
                });
            }
        }).catch(err => {
            console.log(err);
        })
}

export const deleteLinkedAccount = (profileComp, app) => {
    const linkedAccountId = profileComp.props.id;
    const userId = app.state.currentUser._id;

    const request = new Request("/api/users/linkedAccounts", {
        method: "delete",
        body: JSON.stringify({"linkedAccountId": linkedAccountId,
               "userId": userId}),
        headers: {
            Accept: "application/json, text/plain, */*",
            "Content-Type": "application/json"
        }
    });

    fetch (request)
        .then(res => {
            if (res.status == 200) {
                console.log("Linked account deleted");
                res.json().then(returnedJson => {
                    let newData = returnedJson.newUserData;
                    app.setState({currentUser: newData});//{currentUser: {...app.state.currentUser, profile: {...app.state.currentUser.profile, linkedAccounts: newData}}});
                });
            }
        })

}

export const getProfileData = (profileComp, app) => {
    const request = new Request("/api/users", {
        method: "get",
        body: app.state.currentUser,
        headers: {
            Accept: "application/json, text/plain, */*",
            "Content-Type": "application/json"
        }
    })

    fetch (request)
        .then(res => {
            if (res.status === 200) {
                return res.json();
            }
        })
        .then(json => {
            if (json.profileData !== undefined) {
                profileComp.setState({profileData: json.profileData});
            }
        })
        .catch(error => {
            console.log(error);
        });
}

export const setProfilePic = (picNum, userName, app) => {
    // Create our request constructor with all the parameters we need
    const request = new Request("/api/users/profilePic", {
        method: "PATCH",
        body: JSON.stringify({picNum: picNum, userName: userName}),
        headers: {
            Accept: "application/json, text/plain, */*",
            "Content-Type": "application/json"
        }
    });
    // Send the request with fetch()
    fetch(request)
        .then(res => {
            if (res.status === 200) {
                console.log("picture changed!")
                return res.json();
            }})
        .then(json => {
            console.log(json);
            if (json.currentUser !== undefined) {
                app.setState({ currentUser: json.currentUser });
            }
            
        })
        .catch(error => {
            console.log(error);
        });
}

