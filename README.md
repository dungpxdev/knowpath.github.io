# Knowpath User Guide (knowpath.github.io)

This repository contains the official, single-page getting started user guide for **Knowpath** (`https://knowpath.github.io/`), an AI-powered technical interview MCP platform.

## Features

- **Single-Page Architecture**: High-speed, zero-dependency, responsive single-page guide.
- **Section 1: Connect Knowpath to ChatGPT**: Step-by-step instructions to configure MCP Server-Sent Events (SSE) in ChatGPT, Claude Desktop, Cursor, and other MCP clients.
- **Section 2: Practice & Learn Workflow**: 4-step continuous practice cycle covering mode selection (`SINGLE_TOPIC` vs `COMPLEX_MULTI_TOPIC`), question preloading, rubric scoring (1–10 AI evaluation, 1–5 confidence), and automated feedback.
- **Section 3: Track Learning Progress**: Detailed guide on reviewing session histories, identifying weaknesses (`Needs Improvement` vs `Critical Attention`), and triggering targeted retakes with `knowledge_gap_only = true`.
- **MCP Tool Reference**: Complete reference table of registered Knowpath MCP tools.
- **Design & Interactivity**:
  - Consistent with the Knowpath Astryx design tokens.
  - Dark and Light mode toggle with persistent local preference.
  - Interactive one-click copy buttons for endpoints, configs, and prompts.
  - Tabbed configuration switchers.
  - Clean inline SVG architecture diagrams and practice loops.

## Endpoints

- **Live Web App**: [https://bloomcommerce.space](https://bloomcommerce.space)
- **MCP SSE Endpoint**: `https://bloomcommerce.space/mcp/sse`
- **MCP Message Endpoint**: `https://bloomcommerce.space/mcp/message`

## Local Development

Run any static HTTP server from the repository root:

```bash
# Python
python3 -m http.server 8000

# Node.js
npx serve .
```

Open `http://localhost:8000` in your browser.
