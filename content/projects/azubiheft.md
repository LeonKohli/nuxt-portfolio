---
id: azubiheft
sort: 7
title: Azubiheft API
subtitle: Python Wrapper for Training Report Management
description: Python wrapper for azubiheft.de that automates the management of apprenticeship training reports
tech: [{ name: 'Python', icon: 'logos:python' }, { name: 'BeautifulSoup', icon: 'simple-icons:python' }, { name: 'Requests', icon: 'simple-icons:python' }]
repo: https://github.com/LeonKohli/azubiheft-api
link: https://pypi.org/project/azubiheft
image: /images/projects/azubiheft-preview.png
tags: ['automation', 'api-wrapper', 'education', 'productivity', 'python', 'training-documentation']
--- 

# Azubiheft API

During my time supervising German vocational trainees (Azubis), I found myself spending hours each week manually filling out digital training reports on azubiheft.de. This repetitive task seemed perfect for automation.

## The Solution

I developed a Python wrapper for the azubiheft.de platform that allows users to:

- Programmatically create and submit weekly training reports
- Copy reports between trainees when they perform similar work
- Export data for record-keeping and analysis
- Batch update multiple reports at once
- Add new subjects and categories
- Retrieve reports by date
- Write new report entries with formatting options

## Implementation Details

The library uses requests and BeautifulSoup to interact with the azubiheft.de web interface, essentially creating a programmatic API where none existed before. Authentication is handled securely, and the package is available on PyPI for easy installation.

## Key Functions

The API provides a comprehensive set of functions:
- `login(username, password)`: Authenticate with the platform
- `getSubjects()`: Retrieve available training subjects
- `add_subject(name)`: Create a new subject category
- `delete_subject(id)`: Remove an existing subject
- `getReport(date)`: Fetch a report for a specific date
- `getReportWeekId(date)`: Get the week identifier for a date
- `writeReport(date, text, hours, subject_id)`: Create or update a report
- `deleteReport(date)`: Remove a report entry

## How It Works

Users log in with their azubiheft credentials through the API, then use a set of intuitive functions to interact with their training data. The wrapper handles all the web requests and form submissions behind the scenes, providing a clean Python interface to what would otherwise be manual web form interactions.

## Text Formatting

The API supports formatted text in reports, allowing users to:
- Use newline characters (`\n`) for paragraph breaks
- Include multi-line text using Python's triple-quote syntax
- Preserve formatting when retrieving reports with the `include_formatting=True` parameter

## Impact

This tool has saved me several hours each week and is now used by other trainers in my organization who supervise multiple trainees. It's particularly valuable for educational institutions and companies with large numbers of apprentices, where the time savings can be substantial.

## Example on how to use the API to copy reports between trainees

```python
from azubiheftApi import azubiheftApi
from datetime import datetime

# Setup accounts
source = azubiheftApi.Session()
target = azubiheftApi.Session()
date = datetime(2024, 2, 15)  # Report date to copy

# Copy process
source.login("source_user", "source_pass")
reports = source.getReport(date, include_formatting=True)
source.logout()

target.login("target_user", "target_pass")
for r in reports:
    target.writeReport(
        date=date,
        message=r["text"],
        time_spent=r["duration"],
        entry_type=int(target.get_art_id_from_text(r["type"]))
    )
target.logout()
```