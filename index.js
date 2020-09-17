// include and initialize the rollbar library with your access token
var Rollbar = require("rollbar");
var rollbar = new Rollbar({
  accessToken: '************************',
  captureUncaught: true,
  captureUnhandledRejections: true
});

// Caught errors
try {
  getOrders();
} catch (e) {
  // console.log("Something went wrong", e);
  rollbar.error("Something went wrong", e); //replace your console.logs
}

//Set the person data to be sent with all errors for this notifier.
rollbar.configure({
  payload: {
    person: {
      id: 456,
      username: "foo",
      email: "foo@example.com"
    }
  }
});

// Unset the person data to be sent with all errors for this notifier.
rollbar.configure({
  payload: {
    person: {
      id: null
    }
  }
});

// Arbitrary log messages. 'critical' is most severe; 'debug' is least.
rollbar.critical("Connection error from remote Payments API");
rollbar.error("Some unexpected condition");
rollbar.warning("Connection error from Twitter API");
rollbar.info("User opened the purchase dialog");
rollbar.debug("Purchase dialog finished rendering");

// Can include custom data with any of the above.
// It will appear as `message.extra.postId` in the Occurrences tab
rollbar.info("Post published", { postId: 123 });

// Callback functions
rollbar.error(e, function (err, data) {
  if (err) {
    console.log("Error while reporting error to Rollbar: ", e);
  } else {
    console.log("Error successfully reported to Rollbar. UUID:", data.result.uuid);
  }
});
