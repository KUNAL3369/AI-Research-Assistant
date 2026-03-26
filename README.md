<div align="center">

# 📄 AI Research Assistant

**A full-stack AI platform that lets you upload PDFs and have a real conversation with them.**

Built to demonstrate RAG (Retrieval-Augmented Generation) as a working product — not just a concept.

[![Live Demo](https://img.shields.io/badge/🚀%20Live%20Demo-Visit%20Site-brightgreen?style=for-the-badge)](https://ai-research-assistant-five.vercel.app/)
[![Next.js](https://img.shields.io/badge/Next.js-App%20Router-000000?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![TailwindCSS](https://img.shields.io/badge/Tailwind-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Supabase](https://img.shields.io/badge/Supabase-pgvector-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white)](https://supabase.com/)
[![OpenAI](https://img.shields.io/badge/OpenAI%20%2F%20Groq-RAG%20Pipeline-412991?style=for-the-badge&logo=openai&logoColor=white)](https://openai.com/)
[![Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://ai-research-assistant-five.vercel.app/)

</div>

---

## ⚡ Try It Right Now

No setup. No sign-up. Just upload a PDF and start asking questions.

| | |
|---|---|
| 🌐 **Live URL** | https://ai-research-assistant-five.vercel.app/ |

---

## 🧠 The Problem It Solves

Reading through long PDFs — research papers, reports, contracts — to find specific answers is slow and frustrating.

AI Research Assistant lets you skip straight to the answer:

- 📄 Upload any PDF document
- 💬 Ask questions in plain language
- 🔍 Get answers traced back to the exact source chunks
- 📚 See which parts of the document the AI used to respond

---

## 🔥 Key Highlights

- Full RAG pipeline built from scratch — chunking, embeddings, vector search, LLM response
- Source-attributed answers — every response is traceable to document sections
- ChatGPT-style UI with persistent conversation history and auto-scroll
- PDF preview with in-app navigation alongside the chat interface

---

## ✨ Features

| Feature | Description |
|---|---|
| 📄 **PDF Upload & Processing** | Extract, chunk, and embed document text on upload |
| 💬 **Conversational Chat** | Ask questions in natural language, get contextual answers |
| 🔍 **Semantic Search** | Vector embeddings power similarity-based retrieval |
| 📚 **Source Attribution** | Responses traced back to specific document chunks |
| 🧠 **RAG Pipeline** | Full retrieval-augmented generation implementation |
| 💾 **Persistent History** | Conversation saved across sessions |
| ⚡ **Real-Time Chat UI** | Auto-scroll, loading states, smooth interaction |
| 👁️ **PDF Preview** | In-app document viewer with page navigation |

---

## 🏗️ How It Works

```
User uploads PDF
        │
        ▼
Text extracted from document
        │
        ▼
Split into chunks
        │
        ▼
Embeddings generated (OpenAI / Groq)
        │
        ▼
Stored in vector database (Supabase + pgvector)
        │
        ▼
User asks a question
        │
        ▼
Query embedded → similarity search → relevant chunks retrieved
        │
        ▼
Chunks + query sent to LLM
        │
        ▼
AI generates contextual, source-attributed answer
```

---

## 🧰 Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js (App Router) |
| Styling | Tailwind CSS |
| Backend | Next.js API Routes |
| AI / ML | OpenAI / Groq API + Embeddings |
| Database | Supabase (PostgreSQL + pgvector) |
| Other | PDF parsing, Vector similarity search |
| Deployment | Vercel |

---

## 📸 Screenshots

### 📊 Dashboard
![Dashboard](./screenshots/dashboard.png)

### 💬 Chat Interface + PDF Preview
![Chat](./screenshots/chat.png)

---

## 🚀 Run Locally

```bash
git clone https://github.com/KUNAL3369/AI-Research-Assistant.git
cd ai-research-assistant
npm install
npm run dev
```

Create a `.env.local` file in the root:

```env
GROQ_API_KEY=your_api_key
NEXT_PUBLIC_SUPABASE_URL=your_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_key
```

Open [http://localhost:3000](http://localhost:3000) and you're in.

---

## 🎯 Why This Project Matters

- Implements a full RAG pipeline — not just an API call, but chunking, embedding, retrieval, and generation
- Demonstrates backend thinking alongside frontend — vector DB, API routes, and data flow
- Focuses on real usability — source attribution and PDF preview make it an actual tool, not a demo
- Shows end-to-end AI product development from scratch to deployment

---

## 🔮 Planned Improvements

- [ ] Multi-document querying
- [ ] Highlight exact source text in PDF viewer
- [ ] Streaming responses
- [ ] User authentication + cloud session storage
- [ ] Chat session management UI

---

## 📬 Let's Connect

🟢 **Open to:** Frontend Engineer · Product Engineer · Internal Tools Developer · Startup Software Engineer · AI Application Developer

[![LinkedIn](https://img.shields.io/badge/LinkedIn-Kunal%20Prabhakar-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/prabhakarkunal)
[![Email](https://img.shields.io/badge/Email-kunal.prabhakar3082@gmail.com-D14836?style=for-the-badge&logo=gmail&logoColor=white)](mailto:kunal.prabhakar3082@gmail.com)

---

<div align="center">

⭐ **Found this useful? Star the repo — it helps others discover it.**

</div>
