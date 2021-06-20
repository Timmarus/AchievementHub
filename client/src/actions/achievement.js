const log = console.log()

// get all achievements from all of user's groups
export const getAllAchievements = (userName, app) => {
    // Create our request constructor with all the parameters we need
    // const request = new Request("/api/achievements/" + userName, {
    //     method: "GET",
    //     headers: {
    //         Accept: "application/json, text/plain, */*",
    //         "Content-Type": "application/json"
    //     }
    // });
    const url = "/api/achievements/" + userName

    // Send the request with fetch()
    fetch(url)
        .then(res => {
            if (res.status === 200) {
                console.log("Achievements retrieved successfully.")
                return res.json();
            }
        }).then(json => {
            console.log(json);
            if (json.currentUser !== undefined) {
                app.setState({ allAchievements: json.achievementArray});
            }
            log(app.state)
            
        }).catch(error => {
            console.log(error);
        });
}

export const postAchievement = (achievementComp, userName, app) => {

    // Create our request constructor with all the parameters we need
    const request = new Request("/api/achievements/" + userName, {
        method: "post",
        body: JSON.stringify({...achievementComp.state, date: new Date()}),
        headers: {
            Accept: "application/json, text/plain, */*",
            "Content-Type": "application/json"
        }
    });

    // Send the request with fetch()
    fetch(request)
        .then(res => {
            if (res.status === 200) {
                console.log("achievement posted!")
                return res.json();
            }
        })
        .then(json => {
            
            if (json.user !== undefined) {
                app.setState({ currentUser: json.user });
            }
            
        })
        .catch(error => {
            console.log(error);
        });
}