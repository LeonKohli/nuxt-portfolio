---
slug: azubiheft
sort: 7
title: Azubiheft API
subtitle: Python Wrapper for azubiheft.de
description: Python wrapper for azubiheft.de that automates filling out apprenticeship training reports
tech: [{ name: 'Python', icon: 'logos:python' }, { name: 'BeautifulSoup', icon: 'simple-icons:python' }, { name: 'Requests', icon: 'simple-icons:python' }]
repo: https://github.com/LeonKohli/azubiheft-api
link: https://pypi.org/project/azubiheftApi/
image: /images/projects/azubiheft-preview.png
tags: ['automation', 'api-wrapper', 'education', 'productivity', 'python', 'training-documentation']
--- 

# Azubiheft API

When I was supervising German vocational trainees (Azubis), I was spending hours every week manually filling out training reports on azubiheft.de. So I automated it.

## What It Does

Python wrapper for azubiheft.de. You can:

- Programmatically create and submit weekly training reports
- Copy reports between trainees when they perform similar work
- Export data for record-keeping and analysis
- Batch update multiple reports at once
- Add new subjects and categories
- Retrieve reports by date
- Write new report entries with formatting options

## Implementation Details

Under the hood it's requests + BeautifulSoup scraping the azubiheft.de web interface, since there's no official API. Available on PyPI.

## Key Functions

The main API methods:
- `login(username, password)`: Authenticate with the platform
- `getSubjects()`: Retrieve available training subjects
- `add_subject(name)`: Create a new subject category
- `delete_subject(id)`: Remove an existing subject
- `getReport(date)`: Fetch a report for a specific date
- `getReportWeekId(date)`: Get the week identifier for a date
- `writeReport(date, text, hours, subject_id)`: Create or update a report
- `deleteReport(date)`: Remove a report entry

## Text Formatting

Reports support formatted text — newlines with `\n`, multi-line strings with triple quotes, and `include_formatting=True` to preserve formatting when reading reports back.

## Impact

Saves me several hours a week. Other trainers in my organization who supervise multiple trainees have picked it up too, since the time adds up fast when you're filling out reports for a dozen Azubis.

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