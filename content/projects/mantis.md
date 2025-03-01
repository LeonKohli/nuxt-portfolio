---
id: mantis
sort: 1
status: in-progress
title: Gottesanbeterin gesucht
subtitle: Public Science Project
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

This citizen science project tracks the northward expansion of the European Mantis (Mantis religiosa) across Brandenburg, Germany. Climate change has allowed these fascinating insects to expand their habitat, and we're documenting this ecological shift in real-time through a collaborative effort with the Naturkundemuseum Potsdam.

![Mantis](https://gottesanbeterin-gesucht.de/static/images/mantis--maennchen__krueger.webp)

## The Project's Impact

Since launching in March 2023, we've collected over 14,000 individual sightings from citizen scientists. Each report includes location data, photos, and observation details that help researchers understand the mantis population's movement patterns. The project has been featured in regional media and has become a valuable resource for entomologists studying insect adaptation to climate change.

## Technical Implementation

The platform uses a Flask backend with PostgreSQL for data storage, making it easy to:

- Submit sightings with photos and GPS coordinates
- Visualize all reports on an interactive map
- Filter sightings by date, location, and observer
- Generate data exports for scientific analysis
- Access statistics and FAQs about the European Mantis

## User Experience

The application features a visually appealing UI designed to be accessible to users of all ages and technical backgrounds. The intuitive reporting form encourages participation while ensuring data quality through guided inputs and validation.

## Development Process

The project is actively maintained with multiple development branches focusing on different aspects:
- Enhanced admin functionality
- Improved data visualization
- Photo gallery integration
- Pagination and filtering capabilities
- User administration features

The codebase follows a structured approach with version control through Git and has gone through multiple releases, currently at version 0.13.5, showing continuous improvement and feature additions.

## Future Development

Planned enhancements include:
- A comprehensive photo gallery of verified sightings
- Improved data visualization tools
- Enhanced user interface and experience
- Expanded educational resources about the species
- More efficient administrative tools for managing the growing dataset
