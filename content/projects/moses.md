---
slug: moses
sort: 5
title: MOSES
subtitle: Outlook VBA Module
description: Outlook VBA module that turns support emails into ITSM tickets with one click
tech: [{ name: 'VBA', icon: 'vscode-icons:file-type-vba' }]
image: /images/projects/moses-preview.png
tags: ['internal', 'automation', 'outlook', 'itsm', 'productivity']
--- 

# MOSES: Mail to Ticket Automation

When our IT department switched to a new Service Management system, converting support emails into tickets meant a lot of manual copy-pasting. That got old fast.

## The Solution

I created MOSES (Mail Outlook Service Entry System), a VBA module for Microsoft Outlook that:

- Adds a custom ribbon button to the Outlook interface
- Extracts email content, attachments, and metadata
- Communicates with our internal ITSM API to create tickets
- Maintains email threading for ongoing conversations
- Provides status feedback to the user

## Results

Ticket processing went from 3-4 minutes per email down to under 30 seconds. With 50+ support emails a day, that's about 2-3 hours saved across the team daily.

Despite being built with the often-maligned VBA, the module has been running stable in our department for over a year with barely any maintenance.