# Katie's NC News

NC News is a webapp that serves user submitted articles on a range of topics. This app makes API calls to the back-end NC News. Logged in users can do the following within the app:

- Read articles on different topics
- Create new articles and topics
- Post comments on articles
- Vote on both articles and topics

### Front-end App

Github repo: https://github.com/Rusty414/katies-nc-news

Deployed project: https://katies-nc-news.netlify.com/

### Back-end API

Github repo: (need to duplicate)

Deployed project: https://katies-nc-news.herokuapp.com/api

## Getting started

To run this app locally, please do the following:

### 1. Fork & Clone the repo

### 2. Install dependencies

Once you have forked and cloned the repo, navigate to the root folder of the project in the command line and run the following command:

    npm init

This will install the following dependencies listed in the package.json:

    "dependencies": {
        "@fortawesome/fontawesome-svg-core": "^1.2.15",
        "@fortawesome/free-solid-svg-icons": "^5.7.2",
        "@fortawesome/react-fontawesome": "^0.1.4",
        "@reach/router": "^1.2.1",
        "axios": "^0.18.0",
        "fontawesome": "^5.6.3",
        "moment": "^2.24.0",
        "prop-types": "^15.7.2",
        "react": "^16.8.2",
        "react-dom": "^16.8.2",
        "react-fontawesome": "^1.6.1",
        "react-scripts": "2.1.5"
      }

These are the minimum versions required.

### 3. Start the app

Once all the dependencies have been installed, start the app with the following command:

    npm start

This should automatically open a window in your browser. If it does not, navigate to localhost:3000 in the browser.

### 4. Log in

The app will require you to log in with a username in order to begin reading articles and comments. Below is a list of valid usernames:

- **tickle122**
- **grumpy19**
- **happyamy2016**
- **cooljmessy**
- **weegembump**
- **jessjelly**

## Deployment

This version of the site is hosted live on Netlify. To host your own version on netlify, you can follow these steps:

1. Install the Netlify CLI by running `sudo npm i -g netlify`
2. Make sure you're in the local project folder
3. Run `netlify login` in your terminal to sign in to your Netlify account or create a new account at https://app.netlify.com/signup.
4. Run `netlify deploy` and follow the instructions in the CLI to host the site.

## Built with

- [Create React App](https://github.com/facebook/create-react-app) - used to bootstrap the app and streamline the creation process.
- [Axios](https://www.npmjs.com/package/axios) - used to send requests to the backend API
- [Reach/Router](https://github.com/reach/router) - used for routing the site
- [PropTypes](https://www.npmjs.com/package/prop-types) - used for type checking
- [GitHub](https://github.com/) - used for version control

## Author

Katie Robinson - [Rusty414](https://github.com/Rusty414)

## Acknowledgements

Thanks to all the tutors at Northcoders
