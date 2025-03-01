---
id: ip-atlas
sort: 9
title: IP-Atlas
subtitle: IP Address Management Tool 
description: A Flask application for the efficient management and organization of IP addresses in large networks through octet sorting
tech: [{ name: 'Flask', icon: 'simple-icons:flask' }, { name: 'SQLite', icon: 'simple-icons:sqlite' }, { name: 'HTML', icon: 'logos:html-5' }, { name: 'JavaScript', icon: 'logos:javascript' }, { name: 'TailwindCSS', icon: 'logos:tailwindcss-icon' }, { name: 'Python', icon: 'logos:python' }]
repo: https://github.com/ZIT-P22/IP-Atlas
image: /images/projects/ipatlas-preview.png
tags: ['network-management', 'ipam', 'flask', 'utility', 'administration', 'octet-sorting', 'data-center']
--- 

# IP-Atlas: Network Management Made Simple

While managing a trainee data center, we faced the challenge of keeping track of IP address assignments across dozens of devices and subnets. Commercial IPAM (IP Address Management) tools were expensive and often overly complex for our needs.

## Features

IP-Atlas provides a straightforward approach to IP management with:

- Device tracking with hostname, MAC address, and location data
- Search functionality to quickly locate devices
- Octet sorting for maintaining organization
- User-friendly interface tailored for network administrators

## Octet Sorting System

The core innovation of IP-Atlas is its octet-based organization system. Unlike traditional IPAM tools that list IP addresses sequentially, our approach:

- Groups IP addresses by their octets (the four number groups in an IPv4 address)
- Creates a hierarchical view that mirrors the logical network structure
- Makes it easier to identify available address blocks
- Provides immediate visual feedback on subnet utilization
- Simplifies the management of CIDR notation and subnet masks

This sorting method is particularly valuable in educational environments where network configurations change frequently.

## Key Benefits

The application offers several advantages for network management:
- Simplified IP address inventory management
- Clear visualization of network structure
- Easy assignment and tracking of IP addresses
- Efficient organization through octet sorting

## Development Experience

This project was built collaboratively with a small team of trainees using Flask and SQLite for the backend, with a TailwindCSS frontend. We focused on creating a clean, intuitive interface that would be accessible to network administrators of all skill levels.