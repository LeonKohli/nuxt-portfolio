---
slug: chatgpt-preview
sort: 4
title: ChatGPT HTML Web View
subtitle: ChatGPT Browser Extension
description: Browser extension that adds a live HTML/CSS/JS preview button inside ChatGPT
tech: [{ name: 'JavaScript', icon: 'logos:javascript' }, { name: 'HTML', icon: 'logos:html-5' }, { name: 'CSS', icon: 'logos:css-3' }]
category: developer-tools
tags: ['developer-tools', 'chatgpt', 'browser-extension', 'html', 'preview', 'productivity', 'code-rendering']
link: https://gptview.leonkohli.dev/
repo: https://github.com/LeonKohli/ChatGPT-HTML-Web-View
image: /images/projects/chatgpt-preview.png
browsers: ['Chrome', 'Firefox']
--- 

# ChatGPT HTML Web View

I use ChatGPT a lot for HTML, and I got tired of copying code into separate files just to see how it renders.

## How It Works

The extension adds a "Preview" button in the ChatGPT interface whenever it detects HTML. One click and you can:

1. See the rendered HTML in a popup window
2. Test JavaScript functionality
3. View CSS styling as intended
4. Make quick edits and see changes in real-time

The preview updates automatically as the code changes in ChatGPT, so no more copy-paste-refresh cycles.

## Development

Built with vanilla JavaScript to keep it small. The tricky part was parsing and sanitizing HTML from ChatGPT's responses without breaking functionality — it detects code blocks, validates the HTML, and renders it in a sandboxed iframe.

Also has CodePen export and an adjustable preview window.

## Installation

Available for Chrome and Firefox:

- **Chrome**: Install from the [Chrome Web Store](https://chromewebstore.google.com/detail/chatgpt-web-preview/didmdeafjnnkgjkfalkkdhmgoajjnpom)
- **Firefox**: Available in the Firefox Add-ons repository

After installing, just open ChatGPT and start writing HTML. The preview button shows up automatically.

Hundreds of installs on both Chrome and Firefox.