# AimLabBasic

Henry Bao, Lesi Li, Russell Sean Eng, Christopher Ku

## Project Description

Our application AimLabsBasic targets a wide range of audiences including gamers who want to try and learn how to play shooting games, people who want to release their stress by playing a simple game, and other users that simply want to improve their mouse agility and accuracy.

The project is a similar and simpler version of Aim Labs that runs on a web browser instead of a stand-alone application that has to be installed onto the user’s computer, therefore extending the accessibility of the game. The application allows users to check their mouse accuracy and compare it to their past performance to know whether they have improved or not. The reason for users to choose this application is that our application is simple to use, not competitive, and will not create a stressful atmosphere. So users can practice and find familiarity through our application.

As developers, we know the importance of aiming skills in shooter games and understand that there is a market for an aim training game. Our team has a passion for gaming and software development, and we believe our game will benefit a variety of users. We want to provide gamers with an easy and effective way to improve their skills in aiming and have a platform to store their progress along the way.
<hr/>

## Technology Description
Link to architectural diagram mapping and design: https://www.figma.com/file/mh7RuMGjAAf3ShLi5Q24BT/Info-441-Final-Project?node-id=0%3A1&t=0HA6wX39E79dJt6i-0

![Data Flow](imgs/data-flow.png)

| Priority      | User  | Description | Technical Description |
| ----------- | ----------- |----------- |--------------  |
| P0      | As a pro gamer       | I want to practice my mouse agility and accuracy      | Display targets on the website on the client side, and record the user’s accuracy throughout the game using MongoDB       |
| P0   | As a first-time shooting games player        | I want to learn what the shooting games will look like. |   |
| P0   | As a game player        | I want to play a game to distress|    |


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

## Endpoints


* USE “/user” - Navigate to user route
* USE “/scoreboard” - Navigate to scoreboard route
* USE “/game” - Navigate to game route
* USE(req, res, next) - Connect database
* POST “/game/game-result” - Send the final result of a player to the database
* GET “/scoreboard/score” - Request all player scores from the database and send back to front-end
* GET “/user/login” - For user to login (Azure Authentication)
* GET “/” - Session
<hr/>

## Appendix

Database Schema: <br>
	{ <br>
    “UserName”: String, <br>
    “Email”: String, <br>
    “Score”: Integer, <br>
    “Accuracy”: Float <br>
    “Date”: Date <br>
}

Link to architectural diagram mapping and design: https://www.figma.com/file/mh7RuMGjAAf3ShLi5Q24BT/Info-441-Final-Project?node-id=0%3A1&t=0HA6wX39E79dJt6i-0
