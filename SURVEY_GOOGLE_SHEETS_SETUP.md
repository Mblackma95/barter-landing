# BarterTogether Survey Google Sheets Setup

The `/survey` page posts survey responses to `/api/survey`.

The location autocomplete uses Mapbox through `/api/locations`. Add:

```bash
MAPBOX_ACCESS_TOKEN="pk..."
```

The token can be a public Mapbox token. The app only requests city/town-style
results from Mapbox (`place,locality`) so the survey does not ask for street
addresses.

To save responses in Google Sheets, create a Google Apps Script web app and add
its deployment URL to:

```bash
GOOGLE_SHEETS_WEBHOOK_URL="https://script.google.com/macros/s/YOUR_DEPLOYMENT_ID/exec"
```

## Apps Script

Use the created Google Sheet named `BarterTogether Survey Responses`, then open
Extensions > Apps Script and paste this:

```js
const SPREADSHEET_ID = "1ZCKtRLRASBlUk2CM0qSo0lxNh1bvV3vECGehbzr6PLU";
const SHEET_NAME = "Responses";

function doPost(e) {
  const sheet = SpreadsheetApp.openById(SPREADSHEET_ID).getSheetByName(SHEET_NAME);
  const data = JSON.parse(e.postData.contents);

  sheet.appendRow([
    data.submittedAt || new Date().toISOString(),
    data.fullName || data.name || "",
    data.email || "",
    data.emailSkipped ? "yes" : "no",
    data.location || data.city || "",
    data.locationDetails?.city || "",
    data.locationDetails?.region || "",
    data.locationDetails?.country || data.country || "",
    data.locationDetails?.countryCode || "",
    data.locationDetails?.latitude || "",
    data.locationDetails?.longitude || "",
    data.usefulness || "",
    data.priorExperience || "",
    data.useCase || "",
    data.supply || "",
    data.demand || "",
    (data.friction || []).join(", "),
    data.otherFriction || "",
    data.experienceDesign || "",
    data.exchangeType || "",
    data.ageRange || "",
    data.gender || "",
    data.otherGender || "",
    (data.interests || []).join(", "),
    data.otherInterest || "",
    data.openFeedback || "",
    data.commitment || "",
    data.movement || "",
    "survey",
    "",
  ]);

  return ContentService
    .createTextOutput(JSON.stringify({ ok: true }))
    .setMimeType(ContentService.MimeType.JSON);
}
```

Deploy the script as a web app with access set to anyone with the link. Then add
the web app URL to your environment variables and redeploy/restart the app.
