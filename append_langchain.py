import csv

data = {
    "id": "chunk_langchain_01",
    "library": "langchain",
    "library_name": "LangChain & LangGraph",
    "title": "LangChain Tool Calling Agent (bind_tools)",
    "source_url": "https://python.langchain.com/docs/modules/agents/how_to/tool_calling/",
    "version": "v0.3.4",
    "similarity_keywords": "langchain|python|agent|tool|llm|reasoning|bind_tools|invoke|graph|langgraph|openai",
    "headline": "Creating Tool Calling Agents with bind_tools()",
    "answer": "In LangChain v0.3, the recommended way to create agents that can use external tools is by using `bind_tools()` on supported chat models (like ChatOpenAI). You pass a list of Pydantic models or Python functions to `bind_tools()`. The model will then output a `tool_calls` field when it decides to use a tool, which you can execute and return as `ToolMessage`s.",
    "code_lang": "python",
    "code": "from langchain_openai import ChatOpenAI\nfrom langchain_core.tools import tool\n\n@tool\ndef get_weather(location: str) -> str:\n    \"\"\"Get the current weather for a location.\"\"\"\n    return f\"The weather in {location} is sunny.\"\n\n# 1. Define tools\ntools = [get_weather]\n\n# 2. Bind tools to the LLM\nllm = ChatOpenAI(model=\"gpt-4o\")\nllm_with_tools = llm.bind_tools(tools)\n\n# 3. Invoke the model\nres = llm_with_tools.invoke(\"What is the weather in Tokyo?\")\nprint(res.tool_calls) # Model decides to call get_weather"
}

with open('dataset.csv', 'a', newline='', encoding='utf-8') as f:
    writer = csv.DictWriter(f, fieldnames=data.keys())
    writer.writerow(data)
