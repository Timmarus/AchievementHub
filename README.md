# team 30 - AchievementHub

Albert Zheng - [albertzed2000](http://github.com/albertzed2000) - zhengalb - albert.zheng@mail.utoronto.ca

Elexandra Tran - [alexandra-tran](http://github.com/alexandra-tran) - tranelex - elexandra.tran@utoronto.ca

Ensar (Timm) Ilyas - [Timmarus](http://github.com/Timmarus) - ilyasens - ensar.ilyas@mail.utoronto.ca

Alexander Xu Chen - [AlexXuChen](http://github.com/AlexXuChen)  - chenal14 - alexxu.chen@mail.utoronto.ca

## How to run

### local

After cloning this repo, run:
```
yarn install
```
or 
```
npm install
```

to download dependencies, on client side. Then do

```
cd client
npm install
```

Then, in the root directory, type
```
sh start.sh
```
to run and open on http://localhost:5000.

If you user '''npm start''' in client, then:
Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

### Production/deployed app
Visit https://quiet-meadow-93883.herokuapp.com/

#### Test Logins
On the application, it directly connects to the production database on either local or prod
If you would like to sign up, you can do so on the inital login page.
*To display all achievement data on landing page, refresh is required after login*

##### Test User Credentials
username: user
password: user
You should see a landing page of achievements upon refresh after login

##### Test Admin Credentials
username: admin
password: admin
You should see a form for changing parts of user and group data

# Phase 2 - December 11th

## New Features

### Admin
Ability to login as an admin (username: admin, password: admin), which is a special type of user with access to a completely different dashboard. On this dashboard,
an admin can:
- designate another user as admin
- delete a user
- create a new user
- change a user's username

### User
 
#### Create Account
- Users can create a new account from the login view by entering their new account credentials and clicking signup.

#### New Achievement
- Users can go to the new achievement view by clicking the + sign on the top right near their avatar.
On the new achievement view, users enter the achievement details and click post. This makes the achievement
visible to other group members.

#### User Dropdown Menu Items
Once logged in, users have access to a dropdown menu on the top right of the page. This dropdown leads to views, including:

##### Account Security
- On this page, users can change their username, password, and delete their account by entering the corresponding
forms and clicking confirm.

##### Edit profile
- Users can add their steam/discord usernames, and edit their display name, and email.

##### Manage groups
- Users can create groups, designating them as the group leader.
- Group leaders can delete a group, removing it from existence from everyone who was part of the group
by clicking delete group
- Leaders can manage members by clicking manage members

##### Manage members
- Users can leave the group by clicking the corresponding leave button if they are non-leaders
- Leaders can add members to the group

## Express Server
For the backend, we created an express server, as seen in server.js in root, that has the following routes:
*Note, many routes that use app state must be tested using the entire app*
*Note, <user> represents the schema available on the db side (./models/user.js)*

### Session Handling

POST: {base_url}/users/login
- Allows a user to login and create a session for them
- Expected body
```
{
loginUserName : <loginUserName>,
loginPassword : <loginPassword>
}
```
- Expected success response
```
{ 
currentUser: <user>, 
userProfile: <user.profile>
}
```

GET: {base_url}/users/logout
- Allows a user to logout by destroying their current session
- Expected success response
```
Logged out
```

GET: {base_url}/users/check-session
- Checks to see if a user is logged in on the session
- Expected success response
```
{ 
currentUser: user 
}
```

### User Account Endpoints

POST: {base_url}/api/users
- Creates a user
- Expected body
```
{
registerRealName: <registerRealName>,
registerEmail: <registerEmail>
}
```
- Expected success response
```
{
userName: req.body.registerUserName,
password: req.body.registerPassword,
isAdmin: false,
profile: {
   realName: <registerRealName>,
   email: <registerEmail>,
   joined: Date.now(),
   achievements: [],
   groups: [],
   linkedAccounts: [],
   pic: Math.floor((Math.random() * 4) + 1)
}
}
```

GET: {base_url}/api/users
- Get a user
- Expected success response
```
{
userData: <user>
}
```

PATCH: {base_url}/api/users/username
- Change a user's username
- Expected body
  - expecting the app state
- Expected success response
```
Username Changed
```

PATCH: {base_url}/api/users/password
- Change a user's password
- Expected body
  - expecting the app state
- Expected success response
```
password changed
```

DELETE: {base_url}/api/users/delete
- Delete a user
- Expected body
  - expecting the app state
- Expected success response
```
Account deleted successfully
```

PATCH: {base_url}/api/users/admin
- Make a user an admin
- Expected body
```
{
username: <username>
}
```
- Expected success response
```
User changed to admin.
```


### User Profile Endpoints
PATCH: {base_url}/api/users/updateProfile
- Updates a user's profile information
- Expected body
```
{
newRealName: <newRealName>,
newUsername: <newUsername>,
newEmail: <newEmail>,
currentUser: <currentUser>
}
```
*Note: currentUser comes from app state*
- Expected success response
```
{
newUserData: <user>
}
```

PATCH: {base_url}/api/users/linkedAccounts
- Updates a user's linked accounts
- Expected body
```
{
accountType: <accountType>,
accountUsername: <accountUsername>
}
```
- Expected success response
```
{
newUserData: <user>
}
```

DELETE: {base_url}/api/users/linkedAccounts
- Deletes a user's linked account
- Expected body
```
{
linkedAccountId: <linkedAccountId>,
userId: <userId>
}
```
- Expected success response
```
{
newUserData: <user>
}
```

PATCH: {base_url}/api/users/profilePic
- Changes the user's current profile picture
- Expected body
```
{
userName: <userName>,
picNum: <picNum>
}
```
- Expected success response
```
{
currentUser: <user>
}
```

### Group Endpoints
POST: {base_url}/api/groups
- Creates a new group and adds the achievements of the group owner to the group
- Expected body
```
{
    groupName : <groupName>,
    owner : <username>,
}
```
- Expected success response
```
{ 
    currentUser: <user>
}
```

DELETE: {base_url}/api/groups
- Delete a group
- Expected body
```
{
    groupName: <groupName>,
    userName: <userName>
}
```
- Expected success response
```
{
    groupName: <groupName>,
    userName: <userName>
}
```

GET: {base_url}/api/groups
- Get all members for a given group
- Expected success response
```
[<group_members>]
```

POST: {base_url}/api/groups/:groupName/invite/:userName
- Add a member with :userName to a group with :groupName. This gets called when a group leader adds a user to their group.
- Expected body
```
{
groupName: <groupName>,
userName: <userName>,
currentUser: <currentUser>
}
```
- Expected success response
```
{ 
    currentUser: <user>
}
```

DELETE: {base_url}/api/groups/:groupName/leave/:userName
- Remove a member with :userName from a group with :groupName. This gets called when a user LEAVES a group
- Expected body
```
{
    groupName: <groupName>,
    userName: <userName>,
    currentUser: <currentUser>
}
```
- Expected success response
```
{ 
    currentUser: <user>
}
```

### Achievement Endpoints
POST: {base_url}/api/achievements/:username
- Adds an achievement for a given user
- Expected body
```
{
    name: <name>,
    game: <game>,
    date: <date>
}
```
- Expected success response
```
{
<user>
}
```
  
GET: {base_url}/api/achievements/:username
- Gets all the achievements from all user's group
- Expected success response
```
{
achievementArray: achievementArray
}
```


*Note:* Below is the README from Phase 1, which still applies in the client directory, and an updated 'External Packages/Libraries Used' list


## Phase 1 - November 9th

### Features and User Interaction
*Note:* The app in it's current state (Phase 1), uses the mocked user object, ```./src/mockData/mockUser```, and is imported through the app entry point in ```App.js``` to simulate a fetch call that will be implemented in Phase 2 when dealing with backend.

A regular user has the following interactions and features available:
- Navigate the site through a custom made top/app bar.
- Post about an achievement they made. This post data is stored in our database. (```{url}/NewAchievement```)
- Join a group if they’re not part of one currently. This will be recorded in their user profile. (```{url}/Achievement```)
- View all achievements they have recorded. This will be recorded in their user profile. ((```{url}/AllAchievements```))
- Leave a group if they’re part of one currently. (```{url}/ManageGroup```)
- Create group + invite players to a group if they’re not part of one currently. (```{url}/ManageGroup```)
- View profiles, which will come from data in our database. (```{url}/Profile```)
- View other’s and their own posts (```{url}/Achievement``` is an example of this view and ```{url}/``` views all posts).

An admin user is defined by being the owner of a group, which allows them to manage the members and delete the group altogether (```{url}/ManageGroup```)


### External Packages/Libraries Used

Packages and package versions are listed under 'dependencies' in package.json
- @material-ui/core
- @material-ui/icons
- react
- react-dom
- react-router-dom
- bcryptjs
- body-parser
- express
- expres-sesion
- mongodb
- mongoose
- path
- validate
- validator
