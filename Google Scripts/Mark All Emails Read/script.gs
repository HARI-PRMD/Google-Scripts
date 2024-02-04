function checkEmailsAndMarkRead() {
  var emailCount = 0;
  var threads = GmailApp.search("is:unread");
  while (threads.length != 0) {
    for (var i = 0; i < threads.length; i++) {
      var thread = threads[i];
      var messages = thread.getMessages();
      emailCount++;
      console.log(emailCount + " email marked read");
      messages.forEach((m) => m.markRead());
    }
    threads = GmailApp.search("is:unread");
  }
}
