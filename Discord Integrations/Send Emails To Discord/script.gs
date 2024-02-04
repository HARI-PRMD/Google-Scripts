function checkEmailsAndPostToDiscord() {
  var threads = GmailApp.search('-label:"read bot only"');
  var label = GmailApp.createLabel("read bot only");

  for (var i = 0; i < threads.length; i++) {
    var thread = threads[i];
    var messages = thread.getMessages();

    // Check if there are more than one message in the thread
    if (messages.length > 1) {
      // Get the latest message in the thread
      var message = messages[messages.length - 1];
    } else {
      // If there's only one message in the thread, use that
      var message = messages[0];
    }

    var sender = message.getFrom();
    var subject = message.getSubject();
    var body = message.getPlainBody();

    // Remove quoted text from the email body
    body = removeQuotedText(body);

    var snippet = body.substring(0, 500) + "..."; // Get the first 500 characters of the email

    // Add a label to the message to mark as "read by bot"
    thread.addLabel(label);

    // Post to Discord webhook
    postToDiscord(sender, subject, snippet);
  }
}

// Function to remove quoted text from the email body
function removeQuotedText(body) {
  // Replace quoted text patterns with an empty string
  body = body.replace(/>[\s\S]*?(\r\n|\n|$)/g, "");
  body = body.replace(/On\s.+\swrote:/g, "");
  return body;
}

function postToDiscord(sender, subject, content) {
  var discordWebhookUrl = "YOUR_WEBHOOK_URL";
  var payload = {
    username: "Email Notifier",
    content:
      "# " + subject + "\n## " + sender + "\n" + content.replace(/\s+/g, " "),
  };

  var options = {
    method: "post",
    contentType: "application/json",
    payload: JSON.stringify(payload),
  };

  UrlFetchApp.fetch(discordWebhookUrl, options);
}
