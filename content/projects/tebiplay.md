---
slug: tebiplay
sort: 6
title: TebiPlay
subtitle: LAN Party Management System
description: Score tracking and team management for our annual trainee LAN party
tech: [{ name: 'NuxtJS', icon: 'logos:nuxt-icon' }, { name: 'JavaScript', icon: 'logos:javascript' }, { name: 'Flask', icon: 'simple-icons:flask' }, { name: 'Docker', icon: 'logos:docker-icon' }, { name: 'PostgreSQL', icon: 'logos:postgresql' }, { name: 'TailwindCSS', icon: 'logos:tailwindcss-icon' }]
link: https://tebiplay.zitau.de
repo: https://github.com/ZIT-P22/TebiPlay
image: /images/projects/tebiplay-preview.png
--- 

# TebiPlay: Making LAN Parties Competitive

We organize an annual LAN party for our trainee team-building event. Once the event got big enough, tracking scores on paper stopped working.

## What It Does

TebiPlay handles the logistics of a gaming event:

- Team registration and management
- Game scheduling with automatic notifications
- Real-time scoreboard with team rankings
- Match history and statistics tracking
- Admin panel for tournament organizers
- Mobile-friendly interface for participants

## Technical Architecture

The system uses a Nuxt.js frontend with a Flask API backend, all containerized with Docker for easy deployment. PostgreSQL handles the database needs, storing team information, match results, and tournament brackets.