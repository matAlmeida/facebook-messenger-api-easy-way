# Facebook Messenger API Boilerplate

## Setting Up
First you will need to install [Node.js](https://nodejs.org/en/), any version above the v6.x. I suggest you to search how to install Node with NVM (Node Version Manager), it's a more safe way to install (i don't know if this has a Windows version). And make sure [NPM](https://www.npmjs.com/package/npm) (Node Package Manager) is installed too.

## Creating the App
First you will need to create a page in Facebook. After you had created the page you will need to create a new facebook app. Enter in the [Facebook Developers](https://developers.facebook.com/apps/) and create a new app.

Click in Add Product:

![Add Product Image](https://i.imgur.com/esp5Hrq.png)

Add the Messenger and select to use the *'pages_messaging'* api. Go to the Messenger Products Configuration and go to *'Token Generation'*, select the page you created before, copy the token ![token generation](https://i.imgur.com/3RZPMR9.png) and paste in the *'constants.js'* file:

![constants file](https://i.imgur.com/YmHe23v.png)

***

Here you will need to run the server in any place with a SSL DNS. I RECOMMEND YOU TO USE [HEROKU](https://devcenter.heroku.com/articles/getting-started-with-nodejs), IT IS FREE AND EASY TO USE.

***

Create a webhook with the *'messages'* service selected and paste the protected url of the server where you a running the bot, *'https://<URL>/webhook'*, and the random **verify token** that you set in the *'app.js'* file:

![app file](https://i.imgur.com/6JKWfdh.png)

Then you will need to add the webhook to some page that you are owner.

## NOW YOUR BOT SHOULD BE WORKING ON THE PAGE YOU SELECTED
