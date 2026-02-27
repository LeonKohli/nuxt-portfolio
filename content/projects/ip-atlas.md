---
slug: ip-atlas
sort: 9
title: IP-Atlas
subtitle: IP Address Management Tool 
description: Simple IP address management tool with octet-based sorting, built for our trainee data center
tech: [{ name: 'Flask', icon: 'simple-icons:flask' }, { name: 'SQLite', icon: 'simple-icons:sqlite' }, { name: 'HTML', icon: 'logos:html-5' }, { name: 'JavaScript', icon: 'logos:javascript' }, { name: 'TailwindCSS', icon: 'logos:tailwindcss-icon' }, { name: 'Python', icon: 'logos:python' }]
repo: https://github.com/ZIT-P22/IP-Atlas
image: /images/projects/ipatlas-preview.png
tags: ['network-management', 'ipam', 'flask', 'utility', 'administration', 'octet-sorting', 'data-center']
--- 

# IP-Atlas: Network Management Made Simple

Managing IP addresses across dozens of devices in our trainee data center was a mess. Commercial IPAM tools were either expensive or way too complex for what we needed.

## Features

- Device tracking (hostname, MAC address, location)
- Search to quickly find devices
- Octet-based sorting
- Clean interface for network admins

## Octet Sorting

Instead of listing IPs sequentially like most IPAM tools, IP-Atlas groups them by octets. This gives you a hierarchical view that actually mirrors how your network is structured, so you can spot available address blocks at a glance and see how full each subnet is. Works especially well in training environments where things get reconfigured constantly.

## Development

Built with a small team of trainees using Flask and SQLite for the backend, TailwindCSS for the frontend. We kept the interface simple so anyone managing a network could pick it up without training.