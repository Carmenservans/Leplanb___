/**
 * leplanb — Waitlist Google Apps Script
 * ─────────────────────────────────────
 * SETUP INSTRUCTIONS (do this once):
 *
 * 1. Open your Google Sheet:
 *    https://docs.google.com/spreadsheets/d/1-1YgPHOq7q_PyeIrOrBUbk66ljuwCZ0OL1uC6J2vWrw
 *
 * 2. Click Extensions → Apps Script
 *
 * 3. Delete everything in the editor and paste this entire file
 *
 * 4. Click Save (💾)
 *
 * 5. Click Deploy → New deployment
 *    - Type: Web app
 *    - Execute as: Me
 *    - Who has access: Anyone
 *    - Click Deploy → Authorize → Allow
 *
 * 6. Copy the Web App URL (looks like: https://script.google.com/macros/s/XXXX/exec)
 *
 * 7. Open optin.html and replace YOUR_APPS_SCRIPT_URL_HERE with that URL
 *
 * ─────────────────────────────────────
 */

const SHEET_NAME = 'Sheet1'; // change if your sheet tab has a different name
const SPREADSHEET_ID = '1-1YgPHOq7q_PyeIrOrBUbk66ljuwCZ0OL1uC6J2vWrw';

function doPost(e) {
  try {
    const ss     = SpreadsheetApp.openById(SPREADSHEET_ID);
    const sheet  = ss.getSheetByName(SHEET_NAME) || ss.getSheets()[0];

    // Add header row if sheet is empty
    if (sheet.getLastRow() === 0) {
      sheet.appendRow(['Timestamp', 'Name', 'Email', 'Instagram', 'Source']);
      sheet.getRange(1, 1, 1, 5).setFontWeight('bold');
    }

    // Parse incoming JSON
    const data      = JSON.parse(e.postData.contents);
    const timestamp = data.timestamp  || new Date().toISOString();
    const name      = data.name       || '';
    const email     = data.email      || '';
    const instagram = data.instagram  || '';
    const source    = data.source     || 'leplanb-optin';

    // Append the new row
    sheet.appendRow([timestamp, name, email, instagram, source]);

    return ContentService
      .createTextOutput(JSON.stringify({ status: 'ok' }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ status: 'error', message: err.message }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet(e) {
  // Handle beacon fallback (image ping with data in URL params)
  if (e.parameter && e.parameter.beacon === '1' && e.parameter.email) {
    try {
      const ss    = SpreadsheetApp.openById(SPREADSHEET_ID);
      const sheet = ss.getSheetByName(SHEET_NAME) || ss.getSheets()[0];
      if (sheet.getLastRow() === 0) {
        sheet.appendRow(['Timestamp', 'Name', 'Email', 'Instagram', 'Source']);
        sheet.getRange(1, 1, 1, 5).setFontWeight('bold');
      }
      sheet.appendRow([
        e.parameter.timestamp || new Date().toISOString(),
        e.parameter.name      || '',
        e.parameter.email     || '',
        e.parameter.instagram || '',
        e.parameter.source    || 'leplanb-optin'
      ]);
    } catch(_) {}
  }
  return ContentService
    .createTextOutput('ok')
    .setMimeType(ContentService.MimeType.TEXT);
}
