export const DOC_LIBRARIES = [
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
    health: "100%",
    description: "Official API reference for Scraper Studio, DCA triggers, residential proxy pool routing, and auto-unblocking."
  },
  {
    id: "lib_nextjs",
    name: "Next.js 15 App Router",
    version: "v15.0.1",
    domain: "nextjs.org/docs",
    url: "https://nextjs.org/docs/app/building-your-application",
    icon: "▲",
    pages: 680,
    chunks: 6120,
    freshness: "Synced 14 mins ago",
    status: "Active (Grounded)",
    health: "99.8%",
    description: "Async request headers, Server Components, Server Actions, React 19 compiler integration, and streaming SSR."
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
    health: "99.4%",
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
    health: "100%",
    description: "Postgres vector embeddings, HNSW indexes, hybrid full-text search, Edge Functions, and Auth RLS."
  }
];

export const RAG_KNOWLEDGE_BASE = {
  "brightdata": {
    matchQuery: "bright data",
    headline: "Bright Data Scraper Studio DCA Trigger API (Node.js)",
    answer: "To trigger a custom Bright Data Scraper Studio collector programmatically, send an authenticated `POST` request to the DCA trigger endpoint. With self-healing enabled, Bright Data will automatically re-derive broken CSS selectors from your natural language schema if the target page DOM shifts.",
    codeLang: "javascript",
    code: `// Trigger Bright Data Scraper Studio Collector in Node.js
const axios = require('axios');

async function triggerDocCollector() {
  const response = await axios.post(
    'https://api.brightdata.com/dca/trigger?collector=c_msxjxlwm78wlkksy4&queue_next=1',
    [
      { 
        url: 'https://docs.brightdata.com/datasets/scraper-studio/overview',
        auto_heal: true // Enables autonomous selector recovery
      }
    ],
    {
      headers: {
        'Authorization': 'Bearer YOUR_BRIGHT_DATA_API_TOKEN',
        'Content-Type': 'application/json'
      }
    }
  );

  console.log('Collector Job ID:', response.data.job_id);
  console.log('Extraction Status:', response.data.status); // "success"
}

triggerDocCollector();`,
    citations: [
      {
        title: "Bright Data Scraper Studio API Reference • /api/dca/trigger",
        score: "98.6% Match",
        url: "https://docs.brightdata.com/api-reference/scraper-studio-api/Getting_started_with_the_API",
        markdown: "### Triggering Collectors via REST API\nTo trigger execution of a Scraper Studio collector, send an HTTP POST request to `/dca/trigger` with query parameter `collector=c_msxjxlwm78wlkksy4`. When `auto_heal` is set to `true`, the unblocking engine validates extraction completeness and repairs selectors dynamically."
      },
      {
        title: "Self-Healing Tool Overview • /datasets/scraper-studio/self-healing",
        score: "96.2% Match",
        url: "https://docs.brightdata.com/datasets/scraper-studio/self-healing-tool",
        markdown: "### Autonomous Selector Recovery\nScraper Studio eliminates selector maintenance. If an e-commerce or documentation site renames CSS classes, the underlying collector re-evaluates the natural language field description and restores data flow."
      }
    ]
  },
  "nextjs": {
    matchQuery: "next.js",
    headline: "Next.js 15 Breaking Changes: Async Request Headers & Cookies",
    answer: "In Next.js 15, runtime APIs that inspect incoming request data—including \`cookies()\`, \`headers()\`, \`params\`, and \`searchParams\`—have been changed from synchronous properties to **asynchronous Promises**. You must now \`await\` them before reading values.",
    codeLang: "typescript",
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
    citations: [
      {
        title: "Next.js 15 Upgrade Guide • /docs/app/building-your-application/upgrading/version-15",
        score: "99.1% Match",
        url: "https://nextjs.org/docs/app/building-your-application/upgrading/version-15",
        markdown: "### Asynchronous Request APIs (Breaking Change)\n`cookies()`, `headers()`, `draftMode()`, and `params` in layout and page components are now asynchronous. Migrate synchronous access by adding `await`."
      }
    ]
  },
  "langchain": {
    matchQuery: "langchain",
    headline: "LangChain v0.3 Standardized Tool Calling with Pydantic",
    answer: "In LangChain v0.3, tool calling and structured output are standardized using \`.bind_tools()\` and \`.with_structured_output()\`. Models directly bind Python functions or Pydantic models with type safety.",
    codeLang: "python",
    code: `# LangChain v0.3 Tool Calling Example
from langchain_openai import ChatOpenAI
from pydantic import BaseModel, Field

class ScraperConfig(BaseModel):
    target_url: str = Field(description="The website URL to scrape")
    enable_self_healing: bool = Field(default=True, description="Auto-repair broken selectors")

llm = ChatOpenAI(model="gpt-4o")
structured_llm = llm.with_structured_output(ScraperConfig)

result = structured_llm.invoke("Scrape https://docs.brightdata.com with self healing enabled")
print(result.target_url) # "https://docs.brightdata.com"
print(result.enable_self_healing) # True`,
    citations: [
      {
        title: "LangChain v0.3 How-to Guide • /docs/how_to/tool_calling",
        score: "97.8% Match",
        url: "https://python.langchain.com/docs/how_to/tool_calling",
        markdown: "### Tool Calling in LangChain v0.3\nUse `.bind_tools()` to attach tool schemas directly to any chat model supporting function calling. For structured data extraction, use `.with_structured_output()`."
      }
    ]
  }
};
