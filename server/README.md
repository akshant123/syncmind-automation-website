# SyncMind Automation — Backend API

A standalone Node.js/Express backend for the SyncMind Automation website. It handles the **Request Demo** and **Career Application** forms by writing leads to a Google Sheet and sending email notifications.

This backend is fully portable — no Supabase, no proprietary services. You can run it on any server or VPS.

---

## Architecture

```
Website (frontend)
  → POST /api/demo-request        → Google Sheets + Email
  → POST /api/career-application  → Email (with resume attachment)
```

- **No database** — Google Sheets is the live lead database.
- **No Supabase** — standard Node.js/Express.
- Credentials are read from environment variables and never exposed to the frontend.

---

## Prerequisites

- Node.js 18 or higher
- A Google Cloud account (for Google Sheets API)
- An email account for sending notifications (Gmail, Outlook, or any SMTP provider)

---

## 1. Create the Google Sheet

1. Go to [Google Sheets](https://sheets.google.com) and create a new spreadsheet.
2. Name the first tab (worksheet) — e.g. `Leads` or leave it as `Sheet1`.
3. Add these column headers in **row 1** (columns A through J):

| A | B | C | D | E | F | G | H | I | J |
|---|---|---|---|---|---|---|---|---|---|
| Submission Date & Time | Full Name | Email | Company | Phone Number | Interested In | Company Size | Requirement | Source | Status |

4. Copy the **Sheet ID** from the URL. It's the long string between `/d/` and `/edit`:
   ```
   https://docs.google.com/spreadsheets/d/THIS_IS_YOUR_SHEET_ID/edit
   ```

---

## 2. Enable Google Sheets API & Create a Service Account

1. Go to the [Google Cloud Console](https://console.cloud.google.com/).
2. Create a new project (or use an existing one).
3. In the sidebar, go to **APIs & Services → Library**.
4. Search for **Google Sheets API** and click **Enable**.
5. Go to **APIs & Services → Credentials**.
6. Click **Create Credentials → Service Account**.
7. Give it a name (e.g. `syncmind-sheets`) and click **Create and Continue**, then **Done**.
8. Click on the service account you just created, go to the **Keys** tab.
9. Click **Add Key → Create new key → JSON**. A JSON file will download.
10. **Rename this file** to `service-account-key.json` and place it in the `server/` folder.
11. **Share your Google Sheet** with the service account email (found in the JSON file under `"client_email"`, e.g. `syncmind-sheets@your-project.iam.gserviceaccount.com`). Give it **Editor** access.

---

## 3. Configure Email (SMTP)

### If using Gmail:
1. Enable 2-Factor Authentication on your Gmail account.
2. Go to [Google App Passwords](https://myaccount.google.com/apppasswords).
3. Create a new app password (name it "SyncMind Backend").
4. Copy the 16-character password — this is your `SMTP_PASS`.

### Other providers:
Use any SMTP provider (Outlook, SendGrid, Mailgun, etc.). Just set the `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, and `SMTP_PASS` accordingly.

---

## 4. Environment Variables

Copy `.env.example` to `.env` and fill in your values:

```bash
cp .env.example .env
```

| Variable | Description | Example |
|---|---|---|
| `PORT` | Port the server runs on | `3001` |
| `CLIENT_ORIGIN` | Allowed frontend origin(s), comma-separated | `http://localhost:5173` |
| `GOOGLE_SHEET_ID` | Your Google Sheet ID from the URL | `1AbC...xyz` |
| `GOOGLE_SHEET_NAME` | The tab/worksheet name | `Sheet1` |
| `GOOGLE_SERVICE_ACCOUNT_KEY` | Path to the service account JSON key | `./service-account-key.json` |
| `SMTP_HOST` | SMTP server host | `smtp.gmail.com` |
| `SMTP_PORT` | SMTP server port | `587` |
| `SMTP_USER` | Email address sending notifications | `your-email@gmail.com` |
| `SMTP_PASS` | Email password or app password | `your-app-password` |
| `NOTIFY_EMAIL` | Email address receiving notifications | `service@syncmindautomation.com` |

---

## 5. Run the Backend Locally

```bash
cd server
npm install
npm run dev
```

The server will start on `http://localhost:3001`.

Test that it's running:
```bash
curl http://localhost:3001/api/health
# Should return: {"status":"ok"}
```

---

## 6. Connect the Frontend

The frontend reads the backend URL from the `VITE_API_URL` environment variable.

In the **project root** (not the server folder), edit `.env`:

```
VITE_API_URL=http://localhost:3001
```

For production, set this to your deployed backend URL:
```
VITE_API_URL=https://api.yourdomain.com
```

---

## 7. Deploy the Backend on a VPS

### Option A: Plain Node.js

```bash
# On your server:
git clone <your-repo>
cd server
npm install
cp .env.example .env
# Edit .env with your production values
# Place service-account-key.json in the server folder

# Start with PM2 (process manager)
npm install -g pm2
pm2 start index.js --name syncmind-backend
pm2 save
pm2 startup  # follow the instructions to auto-start on boot
```

### Option B: With Nginx reverse proxy

Add this to your Nginx config:

```nginx
server {
    listen 80;
    server_name api.yourdomain.com;

    location / {
        proxy_pass http://127.0.0.1:3001;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
```

Then set `CLIENT_ORIGIN` in `.env` to your frontend domain:
```
CLIENT_ORIGIN=https://www.syncmindautomation.com
```

### SSL with Let's Encrypt:
```bash
sudo certbot --nginx -d api.yourdomain.com
```

---

## API Endpoints

### POST /api/demo-request

**Request body:**
```json
{
  "fullName": "John Doe",
  "email": "john@company.com",
  "company": "Acme Corp",
  "interestedIn": "ERP",
  "companySize": "51–200",
  "requirement": "Looking to automate finance workflows"
}
```

**Success response (200):**
```json
{
  "success": true,
  "message": "Thank you. Your request has been received. Our team will contact you shortly."
}
```

**Error response (400/500):**
```json
{
  "error": "Full name and email are required."
}
```

**What happens:**
1. Validates the form data
2. Appends a new row to the Google Sheet
3. Sends an email notification to `NOTIFY_EMAIL`
4. Returns success only after both succeed

---

### POST /api/career-application

**Request body:**
```json
{
  "fullName": "Jane Smith",
  "jobRole": "Full Stack Developer",
  "fileName": "jane-smith-resume.pdf",
  "fileType": "application/pdf",
  "fileSize": 245678,
  "fileBase64": "JVBERi0xLjQ..."
}
```

**Success response (200):**
```json
{
  "success": true,
  "message": "Thank you for applying. Your application has been received successfully."
}
```

**What happens:**
1. Validates name, role, and resume file (PDF/DOC/DOCX, max 5MB)
2. Sends an email to `NOTIFY_EMAIL` with the resume attached
3. Returns success only after the email is sent

---

## File Structure

```
server/
├── index.js                    # Express server entry point
├── package.json
├── .env.example               # Template for environment variables
├── .gitignore
├── README.md
├── routes/
│   ├── demo-request.js        # Request Demo handler
│   └── career-application.js # Career Application handler
└── services/
    ├── google-sheets.js       # Google Sheets API integration
    └── email.js               # SMTP email service
```

---

## Security Notes

- The `service-account-key.json` file is in `.gitignore` — never commit it.
- The `.env` file is in `.gitignore` — never commit it.
- All credentials are server-side only. The frontend only knows the API URL.
- CORS is configured to only allow requests from `CLIENT_ORIGIN`.
- File uploads are validated for type and size on the server.
