---
slug: markdown-editor
sort: 10
title: Markdown Editor
subtitle: Markdown Editor with Live Preview
description: Markdown editor with live preview, syntax highlighting, math rendering, and diagram support
tech: [
  { name: 'NuxtJS', icon: 'logos:nuxt-icon' },
  { name: 'Vue.js', icon: 'logos:vue' },
  { name: 'TypeScript', icon: 'logos:typescript-icon' },
  { name: 'TailwindCSS', icon: 'logos:tailwindcss-icon' },
  { name: 'Mermaid', icon: 'simple-icons:mermaid' }
]
link: https://md.leonkohli.dev
repo: https://github.com/LeonKohli/md-viewer
image: /images/projects/markdown-editor-preview.png
category: productivity
tags: ['markdown', 'editor', 'pwa', 'real-time', 'syntax-highlighting', 'developer-tools']
featured: true
status: active
complexity: 8
features: [
  'Live preview with real-time rendering',
  'Syntax highlighting for code blocks',
  'Dark mode with automatic theme detection',
  'Auto-save functionality',
  'PWA support for offline usage',
  'Extended markdown features (tables, footnotes, task lists)',
  'LaTeX math rendering with KaTeX',
  'Mermaid and PlantUML diagram support',
  'Auto-generated table of contents',
  'Synchronized scrolling between editor and preview',
  'Export as Markdown, HTML, or plain text',
  'Mobile responsive design'
]
---

# Markdown Editor

Split-pane markdown editor: write on the left, see the rendered result on the right. Supports math, diagrams, code highlighting, and all the extended markdown features I kept needing in other editors.

## Key Features

Tables, footnotes, task lists, LaTeX math (KaTeX), and Mermaid/PlantUML diagrams on top of standard markdown. Syntax highlighting for 100+ languages, one-click code copying, focus mode, auto-save, scroll sync, dark mode, and it works offline as a PWA.

## Technical Implementation

Built with Nuxt 3, Vue 3 Composition API, and TypeScript. Uses markdown-it for processing, KaTeX for math, Mermaid for diagrams, shadcn-vue for UI, and TailwindCSS for styling.

## Performance

- Lazy loading for heavy dependencies
- Debounced preview updates
- Vue reactivity for efficient DOM updates
- Service worker for offline use

## Use Cases

Works well for technical docs, academic writing with math formulas, project planning with task lists and diagrams, blog posts, or just quick notes.