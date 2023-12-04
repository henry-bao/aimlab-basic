# AimLabBasic

Henry Bao, Lesi Li, Russell Sean Eng, Christopher Ku

## Project Description

Our application AimLabsBasic targets a wide range of audiences including gamers who want to try and learn how to play shooting games, people who want to release their stress by playing a simple game, and other users that simply want to improve their mouse agility and accuracy.

The project is a similar and simpler version of Aim Labs that runs on a web browser instead of a stand-alone application that has to be installed onto the user’s computer, therefore extending the accessibility of the game. The application allows users to check their mouse accuracy and compare it to their past performance to know whether they have improved or not. The reason for users to choose this application is that our application is simple to use, not competitive, and will not create a stressful atmosphere. So users can practice and find familiarity through our application.

As developers, we know the importance of aiming skills in shooter games and understand that there is a market for an aim training game. Our team has a passion for gaming and software development, and we believe our game will benefit a variety of users. We want to provide gamers with an easy and effective way to improve their skills in aiming and have a platform to store their progress along the way.
<hr/>

## Technology Description
Link to architectural diagram mapping and design: https://www.figma.com/file/mh7RuMGjAAf3ShLi5Q24BT/Info-441-Final-Project?node-id=0%3A1&t=0HA6wX39E79dJt6i-0

![Data Flow](public/images/data-flow.png)

| Priority      | User  | Description | Technical Description |
| ----------- | ----------- |----------- |--------------  |
| P0      | As a First Person Shooting game player     | I want to practice my mouse agility and accuracy      | Display targets on the website on the client side, and record the user’s accuracy throughout the game using MongoDB       |
| P0 | As a game player | I want to check my scores and accuracy once I finish the game | Keep track of the amount of clicks throughout the game and calculate the score and accuracy at the end of the game |
| P0 | As a game player | I want to store my scores when each time I play the game | Save the final result of each game into MongoDB by user’s id once the game is finished |
| P1 | As a game player | I want to see how much time is left when I am playing the game. | Display a timer countdown on screen whenever a game starts, stops and record results into MongoDB when the timer runs out |
| P2 | As a game player | I want to receive a notification if my latest time has a better score than the last time | Compare the each game’s result with mongodb when user achieved a new high score, send a notification to the client |
| P2 | As a game player | I want to view other users’ scores who also playing the game | Query all users in MongoDB and return them to a leaderboard |
| P3 | As a game player | I want to log in and log out to this application | The user would enter their credentials (username and password) into the login form. The application will then query MongoDB to see if a document exists with those credentials. The user is granted access to the application if a match is found. When the user wants to log out, the application removes the active session or token associated with that user, effectively ending their session and logging them out. |
| P3 | As a game player | I want to create and review my profile. | Session will record the user’s information once the user creates a new account in the application. The mangoDB will update if the user changes their information. |
| P3 | As a user | I want the application can remember my login information so that I don't need to enter my user id and password again | Session will record the user’s information |
| P4 | As a recureiter form esport | I want to see which player has the potential to become a professional gamer by checking the scoreboard | Database send all player stats to the server. The server re-orders players based on score and accuracy. Send to front-end. |


<hr/>

## Functions
1. Login
2. Logout
3. Profile
4. Check scores
5. View other users' scores
6. Check accuracy
7. Time limitation (30s-60s)
8. Store score and accuracy
9. Session
10. Pause & continue (client side)
11. Stop & Quit (client side)
12. Break performance history
<hr/>

## Endpoints Documentation
### Overview
This documentation details the routes used in the Node.js Express application, including the primary application setup in `app.js` and route handlers in `./routes/index.js`, `./routes/controllers/users.js`, and `./routes/controllers/game.js`.
#### app.js
This is the main application file where middleware and routes are set up.

- **Middleware Configuration**
  - `logger('dev')`: Provides logging capabilities.
  - `express.json()`: Parses incoming requests with JSON payloads.
  - `express.urlencoded({ extended: false })`: Parses incoming requests with URL-encoded payloads.
  - `cookieParser()`: Parses cookies attached to the client request object.
  - `express.static(...)`: Serves static files located in the `public` directory.
  - Custom middleware to attach `models` to `req`.

- **Session Configuration**
  - Uses `express-session` for managing session state.

- **Authentication Configuration**
  - Integrates with Microsoft Identity platform.

- **Routes**
  - GET `/login`: Initiates the login process.
  - GET `/logout`: Logs out the user.
  - GET `/error`: Displays a server error message.
  - GET `/unauthorized`: Displays an unauthorized access message.
  - `/api`: All API routes are handled by `apiRouter`.
 
#### `./routes/index.js`
This file sets up API routes.

- **API Routes**
  - `/game`: Routes related to game functionalities.
  - `/user`: Routes for user-related functionalities.

#### `./routes/controllers/users.js`
This file contains routes for user operations.

- **User Routes**
  - GET `/get-identity`: Fetches the identity of the logged-in user.
  - GET `/leaderboard`: Retrieves the leaderboard based on certain criteria (accuracy, number of games).
  - GET `/get-history`: Fetches the game history of a specific user.
  - GET `/load-user-info`: Loads user information based on the username.

#### `./routes/controllers/game.js`
This file manages routes related to game functionalities.

- **Game Routes**
  - POST `/result`: Submits and records game results.

### Notes
- Authentication and session handling are integrated across routes.
- Error handling is included in asynchronous routes.
<hr/>

## Database Schemas
### Overview
This documentation describes the Mongoose schemas used in the Node.js application for modeling data in MongoDB. The schemas are defined for `Game` and `Player`.

#### Game Schema
The `Game` schema represents individual game data.

- **Schema Name**: `gameSchema`
- **Collection**: Automatically determined by Mongoose (typically 'games')
- **Fields**:
  - `round`: (Type: Number) Represents the round number of the game.
  - `hit`: (Type: Number) The number of hits in the game.
  - `seconds`: (Type: Number) Duration of the game in seconds.
  - `accuracy`: (Type: Number) Accuracy rate in the game.
  - `game_date`: (Type: Date) The date when the game was played.

#### Player Schema
The `Player` schema represents users of the application with their associated games.

- **Schema Name**: `playerSchema`
- **Collection**: Automatically determined by Mongoose (typically 'players')
- **Fields**:
  - `username`: (Type: String) Unique identifier for the player.
  - `user`: (Type: String) The name or other identifier of the user.
  - `games`: (Type: Array of `gameSchema`) A list of games played by the player.

#### Models
- **Player Model**: This is created from the `playerSchema` and is used to interact with the 'players' collection in the database.

### Notes
- Mongoose automatically manages the creation of collections based on these schemas.
- The `models` object exported contains the `Player` model, which can be used throughout the application for database operations related to players and their games.

### Example Usage
To create a new player and save it to the database:
```js
const newPlayer = new models.Player({
    username: 'player123',
    user: 'John Doe',
    games: [...]
});
newPlayer.save();
```

Link to architectural diagram mapping and design: https://www.figma.com/file/mh7RuMGjAAf3ShLi5Q24BT/Info-441-Final-Project?node-id=0%3A1&t=0HA6wX39E79dJt6i-0
