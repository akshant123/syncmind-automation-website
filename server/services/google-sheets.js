import { google } from "googleapis";
import { GoogleAuth } from "google-auth-library";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

let sheetsClient = null;

function getSheetsClient() {
  if (sheetsClient) return sheetsClient;

  const keyPath = process.env.GOOGLE_SERVICE_ACCOUNT_KEY || "./service-account-key.json";
  const keyFilePath = path.resolve(__dirname, keyPath);

  if (!fs.existsSync(keyFilePath)) {
    throw new Error(
      `Google service account key file not found at: ${keyFilePath}. ` +
      "Set GOOGLE_SERVICE_ACCOUNT_KEY in your .env to the correct path."
    );
  }

  const auth = new GoogleAuth({
    keyFile: keyFilePath,
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });

  sheetsClient = google.sheets({ version: "v4", auth });
  return sheetsClient;
}

export async function appendRow(rowValues) {
  const sheets = getSheetsClient();
  const spreadsheetId = process.env.GOOGLE_SHEET_ID;
  const sheetName = process.env.GOOGLE_SHEET_NAME || "Sheet1";

  if (!spreadsheetId) {
    throw new Error("GOOGLE_SHEET_ID is not set in your .env file.");
  }

  await sheets.spreadsheets.values.append({
    spreadsheetId,
    range: `${sheetName}!A:J`,
    valueInputOption: "USER_ENTERED",
    requestBody: {
      values: [rowValues],
    },
  });
}
