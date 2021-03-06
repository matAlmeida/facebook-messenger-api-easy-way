const express = require("express");
const request = require("request");
const bodyParser = require("body-parser");

const config = require("./config");
const privacyPolicy = require("./template/privacyPolicy");
const termsOfService = require("./template/termsOfService");

const app = express();
app.use(bodyParser.json());

app.get("/", (req, res) => res.send("hello world!"));

app.get("/privacyPolicy", (req, res) => {
  res.set("Content-Type", "text/html");
  res.send(privacyPolicy(config.APP_NAME, config.APP_SITE));
});

app.get("/tos", (req, res) => {
  res.set("Content-Type", "text/html");
  res.send(termsOfService(config.APP_NAME, config.APP_SITE));
});

const sendText = (sender, text) => {
  request(
    {
      url: "https://graph.facebook.com/v3.3/me/messages",
      qs: { access_token: config.PAGE_ACCESS_TOKEN },
      method: "POST",
      json: {
        recipient: { id: sender },
        message: {
          text: text
        }
      }
    },
    (error, response, body) => {
      if (error) {
        console.log("Error sending message: ", error);
      } else if (response.body.error) {
        console.log("Error: ", response.body.error);
      }
    }
  );
};

const sendAttachment = (sender, attachmentUrl, attachmentType) => {
  // type can be: image, video, audio or file

  request(
    {
      url: "https://graph.facebook.com/v3.3/me/messages",
      qs: { access_token: config.PAGE_ACCESS_TOKEN },
      method: "POST",
      json: {
        recipient: {
          id: sender
        },
        message: {
          attachment: {
            type: attachmentType,
            payload: {
              url: attachmentUrl,
              is_reusable: true
            }
          }
        }
      }
    },
    (error, response, body) => {
      if (error) {
        console.log("Error sending message: ", error);
      } else if (response.body.error) {
        console.log("Error: ", response.body.error);
      }
    }
  );
};

// Adds support for GET requests to our webhook
app.get("/webhook", (req, res) => {
  // Parse the query params
  const mode = req.query["hub.mode"];
  const token = req.query["hub.verify_token"];
  const challenge = req.query["hub.challenge"];

  // Checks if a token and mode is in the query string of the request
  if (mode && token) {
    // Checks the mode and token sent is correct
    if (mode === "subscribe" && token === config.VERIFY_TOKEN) {
      // Responds with the challenge token from the request
      console.log("WEBHOOK_VERIFIED");
      res.status(200).send(challenge);
    } else {
      // Responds with '403 Forbidden' if verify tokens do not match
      res.sendStatus(403);
    }
  }
});

// Creates the endpoint for our webhook
app.post("/webhook", (req, res) => {
  const body = req.body;

  // Checks this is an event from a page subscription
  if (body.object === "page") {
    // Iterates over each entry - there may be multiple if batched
    body.entry.forEach(function(entry) {
      // Gets the message. entry.messaging is an array, but
      // will only ever contain one message, so we get index 0
      const webhookEvent = entry.messaging[0];

      const senderID = webhookEvent.sender.id;
      const messageText = webhookEvent.message.text;

      // Here goes your call back, you can make some function that process
      // the text before you send a response to the user. I just sent the
      // same text back to the user.
      sendText(senderID, messageText);
    });

    // Returns a '200 OK' response to all requests
    res.status(200).send("EVENT_RECEIVED");
  } else {
    // Returns a '404 Not Found' if event is not from a page subscription
    res.sendStatus(404);
  }
});

// The 'process.env.PORT' is necessary if you want to use some services as Heroku
const port = config.PORT || 3000;
app.listen(port, () => console.log(`Messeger Bot running on port ${port}!`));
