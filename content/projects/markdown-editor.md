---
slug: markdown-editor
sort: 10
title: Markdown Editor
subtitle: Modern Markdown Editor with Live Preview
description: A feature-rich markdown editor with real-time preview, syntax highlighting, and seamless editing in a beautiful, responsive interface
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

A modern, feature-rich markdown editor with live preview, built with Nuxt 3 and Vue 3. Experience real-time rendering, syntax highlighting, and seamless editing in a beautiful, responsive interface.

## Overview

This markdown editor provides a comprehensive writing environment for developers, writers, and content creators. With its intuitive interface and powerful features, you can focus on writing while the editor handles formatting and presentation.

## Key Features

### Real-Time Preview
The split-pane interface shows your markdown on the left and the rendered output on the right, updating instantly as you type. This immediate feedback helps you see exactly how your content will appear.

### Extended Markdown Support
Beyond standard markdown, the editor supports:
- Tables with proper alignment
- Footnotes for additional context
- Task lists for project management
- Code blocks with syntax highlighting
- Math equations using LaTeX syntax
- Diagrams using Mermaid and PlantUML

### Developer-Friendly
- **Syntax Highlighting**: Over 100 programming languages supported
- **Smart Copy**: One-click code block copying with automatic clipboard formatting
- **Export Options**: Download your work as Markdown, HTML, or plain text
- **PWA Support**: Install as a desktop app and use offline

### Writing Experience
- **Focus Mode**: Distraction-free writing environment
- **Auto-Save**: Never lose your work with intelligent auto-saving
- **Scroll Sync**: Synchronized scrolling between editor and preview panes
- **Dark Mode**: Easy on the eyes with automatic theme detection

## Technical Implementation

The editor is built using modern web technologies:
- **Nuxt 3** for the application framework
- **Vue 3** Composition API for reactive components
- **TypeScript** for type safety
- **markdown-it** for markdown processing
- **KaTeX** for math rendering
- **Mermaid** for diagram generation
- **shadcn-vue** for UI components
- **TailwindCSS** for styling

## Performance

The application is optimized for performance with:
- Lazy loading of heavy dependencies
- Debounced preview updates
- Efficient DOM updates using Vue's reactivity
- Service worker for offline functionality

## Use Cases

- **Technical Documentation**: Write documentation with code examples and diagrams
- **Academic Writing**: Include mathematical formulas and references
- **Project Planning**: Use task lists and diagrams for project management
- **Blog Writing**: Create content with rich formatting
- **Note Taking**: Quick notes with powerful formatting options