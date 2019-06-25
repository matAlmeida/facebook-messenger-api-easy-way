# Facebook Messenger API Boilerplate

## Setting Up

First you will need to install [Node.js](https://nodejs.org/en/), any version above the v6.x. I suggest you to search how to install Node with NVM (Node Version Manager), it's a more safe way to install (i don't know if this has a Windows version). And make sure [NPM](https://www.npmjs.com/package/npm) (Node Package Manager) is installed too.

## Creating the App

First you will need to create a page in Facebook. After you had created the page you will need to create a new facebook app. Enter in the [Facebook Developers](https://developers.facebook.com/apps/) and create a new app.

Click in Add Product:

![Add Product Image](https://i.imgur.com/786Ham8.png)

Add the Messenger and select to use the _'pages_messaging'_ api. Go to the Messenger Products Configuration and go to _'Token Generation'_, select the page you created before, copy the token ![token generation](https://i.imgur.com/3RZPMR9.png) and paste in the _'.env'_ file:

![constants file](https://i.imgur.com/bIkmX46.png)

### Note: You must rename the _'.env.example'_ to _'.env'_

---

Here you will need to run the server in any place with a SSL DNS. I RECOMMEND YOU TO USE [HEROKU](https://devcenter.heroku.com/articles/getting-started-with-nodejs), IT IS FREE AND EASY TO USE.

---

Create a webhook with the _'messages'_ service selected and paste the protected url of the server where you a running the bot, _'https://<URL>/webhook'_, and the random **verify token** that you also must set in the _'.env'_ file.

Then you will need to add the webhook to some page that you are owner.

## NOW YOUR BOT SHOULD BE WORKING ON THE PAGE YOU SELECTED
