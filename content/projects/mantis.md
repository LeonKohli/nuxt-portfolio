---
slug: mantis
sort: 1
status: in-progress
title: Gottesanbeterin gesucht
subtitle: Citizen Science Platform
description: Mantis Religiosa sightings report app with over 14,000 individual sightings.
tech: [{ name: 'Flask', icon: 'simple-icons:flask' }, { name: 'PostgreSQL', icon: 'logos:postgresql' }, { name: 'HTML', icon: 'logos:html-5' }, { name: 'JavaScript', icon: 'logos:javascript' }, { name: 'TailwindCSS', icon: 'logos:tailwindcss-icon' }, { name: 'Jinja2', icon: 'simple-icons:jinja' }, { name: 'Python', icon: 'logos:python' }]
category: web
tags: ['science', 'data-collection', 'public-service', 'map', 'citizen-science', 'ecology', 'climate-change']
startDate: 2023-03
link: https://gottesanbeterin-gesucht.de
repo: https://github.com/opendata-apps/mantis
image: /images/projects/mantis-preview.png
--- 

# Gottesanbeterin gesucht

This citizen science project tracks the northward expansion of the European Mantis (Mantis religiosa) across Brandenburg, Germany. Climate change is pushing their habitat further north, and we're documenting it in collaboration with the Naturkundemuseum Potsdam.

![Mantis](https://gottesanbeterin-gesucht.de/static/images/mantis--maennchen__krueger.webp)

## Numbers

14,000+ sightings since March 2023. Each report includes location, photos, and observation details. Researchers use the data to track how the population is shifting north.

## Technical Implementation

The platform uses a Flask backend with PostgreSQL for data storage, making it easy to:

- Submit sightings with photos and GPS coordinates
- Visualize all reports on an interactive map
- Filter sightings by date, location, and observer
- Generate data exports for scientific analysis
- Access statistics and FAQs about the European Mantis
