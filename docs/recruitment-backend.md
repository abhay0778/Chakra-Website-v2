# TEAM CHAKRA ROBOTICS Recruitment 2026 backend setup

This project is prepared to submit registration data to a configured Power Automate endpoint and then redirect the candidate to the WhatsApp community only after a successful save.

## 1. Required environment variables

Create a `.env.local` file in the project root and add:

```bash
VITE_RECRUITMENT_API_URL=https://<your-power-automate-endpoint>
VITE_RECRUITMENT_API_KEY=<shared-secret-or-header-token-if-used>
VITE_WHATSAPP_COMMUNITY_LINK=https://chat.whatsapp.com/<your-community-invite>
VITE_RECRUITMENT_REDIRECT_DELAY_MS=2500
```

Notes:
- Never commit real secrets to the repository.
- Keep the Power Automate endpoint and any API key in environment variables, not hardcoded into source files.
- Do not put raw Excel or OneDrive credentials in the frontend code.

## 2. Excel workbook and table structure

Create or use an Excel workbook saved in OneDrive for Business. In the workbook, create a worksheet named `Registrations` and add a table with these columns:

- FullName
- Email
- Phone
- College
- Branch
- Year
- Division
- PreferredRole
- ResumeUrl
- PortfolioUrl
- Statement
- Consent
- Source
- SubmittedAt

Then convert the range to a structured Excel table named exactly `Registrations`.

Important:
- Each successful submission creates a new row.
- The Date/Time column should be populated by the backend with the submission timestamp.
- Keep the table headers consistent with the Power Automate payload keys.

## 3. Power Automate configuration

1. Open Power Automate.
2. Create a new instant cloud flow using the HTTP trigger: "When a HTTP request is received".
3. Set the method to `POST`.
4. Add a trigger condition to validate the API key or shared secret if you are using one.
5. Add an action to "Add a row into a table" for the Excel workbook in OneDrive.
6. Map the submitted JSON fields to the Excel columns.
7. Add an action to return a JSON success response such as:

```json
{
  "success": true,
  "message": "Registration saved successfully."
}
```

On failure, return an HTTP status in the 4xx or 5xx range and a message field such as:

```json
{
  "success": false,
  "message": "The registration could not be saved."
}
```

## 4. Duplicate handling

The frontend blocks repeated submissions for the same email and phone within the same browser session. The backend should also reject duplicate rows if the same email or phone number has already been submitted.

Recommended duplicate check in Power Automate:
- Query the Excel table for the submitted email or phone.
- If a record exists, return a 409 or similar response and a clear message.

## 5. Validation requirements

Validate everything on both the frontend and backend:
- required fields must be present
- email format must be valid
- phone number must be valid
- URL fields must be valid if provided
- consent checkbox must be checked
- division and motivation statement must be present

## 6. Testing checklist

After the flow is configured and the environment variables are in place:

- submit a valid form and verify a new Excel row is created
- submit an invalid form and verify the frontend blocks it and shows an error
- force the backend to fail and verify that no WhatsApp redirect occurs
- verify the duplicate-submission guard prevents repeated clicks
- verify the success state shows the correct message and a WhatsApp CTA

The app is ready to call the flow once the endpoint and workbook are configured. Until a real submission is verified in Excel, the backend is not considered operational.
