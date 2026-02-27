---
slug: trackme
sort: 2
status: active
title: TrackMe
subtitle: Browser Fingerprinting Demo
description: See exactly how your browser can be fingerprinted and tracked without cookies.
problem: Most people don't realize their browser leaks enough data to identify them without any cookies at all.
solution: TrackMe shows you exactly what your browser gives away, running 20+ fingerprinting techniques right in front of you so you can see for yourself.
tech: [{ name: 'NuxtJS', icon: 'logos:nuxt-icon' }, { name: 'Vue.js', icon: 'logos:vue' }, { name: 'TypeScript', icon: 'logos:typescript-icon' }, { name: 'TailwindCSS', icon: 'logos:tailwindcss-icon' }, { name: 'Shadcn-vue', icon: 'simple-icons:shadcnui' }]
category: privacy
tags: ['privacy', 'research', 'browser-security', 'fingerprinting', 'education', 'digital-identity', 'tracking-prevention']
link: https://trackme.dev
repo: https://github.com/LeonKohli/browser-fingerprint
image: /images/projects/trackme-preview.jpg
--- 

# TrackMe

Your browser leaks enough info to build a unique fingerprint that follows you across the web — no cookies needed. TrackMe runs 20+ fingerprinting techniques in real-time so you can see exactly what's exposed:

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

You get a uniqueness score at the end. Higher = easier to track. Everything runs client-side, nothing is stored or sent anywhere.

The site also explains how each method works and what you can do to reduce your fingerprint.

![TrackMe](images/projects/demo/browser.png)

## Why I Built It

I think most people have no idea how trackable they are without cookies. Showing them their own fingerprint data makes it real in a way that reading about it doesn't.

A few university courses on web security have picked it up as a teaching tool, which is cool.
