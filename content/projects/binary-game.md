---
slug: binary-game
sort: 8
title: Binary Game
subtitle: Interactive Binary Learning Tool
description: Browser puzzle where you convert decimal numbers to binary by toggling cells in a grid
tech: [{ name: 'HTML', icon: 'logos:html-5' }, { name: 'CSS', icon: 'logos:css-3' }, { name: 'JavaScript', icon: 'logos:javascript' }, { name: 'TailwindCSS', icon: 'logos:tailwindcss-icon' }]
link: https://leonkohli.github.io/binaryGame
repo: https://github.com/LeonKohli/binaryGame
image: /images/projects/binary-preview.png
category: education
tags: ['education', 'binary', 'game', 'learning', 'puzzle', 'glassmorphism', 'interactive']
---

# Binary Game

A browser-based puzzle where you convert decimal numbers to binary by toggling cells in a grid. I built it because binary conversion is one of those things that clicks way faster when you can play with it instead of reading about it.

## How It Works

You get a grid of 0s and 1s. Each row and column has a target decimal sum you need to match:

1. Pick a grid size (4x4, 5x5, or 6x6)
2. Click cells to flip between 0 and 1
3. Match the target decimal sum for each row and column
4. All rows and columns correct = you win

## Under the Hood

Binary-to-decimal conversion happens in real-time with visual feedback when you hit a target. Each puzzle is procedurally generated — random binary matrix, calculated decimal targets, guaranteed solvable.

The UI is glassmorphism-style with frosted-glass backdrops and color-coded binary states.

## Difficulty Levels

- **4x4** — 4-bit numbers (0-15), good starting point
- **5x5** — 5-bit numbers (0-31)
- **6x6** — 6-bit numbers (0-63), gets tricky

After a few rounds you start recognizing common binary values and converting in your head without thinking about it. That's the whole point.

There's a "Give Up" button that reveals the solution so you can study the pattern before trying again.

## Challenges

- Generating puzzles with unique solutions
- Balancing difficulty across grid sizes
- Getting touch interactions right on mobile
- Keeping performance smooth with larger grids