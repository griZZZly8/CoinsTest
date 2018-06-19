# Test Wallet application

# Installation

`npm install`

Ember dev server and BitgoExpress should run automatically.

Run `npm run start` to start both servers manually.

Open [http://localhost:4200](http://localhost:4200) to view the application.

# Comments from my side

It was very exciting struggle with bitgo and node-gyp to make it work on Windows. Also, BitgoExpress doesn't support CORS, so I forked the repository and added support for CORS. You can see in the package.json that reference to bitgo is a reference to my fork.