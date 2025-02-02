# FAQtranslate

An FAQ translator that dynamically translates FAQs into your desired language. It leverages the Google Cloud Translation API for translations and Redis for fast retrieval. Additionally, it provides a sleek admin dashboard to manage FAQs.

---

## 🚀 Tech Stack

- **Backend:** Node.js (Express)
- **Frontend:** React
- **Database:** MongoDB
- **Caching:** Redis
---

## 🔧 Installation and Setup

### 📌 Prerequisites

Ensure the following tools are installed on your system before proceeding:

- **Node.js**
- **npm**
- **MongoDB (Optional)**
- **Redis**

### 📥 Installation Steps

1. **Clone the Repository**

   ```bash
   git clone https://github.com/mrDeepakk/BharatFD-FAQ-Management.git
   ```

2. **Navigate to the Project Directory**

   ```bash
   cd BharatFD-FAQ-Management
   ```

3. **Create a `.env` File**
   Add the following environment variables in a new `.env` file at the root:

   ```env
   MONGO_DB_URI=MongoDB_connection_URL
   API_KEY=your_google_translate_api_key
   PORT=8080
   ```

4. **Install Dependencies**

   ```bash
   npm install
   ```

5. **Run the Application**
   ```bash
   npm start
   ```

The project will now be running at `http://localhost:8080`. Open it in your browser or Ctrl + Click the URL from your terminal.

---

## ✅ Running Tests

To execute tests, use:

```bash
npm test
```

---

## 📡 API Reference

### 1️⃣ Get All FAQs (English)

```http
GET /api/faq
```

**Response:** Returns an array of FAQs in English.

### 2️⃣ Get All FAQs (Translated)

```http
GET /api/faq?lang=<code>
```

| Query Param | Type   | Description                                                                                   |
| ----------- | ------ | --------------------------------------------------------------------------------------------- |
| `lang`      | String | The target language code ([List of Codes](https://cloud.google.com/translate/docs/languages)) |

**Response:** Returns FAQs translated into the requested language.

### 3️⃣ Add a New FAQ

```http
POST /api/faq/admin
```

#### Request Body (JSON):

```json
{
  "question": "What is this project about?",
  "answer": "This project translates FAQs dynamically."
}
```

**Response:** Stores the FAQ in the database (translated into English if required).

### 4️⃣ Delete an FAQ

```http
DELETE /api/faq/admin/:faqId
```

| Parameter | Type   | Description                    |
| --------- | ------ | ------------------------------ |
| `faqId`   | String | The `_id` of the FAQ to delete |

**Response:** Removes the specified FAQ from the database.

---

## 🤝 Contributing

We welcome contributions! Follow the workflow below to submit a pull request.


## 💡 Additional Notes

- **Need help?** Open an issue on GitHub.
- **Found a bug?** Report it via a GitHub issue.
- **Feature request?** We welcome suggestions!

Happy coding! 🚀
