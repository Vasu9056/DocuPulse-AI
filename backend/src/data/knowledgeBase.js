/**
 * Knowledge Base & Seed Vector Store
 */
const config = require('../config');

const VECTOR_STORE = [
  {
    id: "chunk_next_01",
    library: "nextjs",
    library_name: "Next.js 15 App Router",
    title: "Next.js 15 Async Request Headers & Cookies Migration",
    source_url: "https://nextjs.org/docs/app/building-your-application/upgrading/version-15",
    version: "v15.0.1",
    similarity_keywords: ["next", "cookie", "cookies", "header", "headers", "async", "params", "upgrade", "version 15", "breaking"],
    headline: "Next.js 15 Breaking Changes: Async Request Headers & Cookies",
    answer: "In Next.js 15, runtime APIs that inspect incoming request data—including `cookies()`, `headers()`, `params`, and `searchParams`—have been changed from synchronous properties to **asynchronous Promises**. You must now `await` them before reading values.",
    code_lang: "typescript",
    code: `// Next.js 15 Server Component / Route Handler
import { cookies, headers } from 'next/headers';

export default async function ProfilePage({ params }: { params: Promise<{ id: string }> }) {
  // 1. Await async params Promise (Next.js 15 requirement)
  const { id } = await params;

  // 2. Await cookies() store
  const cookieStore = await cookies();
  const sessionToken = cookieStore.get('session_token')?.value;

  // 3. Await headers()
  const headerList = await headers();
  const userAgent = headerList.get('user-agent');

  return <div>User Profile: {id} | Token: {sessionToken}</div>;
}`,
    markdown: "### Asynchronous Request APIs (Breaking Change)\n`cookies()`, `headers()`, `draftMode()`, and `params` in layout and page components are now asynchronous Promises. Migrate synchronous access by adding `await`."
  },
  {
    id: "chunk_bd_01",
    library: "brightdata",
    library_name: "Bright Data SDK & Scraper Studio API",
    title: "Bright Data Scraper Studio DCA Trigger API (Node.js)",
    source_url: "https://docs.brightdata.com/api-reference/scraper-studio-api/Getting_started_with_the_API",
    version: "v2.4.0",
    similarity_keywords: ["bright", "brightdata", "collector", "dca", "trigger", "scraper", "self-healing", "node", "axios", "api"],
    headline: "Bright Data Scraper Studio DCA Trigger API (Node.js)",
    answer: `To trigger your custom Scraper Studio collector (\`${config.brightData.collectorId}\`) programmatically, send an authenticated \`POST\` request to the DCA trigger endpoint. With self-healing enabled, Bright Data will automatically re-derive broken CSS selectors from your natural language schema if the target page DOM shifts.`,
    code_lang: "javascript",
    code: `// Trigger Bright Data Scraper Studio Collector in Node.js
const axios = require('axios');

async function triggerDocCollector() {
  const response = await axios.post(
    'https://api.brightdata.com/dca/trigger?collector=${config.brightData.collectorId}&queue_next=1',
    [
      { 
        url: 'https://nextjs.org/docs/app/building-your-application/upgrading/version-15',
        auto_heal: true // Enables autonomous selector recovery
      }
    ],
    {
      headers: {
        'Authorization': 'Bearer ' + (process.env.BRIGHT_DATA_API_TOKEN || 'YOUR_API_TOKEN'),
        'Content-Type': 'application/json'
      }
    }
  );

  console.log('Collector Job ID:', response.data.job_id);
  console.log('Extraction Status:', response.data.status); // "success"
}

triggerDocCollector();`,
    markdown: `### Triggering Collectors via REST API\nTo trigger execution of a Scraper Studio collector, send an HTTP POST request to \`/dca/trigger\` with query parameter \`collector=${config.brightData.collectorId}\`. When \`auto_heal\` is set to \`true\`, the proxy engine validates extraction completeness and repairs selectors dynamically.`
  },
  {
    id: "chunk_lc_01",
    library: "langchain",
    library_name: "LangChain & LangGraph",
    title: "LangChain v0.3 Standardized Tool Calling with Pydantic",
    source_url: "https://python.langchain.com/docs/how_to/tool_calling",
    version: "v0.3.4",
    similarity_keywords: ["langchain", "tool", "pydantic", "structured", "bind_tools", "agent", "python"],
    headline: "LangChain v0.3 Standardized Tool Calling with Pydantic",
    answer: "In LangChain v0.3, tool calling and structured output are standardized using `.bind_tools()` and `.with_structured_output()`. Models directly bind Python functions or Pydantic models with type safety.",
    code_lang: "python",
    code: `# LangChain v0.3 Tool Calling Example
from langchain_openai import ChatOpenAI
from pydantic import BaseModel, Field

class ScraperConfig(BaseModel):
    target_url: str = Field(description="The website URL to scrape")
    enable_self_healing: bool = Field(default=True, description="Auto-repair broken selectors")

llm = ChatOpenAI(model="gpt-4o")
structured_llm = llm.with_structured_output(ScraperConfig)

result = structured_llm.invoke("Scrape https://nextjs.org/docs with self healing enabled")
print(result.target_url) # "https://nextjs.org/docs"
print(result.enable_self_healing) # True`,
    markdown: "### Tool Calling in LangChain v0.3\nUse `.bind_tools()` to attach tool schemas directly to any chat model supporting function calling. For structured data extraction, use `.with_structured_output()`."
  }
];

const DOC_LIBRARIES = [
  {
    id: "lib_nextjs",
    name: "Next.js 15 App Router",
    version: "v15.0.1",
    domain: "nextjs.org/docs",
    url: "https://nextjs.org/docs/app/building-your-application/upgrading/version-15",
    icon: "▲",
    pages: 680,
    chunks: 6120,
    freshness: "Synced 4 mins ago",
    status: "Active (Grounded)",
    collector_id: config.brightData.collectorId,
    description: "Async request headers, Server Components, Server Actions, React 19 compiler integration, and streaming SSR."
  },
  {
    id: "lib_brightdata",
    name: "Bright Data SDK & DCA API",
    version: "v2.4.0 (Latest)",
    domain: "docs.brightdata.com",
    url: "https://docs.brightdata.com/api-reference/scraper-studio-api",
    icon: "⚡",
    pages: 420,
    chunks: 3840,
    freshness: "Synced 8 mins ago",
    status: "Active (Self-Healed)",
    collector_id: config.brightData.collectorId,
    description: "Official API reference for Scraper Studio, DCA triggers, residential proxy pool routing, and auto-unblocking."
  },
  {
    id: "lib_langchain",
    name: "LangChain & LangGraph",
    version: "v0.3.4",
    domain: "python.langchain.com",
    url: "https://python.langchain.com/docs/introduction",
    icon: "🦜",
    pages: 540,
    chunks: 5240,
    freshness: "Synced 22 mins ago",
    status: "Active (Grounded)",
    collector_id: config.brightData.collectorId,
    description: "Tool calling, structured Pydantic output, LangGraph stateful multi-agent orchestrations, and RAG retrievers."
  },
  {
    id: "lib_supabase",
    name: "Supabase & pgvector",
    version: "v2.39.0",
    domain: "supabase.com/docs",
    url: "https://supabase.com/docs/guides/ai",
    icon: "⚡",
    pages: 390,
    chunks: 3220,
    freshness: "Synced 1 hour ago",
    status: "Active (Grounded)",
    collector_id: config.brightData.collectorId,
    description: "Postgres vector embeddings, HNSW indexes, hybrid full-text search, Edge Functions, and Auth RLS."
  }
];

module.exports = {
  VECTOR_STORE,
  DOC_LIBRARIES
};
