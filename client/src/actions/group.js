// user action functions
const log = console.log

// Send a request to create a group
export const createGroup = (groupComp, app) => {
    // Create our request constructor with all the parameters we need
    const request = new Request("/api/groups", {
        method: "POST",
        body: JSON.stringify({...groupComp.state, owner: app.state.currentUser.userName}),
        headers: {
            Accept: "application/json, text/plain, */*",
            "Content-Type": "application/json"
        }
    });

    // Send the request with fetch()
    fetch(request)
        .then(res => {
            if (res.status === 200) {
                console.log("Group created successfully.")
                return res.json();
            }
        }).then(json => {
            console.log(json);
            if (json.currentUser !== undefined) {
                app.setState({ currentUser: json.currentUser });
            }
            
        }).catch(error => {
            console.log(error);
        });
}

// Leader of a group deletes a group. Send a request to delete a group
export const deleteGroup = async (groupName, app) => {
    //const groupName = groupComp.state.groupName;
    // make sure groupComp has a userName field that holds the currentUser logged in's username
    const path = '/api/groups/'
    
    const request = new Request(path, {
        method: "DELETE",
        body: JSON.stringify({groupName: groupName, userName: app.state.currentUser.userName}), //groupComp.state
        headers: {
            Accept: "application/json, text/plain, */*",
                "Content-Type": "application/json"
            }
    });
    
    // Send the request with fetch()
    // should make fetch request to backend to delete the group
    await fetch(request).then(res => {
        if (res.status === 200) {
                console.log("Group deleted successfully.")
                return res.json();
        }
    }).then(json => {
        console.log(json);
        if (json.currentUser !== undefined) {
            app.setState({ currentUser: json.currentUser });
        }   
    })
    .catch(error => {
        console.log(error);
    });


}

// Make a request to delete this user from the group's list of members
export const leaveGroup = (groupName, app) => {
    const userName = app.state.currentUser.userName;

    const path = '/api/groups/' + groupName + '/leave/' + userName;

    const request = new Request(path, {
        method: "DELETE",
        body: JSON.stringify({currentUser: app.state.currentUser.userName}),
        headers: {
            Accept: "application/json, text/plain, */*",
                "Content-Type": "application/json"
            }
    });
    
    // Send the request with fetch()
    // should make fetch request to backend to delete the group
    fetch(request).then(res => {
        if (res.status === 200) {
                console.log("Left the group.")
                return res.json();
        }
    }).then(json => {
        console.log(json);
        if (json.currentUser !== undefined) {
            app.setState({ currentUser: json.currentUser });
        }
        
    }).catch(error => {
        console.log(error);
    });
}

// Send a request to join a group
export const joinGroup = (groupComp, groupName, app) => {
    // Create our request constructor with all the parameters we need
    const userName = groupComp.state.userName;

    const path = '/api/groups/' + groupName + '/invite/' + userName;

    const request = new Request(path, {
        method: "POST",
        body: JSON.stringify({currentUser: app.state.currentUser.userName}),
        headers: {
            Accept: "application/json, text/plain, */*",
            "Content-Type": "application/json"
        }
    });

    // Send the request with fetch()
    fetch(request)
        .then(res => {
            if (res.status === 200) {
                console.log("Joined group.")
                return res.json();
            }
        }).then(json => {
            console.log(json);
            if (json.currentUser !== undefined) {
                app.setState({ currentUser: json.currentUser });
            }
            
        }).catch(error => {
            console.log(error);
        });
}

// A functon to update the group form state
export const updateGroupForm = (groupComp, field) => {
    const value = field.value;
    const name = field.name;

    groupComp.setState({
        [name]: value
    });
};

export const setGroupPic = (picNum, groupName, app) => {
    // Create our request constructor with all the parameters we need
    const request = new Request("/api/group/groupPic", {
        method: "PATCH",
        body: JSON.stringify({picNum: picNum, groupName: groupName}),
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
