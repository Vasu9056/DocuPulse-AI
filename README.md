# DocuPulse AI - Hackathon Project

Hey! Welcome to DocuPulse AI. We built this for the "Into the Scrape-Verse" hackathon with Bright Data.

### The Problem
If you use AI coding assistants, you know they hallucinate constantly when libraries update (like Next.js migrating APIs). We realized that if we use Bright Data's Scraper Studio to pull fresh docs, we can build a RAG copilot that is actually accurate. More importantly, when the docs websites change their layout, Bright Data's self-healing means our scraping pipeline won't break quietly in the background.

### How we built the scraper (Terminal Workflow)
To follow the hackathon rules and keep things developer-first, we did the entire scraper setup in the terminal.

First, we generated the scraper using a prompt:
```bash
npx -p @brightdata/cli bdata scraper create https://nextjs.org/docs "Extract the documentation title, markdown content, and all code blocks with their programming language."
```
This gave us our collector ID: `c_msxjxlwm78wlkksy4`.

We pull the data by triggering the endpoint:
```bash
npx -p @brightdata/cli bdata scraper run c_msxjxlwm78wlkksy4 https://nextjs.org/docs/app/building-your-application/upgrading/version-15 --pretty
```

The best part is the self-healing. If a site completely updates its CSS (which happens a lot with docs), we don't rewrite code. We just fix it from the terminal like this:
```bash
npx -p @brightdata/cli bdata scraper heal c_msxjxlwm78wlkksy4 "The main content container changed from div.docs to article.main-doc"
```

### Project Structure
- `/backend`: Express server that triggers the Bright Data `/dca/trigger` API, handles the vector search, and talks to the Gemini API.
- `/frontend`: A React + Vite dashboard where developers can chat with the RAG copilot and see exact citations.

### Tech Stack
- Frontend: React 18, Vite
- Backend: Node.js, Express
- AI/LLM: Google Gemini (gemini-flash-latest)
- Scraping: Bright Data Scraper Studio

Check out `HOW_TO_RUN.txt` if you want to spin this up locally on your machine!
