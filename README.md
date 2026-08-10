Blorunner

Blorunner is an abstract multiplayer social Capture-the-Flag (CTF) style game that uses Facebook Login for authentication. Players form teams (Attackers vs Defenders) and compete in infiltration / exfiltration rounds set in suburban or urban environments. The game features automatic handicaps for uneven teams, RPG-style character stats, fictional poster targets, and an in-game Credit economy.

This is a fictional / abstract game. All CTF targets are generated characters. No real Facebook users or real posts are ever targeted or scraped.

Features

- Facebook Login authentication
- Persistent player profiles with Credits and RPG stats (Stealth, Tactics, Resolve, Detection)
- Match creation and lobby system
- Automatic team handicap calculation based on player count
- Support for Suburban / Urban modes
- Known / Unknown layout options
- Light / Standard / Intensive search requirements
- Clean dark-themed UI
- Ready for expansion (poster generator, statistical prediction, real-time updates, etc.)

Tech Stack

- Backend: Node.js + Express
- Authentication: Passport.js + passport-facebook
- Database: MongoDB + Mongoose
- Frontend: Vanilla HTML, CSS, and JavaScript
- Session Management: express-session

Project Structure

blorunner/
├── config/
│   └── passport.js
├── models/
│   ├── User.js
│   └── Match.js
├── routes/
│   ├── auth.js
│   └── game.js
├── public/
│   ├── index.html
│   ├── dashboard.html
│   ├── style.css
│   ├── app.js
│   └── dashboard.js
├── .env.example
├── .gitignore
├── package.json
├── README.md
└── server.js

Getting Started

Prerequisites

- Node.js 18 or higher
- MongoDB (local installation or MongoDB Atlas)
- A Facebook Developer account

Installation

git clone <your-repo-url> blorunner
cd blorunner
npm install

Environment Variables

Copy the example environment file:

cp .env.example .env

Edit the .env file with your values:

FACEBOOK_APP_ID=your_facebook_app_id
FACEBOOK_APP_SECRET=your_facebook_app_secret
SESSION_SECRET=a_long_random_string
MONGODB_URI=mongodb://127.0.0.1:27017/blorunner
CALLBACK_URL=http://localhost:3000/auth/facebook/callback
PORT=3000

Create a Facebook App

1. Go to https://developers.facebook.com/
2. Click Create App
3. Choose Consumer or Gaming
4. Name the app Blorunner
5. Add the Facebook Login product
6. Under Facebook Login → Settings, add this Valid OAuth Redirect URI:
   http://localhost:3000/auth/facebook/callback
7. Copy the App ID and App Secret into your .env file

Run the Application

Development mode (with auto-reload):

npm run dev

Production mode:

npm start

Open your browser and go to:
http://localhost:3000

How to Play (Current Version)

1. Click Login with Facebook
2. You will be redirected to the Lobby / Dashboard
3. Create a new match or join an existing one
4. Choose a side (Attackers or Defenders)
5. When both sides have at least one player, start the match
6. The system automatically applies a handicap if the teams are uneven

Available Scripts

Command         Description
npm start       Start the server
npm run dev     Start with nodemon (auto-reload)

Roadmap

- Fictional poster (CTF target) generator
- Statistical success prediction based on RPG stats
- Real-time match updates using Socket.io
- Credit betting and winner-takes-all pots
- Player progression and temporary stat upgrades
- Support for multiple concurrent matches
- Improved lobby UI with live player lists

Important Notes

- This project is intended for educational and entertainment purposes only.
- Always comply with Meta’s Platform Terms and Community Standards.
- Request and store only the minimum Facebook data necessary.
- All game targets must remain completely fictional.

License

MIT
```​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​
