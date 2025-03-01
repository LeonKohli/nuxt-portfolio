---
id: copy4ai
sort: 3
title: Copy4AI
subtitle: Code Extension for LLM Integration
description: A Visual Studio Code extension for copying project context to AI models
tech: [{ name: 'JavaScript', icon: 'logos:javascript' }, { name: 'VS Code API', icon: 'logos:visual-studio-code' }, { name: 'Node.js', icon: 'logos:nodejs-icon' }]
category: developer-tools
tags: ['vscode-extension', 'ai-tools', 'productivity', 'code-sharing', 'llm', 'context-preservation']
link: https://copy4ai.dev
repo: https://github.com/LeonKohli/copy4ai
image: /images/projects/snapsource-preview.png
downloads: 1000+
--- 

# Copy4AI: Better Context for AI Coding Assistants

When working with AI coding assistants like ChatGPT or Claude, I noticed a common problem: sharing individual code snippets without project context often led to suboptimal AI responses. This extension solves that problem.

## What It Does

Copy4AI lets VS Code users:

- Copy entire directories with their structure intact
- Select specific files and folders to include
- Format the output in ways that are optimized for different AI models
- Preserve important context like import relationships and file hierarchy

## Advanced Features

The extension offers sophisticated capabilities:
- Ignores dot files and respects `.gitignore` rules
- Provides plaintext, markdown, and XML output formats
- Uses asynchronous processing for speed with large codebases
- Includes options for project tree inclusion/exclusion
- Offers code compression and comment removal
- Provides token counting for various LLMs
- Excludes binary files automatically

## How It Works

Users select files or folders in VS Code, right-click, and choose "Copy to Clipboard (Copy4AI)" or "Copy Project Structure (Copy4AI)". The extension processes the selection according to user preferences and places the formatted content on the clipboard, ready to paste into an AI assistant.

## Security and Performance

The extension prioritizes security and performance:
- Automatically excludes sensitive files (like .env)
- Detects and skips binary files to prevent corruption
- Processes files asynchronously for better performance
- Implements configurable file size limits to prevent oversized outputs

## Output Formats

The extension supports three output formats:
1. **Plaintext**: Simple text with clear section divisions
2. **Markdown**: Formatted with code blocks and syntax highlighting
3. **XML**: Structured format with explicit file relationships