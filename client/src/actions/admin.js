// user action functions
const log = console.log

// Send a request to delete a user from the database
export const deleteUser = (adminComp) => {

    // log(accountComp); // holds account state
        // log(app); // holds app state
    
        const request = new Request("/api/users/delete", {
            method: "DELETE",
            body: JSON.stringify({currentUser: adminComp.state.adminDeleteUserUsername}),
            headers: {
                Accept: "application/json, text/plain, */*",
                "Content-Type": "application/json"
            }
        });
    
        // Send the request with fetch()
        fetch(request)
            .then(res => {
                if (res.status === 200) {
                    console.log("account deleted successfully")
                    return res.json();
                }
            })
            .catch(error => {
                console.log(error);
            });
        //should make fetch request to backend to delete the user
    }

// Send a request to create a new user
export const createUser = (adminComp) => {
    // Create our request constructor with all the parameters we need
    const request = new Request("/api/users", {
        method: "POST",
        body: JSON.stringify({userName: adminComp.state.adminCreateUserUsername, password: adminComp.state.adminCreateUserPassword}),
        headers: {
            Accept: "application/json, text/plain, */*",
            "Content-Type": "application/json"
        }
    });

    // Send the request with fetch()
    fetch(request)
        .then(res => {
            if (res.status === 200) {
                console.log("Account created.")
                return res.json();
            }
        }).catch(error => {
            console.log(error);
        });
}

// Send a request to update a user's username
export const updateUsername = (adminComp) => {
    // log(accountComp); // holds account state
    // log(app); // holds app state

    const request = new Request("/api/users/username", {
        method: "PATCH",
        body: JSON.stringify({state: adminComp.state, currentUser: adminComp.state.adminChangeUsernameOldUsername}),
        headers: {
            Accept: "application/json, text/plain, */*",
            "Content-Type": "application/json"
        }
    });

    // Send the request with fetch()
    fetch(request)
        .then(res => {
            if (res.status === 200) {
                console.log("username changed successfully") // report successful username change
                log("logging out...")
                return res.json();
            }
        })
        .catch(error => {
            console.log(error);
        });
    //should make fetch request to backend to update username
}

// Send a request to update a user's admin status
export const makeAdmin = (adminComp) => {
    // Create our request constructor with all the parameters we need
    const request = new Request("/api/users/admin", {
        method: "PATCH",
        body: JSON.stringify({userName: adminComp.state.adminMakeAdminUsername}),
        headers: {
            Accept: "application/json, text/plain, */*",
            "Content-Type": "application/json"
        }
    });

    // Send the request with fetch()
    fetch(request)
        .then(res => {
            if (res.status === 200) {
                console.log("User is now admin.")
                return res.json();
            }
        }).catch(error => {
            console.log(error);
        });
}

// Send a request to delete a user's achievement

// A functon to update the admin form state
export const updateAdminForm = (adminComp, field) => {
    const value = field.value;
    const name = field.name;

    adminComp.setState({
        [name]: value
    });
};