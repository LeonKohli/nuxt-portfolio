---
id: trackme
sort: 2
status: active
title: TrackMe
subtitle: Browser Fingerprint Research Project
description: A tool demonstrating browser fingerprinting techniques.
problem: Most internet users are unaware of how extensively they can be tracked online without cookies through browser fingerprinting techniques, creating serious privacy concerns.
solution: TrackMe provides an educational platform that demonstrates real-time browser fingerprinting techniques, helping users understand their digital footprint and how to protect their privacy.
tech: [{ name: 'NuxtJS', icon: 'logos:nuxt-icon' }, { name: 'Vue.js', icon: 'logos:vue' }, { name: 'TypeScript', icon: 'logos:typescript-icon' }, { name: 'TailwindCSS', icon: 'logos:tailwindcss-icon' }, { name: 'Shadcn-vue', icon: 'simple-icons:shadcnui' }]
category: privacy
tags: ['privacy', 'research', 'browser-security', 'fingerprinting', 'education', 'digital-identity', 'tracking-prevention']
link: https://trackme.dev
repo: https://github.com/LeonKohli/browser-fingerprint
image: /images/projects/trackme-preview.jpg
--- 

# TrackMe: Browser Fingerprinting Demystified

TrackMe started as a research project to help people understand how they can be tracked online without cookies. Most internet users don't realize that their browsers leak enough information to create a unique "fingerprint" that can follow them across the web.

## What It Does

The tool demonstrates over 20 different fingerprinting techniques in real-time, including:

- Canvas fingerprinting
- WebGL rendering differences
- Font detection
- Hardware information leakage
- Browser plugin enumeration
- Browser information (name, version, engine)
- System details (OS, platform, timezone)
- Media capabilities (supported formats, codecs)
- Network analysis (connection type, IP information)
- Security features (content blockers, privacy settings)

Each visitor receives a uniqueness score showing how identifiable their browser configuration is among all visitors. The more unique your fingerprint, the easier you are to track.

## Technical Implementation

Built with modern web technologies:
- Nuxt.js 3 and Vue.js 3 for the frontend framework
- TypeScript for type safety
- Tailwind CSS for responsive design
- Shadcn-vue for UI components
- Various browser APIs to collect fingerprinting data

## Privacy First

This project was created with education in mind:
- No user data is stored or transmitted
- All analysis happens client-side
- Clear explanations of each fingerprinting technique
- Recommendations for enhancing privacy

## Entropy Calculation

The application calculates an entropy score that indicates how unique your browser signature is among the general population. This score is derived from:
- The rarity of each browser characteristic
- The combination of multiple fingerprinting vectors
- Statistical models of browser feature distribution

Higher entropy scores indicate a more unique fingerprint, making you more susceptible to tracking.

## Educational Resources

Beyond the interactive demonstrations, TrackMe provides:
- Detailed explanations of how each tracking method works
- The technical background of fingerprinting techniques
- Practical tips for reducing your browser's uniqueness
- Links to privacy-enhancing tools and resources
- References to academic research on fingerprinting

![TrackMe](images/projects/demo/browser.png)

## Why I Built It

Privacy education is important to me. By showing people exactly how they're being tracked, I hope to raise awareness about digital privacy and give users the knowledge they need to protect themselves online.

The project has been used in university courses on web security and has helped thousands of visitors understand their digital footprint better. 
