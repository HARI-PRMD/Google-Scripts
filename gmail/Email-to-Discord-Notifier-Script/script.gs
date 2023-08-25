function checkEmailsAndPostToDiscord() {
  var threads = GmailApp.search("is:unread");

  for (var i = 0; i < threads.length; i++) {
    var thread = threads[i];
    var message = thread.getMessages()[0]; // Consider the latest message in the thread

    var sender = message.getFrom();
    var subject = message.getSubject();
    var snippet = message.getPlainBody().substring(0, 500) + "..."; // Get the first 500 characters of the email

    // Post to Discord webhook
    postToDiscord(sender, subject, snippet);

    // Mark email as read (optional)
    message.markRead();
  }
}

function postToDiscord(sender, subject, content) {
  var discordWebhookUrl = "YOUR_WEBHOOK_URL";
  var payload = {
    username: "Email Notifier",
    content:
      "# Subject: " +
      subject +
      "\n## From: " +
      sender +
      "\n" +
      content.replace(/\s+/g, " "),
  };

  var options = {
    method: "post",
    contentType: "application/json",
    payload: JSON.stringify(payload),
  };

  UrlFetchApp.fetch(discordWebhookUrl, options);
}
