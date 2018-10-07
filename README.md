# Value App

## Description

Have you ever wanted to know how much value you're getting out of the things you buy? With this app you can track the [per-use cost](http://www.thefrugalgirl.com/2016/08/why-you-should-think-about-cost-per-use/) of your purchases over time. Set the initial purchase price when you buy the item, then note every time you use the item. The app will keep track of the per-use cost so you can make sure you're getting good use of your spending money.

You can visit the live app [HERE](https://valuemax.herokuapp.com).

>Note it may take ~30 seconds to load the first time as it's on Heroku's free hosting platform.


## Built With

* [Node.js](https://nodejs.org/en/)
* [Express](https://expressjs.com/)
* [MongoDB](https://www.mongodb.com/) & [Mongoose](https://mongoosejs.com/)
* [MomentJS](https://momentjs.com/)
* [Semantic UI](https://semantic-ui.com/)

## Usage

### Prerequisites
You'll need the following installed on your local machine to begin:

* Node.js & npm
* Mongo DB
* git

### Installation

* Clone or download the repo, `cd` into project directory
* In the root project directory, run `npm install`
* While in the root directory, create a new file `.env`
* Copy the contents from `.env.default` into this new file, and add the relevant values:
    * PORT=an open port on your machine, i.e. 3000, 8080, etc.
    * NODE_ENV=development
    * MONGODB_URI=mongodb://localhost/value-app or your local equivalent
    * SESSION_SECRET=any_str1ng_y0u_lik3
* In a command line shell, run the `mongod` process
* In a new command line shell or tab, run `mongo`
* In a 3rd command line shell, run `node app.js`. It will tell you what port to visit the app on; open a browser and copy/paste the provided `localhost` address

#### NOTE

> If you want to run the app completely offline, you will need to add some local javascript and css files to the project on your local machine. Check the current [.gitignore](https://github.com/niamurrell/value-app/blob/master/.gitignore) for a list of these files, listed under *Libraries*, and download them to your machine. Then unhide the local links to these files in `views/partials/header.ejs` and `views/partials/footer.ejs`.


## Contributing

In the spirit of [Hacktoberfest](hacktoberfest) and with inspiration from [Shannon Crabill's Halloween project](https://github.com/scrabill/how-many-days-until-halloween), I've opened this project with the purpose of giving developers a place to practice coding and working with Git / Github.

If you'd like to contribute, take a look at the [contributor guidelines](https://github.com/niamurrell/value-app/blob/master/.github/CONTRIBUTING.md) to get started. I ask that participants adhere to the [code of conduct](https://github.com/niamurrell/value-app/blob/master/CODE_OF_CONDUCT.md) to keep this a productive learning environment for everyone (myself included).


## Authors & Contributors

* [Nia Murrell](https://github.com/niamurrell)


## License

MIT ([view](https://github.com/niamurrell/value-app/blob/master/LICENSE.md))
