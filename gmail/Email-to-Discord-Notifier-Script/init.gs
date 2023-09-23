function addBotLabelToAllPreviousMails() {
  var threads = GmailApp.search('-label:"read by bot"');
  var label = GmailApp.createLabel("read by bot");

  for (var i = 0; i < threads.length; i++) {
    var thread = threads[i];

    // Add a label to the message to mark as "read by bot"
    thread.addLabel(label);
  }
}
