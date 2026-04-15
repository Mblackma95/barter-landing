# BarterTogether Survey Google Sheets Setup

The `/survey` page posts survey responses to `/api/survey`.

To save responses in Google Sheets, create a Google Apps Script web app and add
its deployment URL to:

```bash
GOOGLE_SHEETS_WEBHOOK_URL="https://script.google.com/macros/s/YOUR_DEPLOYMENT_ID/exec"
```

## Apps Script

Create a Google Sheet with a tab named `Responses`, then open Extensions >
Apps Script and paste this:

```js
const SHEET_NAME = "Responses";

function doPost(e) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_NAME);
  const data = JSON.parse(e.postData.contents);

  sheet.appendRow([
    data.submittedAt || new Date().toISOString(),
    data.name || "",
    data.email || "",
    data.city || "",
    data.country || "",
    data.ageRange || "",
    (data.offers || []).join(", "),
    data.otherOffer || "",
    (data.needs || []).join(", "),
    data.otherNeed || "",
    (data.safety || []).join(", "),
    (data.events || []).join(", "),
    data.expansionCity || "",
    data.story || "",
    data.wantsUpdates || "",
  ]);

  return ContentService
    .createTextOutput(JSON.stringify({ ok: true }))
    .setMimeType(ContentService.MimeType.JSON);
}
```

Deploy the script as a web app with access set to anyone with the link. Then add
the web app URL to your environment variables and redeploy/restart the app.
