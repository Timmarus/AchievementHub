import { logout } from "./user";
// user action functions
const log = console.log


export const updateUsername = (accountComp, app) => {
    // log(accountComp); // holds account state
    // log(app); // holds app state

    const request = new Request("/api/users/username", {
        method: "PATCH",
        body: JSON.stringify({state: accountComp.state, currentUser: app.state.currentUser.userName}),
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
                logout(app); // log the user out of the app once the username has been updated successfully
                return res.json();
            }
        })
        // .then(json => {
            
        // })
        .catch(error => {
            console.log(error);
        });
    //should make fetch request to backend to update username
}



export const updatePassword = (accountComp, app) => {
    // log(accountComp); // holds account state
    // log(app); // holds app state

    // create patch request
    const request = new Request("/api/users/password", {
        method: "PATCH",
        body: JSON.stringify({state: accountComp.state, currentUser: app.state.currentUser.userName}),
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
                logout(app); // log the user out of the app once the username has been updated successfully
                return res.json();
            }
        })
        .catch(error => {
            console.log(error);
        });
}


export const deleteUser = (app) => {

// log(accountComp); // holds account state
    // log(app); // holds app state

    const request = new Request("/api/users/delete", {
        method: "DELETE",
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
                console.log("account deleted successfully") // report successful username change
                log("logging out...")
                logout(app); // log the user out of the app once the username has been updated successfully
                return res.json();
            }
        })
        // .then(json => {
            
        // })
        .catch(error => {
            console.log(error);
        });
    //should make fetch request to backend to delete the user
}