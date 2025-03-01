---
id: tebiplay
sort: 6
title: TebiPlay
subtitle: LAN Party Management System
description: Game Rating Management System for LAN Events
tech: [{ name: 'NuxtJS', icon: 'logos:nuxt-icon' }, { name: 'JavaScript', icon: 'logos:javascript' }, { name: 'Flask', icon: 'simple-icons:flask' }, { name: 'Docker', icon: 'logos:docker-icon' }, { name: 'PostgreSQL', icon: 'logos:postgresql' }, { name: 'TailwindCSS', icon: 'logos:tailwindcss-icon' }]
link: https://tebiplay.de
repo: https://github.com/ZIT-P22/TebiPlay
image: /images/projects/tebiplay-preview.png
--- 

# TebiPlay: Making LAN Parties Competitive

For our annual trainee team-building event, we organize a day-long LAN party with various competitive games. As the event grew larger each year, we needed a better way to track scores, manage teams, and keep everyone engaged throughout the day.

## System Features

TebiPlay provides a complete management solution for gaming events:

- Team registration and management
- Game scheduling with automatic notifications
- Real-time scoreboard with team rankings
- Match history and statistics tracking
- Admin panel for tournament organizers
- Mobile-friendly interface for participants

## Technical Architecture

The system uses a Nuxt.js frontend with a Flask API backend, all containerized with Docker for easy deployment. PostgreSQL handles the database needs, storing team information, match results, and tournament brackets.