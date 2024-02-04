function updateDriveStructure() {
  var filesArray = getDriveStructure(); // Get the current drive structure
  var previousFiles = getPreviousDriveStructure(); // Get the previous drive structure

  var removedFiles = findRemovedFiles(previousFiles, filesArray);
  var addedFiles = findAddedFiles(previousFiles, filesArray);

  // Store the current drive structure for future comparisons
  setPreviousDriveStructure(filesArray);

  // Post updates to Discord webhook
  postUpdatesToDiscord(removedFiles, addedFiles);
}

function getDriveStructure() {
  var folderId = "root"; // Replace with the ID of the starting folder to watch
  var filesArray = [];
  listFiles(folderId, "", filesArray);
  return filesArray;
}

function listFiles(folderId, location, filesArray) {
  var folder = DriveApp.getFolderById(folderId);
  var files = folder.getFiles();
  var subfolders = folder.getFolders();

  while (files.hasNext()) {
    var file = files.next();
    filesArray.push({
      filename: file.getName(),
      location: location + file.getName(),
      id: file.getId(),
    });
  }

  while (subfolders.hasNext()) {
    var subfolder = subfolders.next();
    listFiles(
      subfolder.getId(),
      location + subfolder.getName() + " / ",
      filesArray
    );
  }
}

function getPreviousDriveStructure() {
  var scriptProperties = PropertiesService.getScriptProperties();
  var previousStructure = scriptProperties.getProperty("driveStructure");
  return previousStructure ? JSON.parse(previousStructure) : [];
}

function setPreviousDriveStructure(filesArray) {
  var scriptProperties = PropertiesService.getScriptProperties();
  scriptProperties.setProperty("driveStructure", JSON.stringify(filesArray));
}

function findRemovedFiles(previousFiles, currentFiles) {
  return previousFiles.filter(function (previousFile) {
    return !currentFiles.some(function (currentFile) {
      return previousFile.id === currentFile.id;
    });
  });
}

function findAddedFiles(previousFiles, currentFiles) {
  return currentFiles.filter(function (currentFile) {
    return !previousFiles.some(function (previousFile) {
      return currentFile.id === previousFile.id;
    });
  });
}

function postUpdatesToDiscord(removedFiles, addedFiles) {
  var discordWebhookUrl = "YOUR_WEBHOOK_URL_HERE";

  if (removedFiles.length > 0) {
    var removedMessage = removedFiles
      .map(function (file) {
        return `**Removed File:** ${file.filename}\n**Located in:** ${file.location}\n`;
      })
      .join("\n");

    postToDiscord(discordWebhookUrl, removedMessage);
  }

  if (addedFiles.length > 0) {
    var addedMessage = addedFiles
      .map(function (file) {
        return `**Added File:** ${file.filename}\n**Located in:** ${file.location}\n`;
      })
      .join("\n");

    postToDiscord(discordWebhookUrl, addedMessage);
  }
}

function postToDiscord(webhookUrl, message) {
  var payload = {
    content: message,
  };

  var options = {
    method: "post",
    contentType: "application/json",
    payload: JSON.stringify(payload),
  };

  UrlFetchApp.fetch(webhookUrl, options);
}
