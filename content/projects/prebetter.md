---
slug: prebetter
sort: 30
status: active
title: Prebetter
subtitle: Prelude IDS Dashboard
description: Web dashboard that makes browsing and analyzing Prelude IDS security alerts actually usable
tech: [{ name: 'Nuxt', icon: 'logos:nuxt-icon' }, { name: 'Vue.js', icon: 'logos:vue' }, { name: 'TypeScript', icon: 'logos:typescript-icon' }, { name: 'FastAPI', icon: 'simple-icons:fastapi' }, { name: 'Python', icon: 'logos:python' }, { name: 'TailwindCSS', icon: 'logos:tailwindcss-icon' }, { name: 'MySQL', icon: 'logos:mysql-icon' }]
category: security
tags: ['security', 'dashboard', 'intrusion-detection', 'monitoring', 'data-visualization']
startDate: 2024-12
repo: https://github.com/LeonKohli/prebetter
image: /images/projects/prebetter-preview.png
---

# Prebetter

I built this as my final project for my Fachinformatiker exam. Prelude IDS catches threats just fine, but the tools it ships for reviewing alerts are rough. Clicking through clunky interfaces to answer basic questions about your network got old fast, so I built a proper dashboard.

## What It Does

Prebetter reads directly from Prelude's MySQL database and gives you a web UI on top. Filter alerts by severity, classification, source IP, date range. Group by IP pairs to spot who's talking to whom. Check which monitoring agents are still alive and which dropped off. Pull CSV exports when you need the raw data.

## How It's Built

I started with the FastAPI backend — a REST API with a read-only connection to Prelude's database, plus a separate MySQL database for user management. JWT auth with superuser and regular user roles. Later I built the full frontend in Nuxt 4 with shadcn-vue and Tailwind.
