# Email-to-Discord Notifier Script

This script allows you to monitor your Gmail inbox for new emails and post their subject and content snippets to a Discord channel via a webhook. It's a handy way to keep your team informed about incoming emails without having to constantly check your email client.

## Prerequisites

- A Gmail account where you want to monitor incoming emails.
- A Discord server where you have the necessary permissions to create a webhook.

## Setup

1. **Create a Discord Webhook:**
   - In your Discord server, navigate to the channel where you want to post the email notifications.
   - Click on the settings (cog) icon next to the channel name.
   - Go to the "Integrations" section and create a new Webhooks integration. Note down the webhook URL generated.

2. **Google Apps Script Setup:**
   - Open Google Drive and create a new Google Apps Script project.
   - Copy and paste the provided script (`script.gs`) into the script editor.
   - Replace `"YOUR_DISCORD_WEBHOOK_URL"` with the actual webhook URL from the previous step.

3. **Set Up Triggers:**
   - In the Apps Script editor, go to the "Triggers" icon (clock) in the toolbar.
   - Click on "Add Trigger" and configure it to run the `checkEmailsAndPostToDiscord` function at the desired interval (e.g., every 5 minutes).

4. **Gmail Label (Optional):**
   - If you want to mark processed emails, create a Gmail label named "ToBeProcessed."
   - Apply this label to emails you want to be processed by the script.

## Running the Script

The script will automatically check your Gmail inbox for unread emails and post their subject and content snippets to the specified Discord channel.

If you want real-time processing, consider exploring Gmail's push notification feature combined with external services.

## Troubleshooting

If you encounter issues or want to modify the script, refer to the script comments for explanations and guidance.

---

*Note: This script is provided as an example and might require adjustments based on your specific requirements. Use at your own discretion.*

For more information about Google Apps Script and Discord webhooks, refer to the respective documentation:

- [Google Apps Script](https://developers.google.com/apps-script)
- [Discord Webhooks](https://discord.com/developers/docs/resources/webhook)
