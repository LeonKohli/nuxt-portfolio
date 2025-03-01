---
id: repolingo
sort: 4
title: RepoLingo
subtitle: GitHub to LLM Data Converter
description: Turn any GitHub Repository into structured XML data optimized for large language models
tech: [{ name: 'NuxtJS', icon: 'logos:nuxt-icon' }, { name: 'TailwindCSS', icon: 'logos:tailwindcss-icon' }, { name: 'TypeScript', icon: 'logos:typescript-icon' }, { name: 'Vue.js', icon: 'logos:vue' }, { name: 'Octokit', icon: 'simple-icons:github' }]
link: https://repolingo.leonkohli.dev
repo: https://github.com/LeonKohli/RepoLingo
image: /images/projects/repolingo-preview.png
category: developer-tools
tags: ['ai-tools', 'github', 'code-analysis', 'llm', 'xml', 'data-conversion']
--- 

# RepoLingo: Making Code Repositories LLM-Friendly

When working with large language models (LLMs) like GPT-4, I often needed to reference code from GitHub repositories. However, raw repository data isn't optimized for LLM consumption - it contains too much noise and lacks the right structure.

## What RepoLingo Does

RepoLingo is a web application that:

- Fetches any public GitHub repository
- Analyzes the codebase structure
- Filters out non-essential files (like node_modules, build artifacts)
- Formats the code with proper context and relationships
- Outputs LLM-optimized XML data that preserves important code context

## Technical Implementation

Built with Nuxt.js 3, Vue.js 3, and TypeScript, the application uses Octokit (GitHub API client) to access repositories and implements intelligent parsing algorithms to determine which files are most relevant to understanding the codebase. Additional technologies include:

- highlight.js for code syntax highlighting
- gpt-tokenizer for token counting and optimization
- Tailwind CSS for responsive design

## Customization Options

Users can tailor the output to their specific needs:
- Customize ignore patterns to exclude irrelevant files
- Select branch and file size limits
- Include or exclude tree structure
- Copy or download the generated XML

## Target Audience

The tool has become particularly useful for:
- AI companies needing LLM-ready code data for training models
- Researchers analyzing code patterns across repositories
- Developers seeking to provide comprehensive context to AI assistants
- Data scientists preparing code datasets for analysis

## XML Output Format

The structured XML format preserves critical information about the codebase:
- File hierarchies and relationships
- Code content with proper syntax formatting
- Directory structures and organization
- Import/export relationships between files
- Metadata about file types and sizes

```xml
<?xml version="1.0" encoding="UTF-8"?>
<llm_context>
  <repository>
    <metadata>
      <name>LeonKohli/LeonKohli</name>
      <description>Repository contents for LLM context</description>
      <fetch_date>2025-03-01T22:45:40.499Z</fetch_date>
      <branch>main</branch>
    </metadata>
    <contents>
      <directory name=".github" path=".github">
        <directory name="workflows" path=".github/workflows">
          <file name="joke.yml" path=".github/workflows/joke.yml">
            <content>
              ...
            </content>
          </file>    
        </directory>
      </directory>
      <file name="README.md" path="README.md">
        <content>
        ...
        </content>
      </file>
    </contents>
  </repository>
</llm_context>
```

This structured approach is especially effective when working with token limitations in LLM interfaces, as it prioritizes the most relevant code while maintaining context. 