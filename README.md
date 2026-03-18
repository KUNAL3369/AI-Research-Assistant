# AI Research Assistant

An AI-powered document analysis platform that allows users to upload PDFs and interact with them through a conversational interface.

---

## 🚀 Live Demo

🔗 [ai-research-assistant-five.vercel.app](https://ai-research-assistant-five.vercel.app/)

---

## 📸 Screenshots

### Dashboard 
![Dashboard](screenshots/dashboard.png)

### Chat Interface + PDF Preview
![Chat](screenshots/chat.png)

---

## ✨ Features

- 📄 Upload and process PDF documents
- 💬 Chat with documents using AI
- 🔍 Semantic search using vector embeddings
- 📚 Source-based answers (trace response to document chunks)
- 🧠 Retrieval-Augmented Generation (RAG pipeline)
- 💾 Persistent conversation history
- ⚡ Real-time chat UI with auto-scroll & loading states
- 👁️ PDF preview with navigation

---

## 🧠 How It Works

```
1. Upload PDF
2. Extract text from document
3. Split into chunks
4. Generate embeddings
5. Store in vector database (pgvector)
6. User query → embedding → similarity search
7. Relevant chunks sent to LLM
8. AI generates contextual answer
```

---

## 🛠 Tech Stack

| Layer | Technology |
|---|---|
| **Frontend** | Next.js (App Router), React, Tailwind CSS |
| **Backend** | Next.js API Routes |
| **AI / ML** | OpenAI / Groq API, Embeddings + RAG |
| **Database** | Supabase (PostgreSQL + pgvector) |
| **Other** | PDF parsing, Vector similarity search |

---

## 📦 Architecture

```
User → Frontend → API → Embeddings → Vector DB → LLM → Response
```

---

## ⚙️ Setup & Installation

```bash
git clone https://github.com/KUNAL3369/AI-Research-Assistant.git
cd ai-research-assistant
npm install
npm run dev
```

### 🔑 Environment Variables

Create a `.env.local` file in the root directory and add:

```env
GROQ_API_KEY=your_api_key
NEXT_PUBLIC_SUPABASE_URL=your_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_key
```

---

## 📌 Key Highlights

- Built a full-stack AI application from scratch
- Implemented RAG (Retrieval-Augmented Generation)
- Designed ChatGPT-like UI with persistent state
- Integrated vector search with pgvector
- Focused on real-world usability and UX

---

## 🎯 Future Improvements

- [ ] Multi-document querying
- [ ] Highlight exact text in PDF from sources
- [ ] Streaming responses
- [ ] User authentication
- [ ] Chat session management UI

---

## 👨‍💻 Author

**Kunal Prabhakar**  
GitHub: [@KUNAL3369](https://github.com/KUNAL3369)
