---
slug: binary-game
sort: 120
title: Binary Game
subtitle: Binary Conversion Puzzle
description: Browser puzzle for practicing decimal to binary conversion, with a tutorial, grids from 3 to 8 bits and a daily puzzle
tech: [{ name: 'Astro', icon: 'logos:astro-icon' }, { name: 'TypeScript', icon: 'logos:typescript-icon' }, { name: 'CSS', icon: 'logos:css-3' }]
link: https://binary.leonkohli.dev
repo: https://github.com/LeonKohli/binaryGame
image: /images/projects/binary-preview.png
category: education
tags: ['education', 'binary', 'game', 'learning', 'puzzle', 'interactive']
---

# Binary Game

I built this during my Fachinformatiker apprenticeship to prepare for binary conversion, which comes up again and again in the exams. I came across this kind of puzzle and wanted to see if I could build it myself, just as an experiment. It turned out to be fun, and playing it helped me more than another page of exercises.

## How it works

Each row and each column of the grid has a decimal target. You switch bits on until every row and every column adds up to its target.

1. Pick a grid size, from 3 bits (0–7) to 8 bits (0–255).
2. Tap a bit to switch it between 0 and 1.
3. Watch the running sum under each target until all of them turn green.

The place values run along the edges, so you always see what each bit is worth. If you get stuck, "Show solution" reveals the grid so you can read each row as a binary number.

After a few rounds you stop adding up 16 + 4 + 1 and just see 21. That was the whole point for me.

## What's in it

- A short tutorial that goes from one bit to a whole grid.
- A daily puzzle that is the same for everyone, with a streak you can share.
- English and German, keyboard play, and your best time per grid size.

It is a static Astro site on Cloudflare. The boards and the handwritten notes in the tutorial are rendered at build time, so nothing jumps around while the page loads.
