---
id: moses
sort: 5
title: MOSES
subtitle: Outlook VBA Module
description: An Outlook VBA module to shift emails into servity itsm via API
tech: [{ name: 'VBA', icon: 'vscode-icons:file-type-vba' }]
repo: https://github.com/LeonKohli/MOSES
image: /images/projects/moses-preview.png
--- 

# MOSES: Mail to Ticket Automation

When my company transitioned to a new IT Service Management system, we faced a challenge: how to efficiently convert incoming support emails into tickets in the new system. The existing workflow required manual copy-pasting, which was time-consuming and error-prone.

## The Solution

I developed MOSES (Mail Outlook Service Entry System), a VBA module for Microsoft Outlook that:

- Adds a custom ribbon button to the Outlook interface
- Extracts email content, attachments, and metadata
- Communicates with the ITSM API to create tickets
- Maintains email threading for ongoing conversations
- Provides status feedback to the user

## Impact on Workflow

This tool reduced the average time to process an email ticket from 3-4 minutes to under 30 seconds. For our team handling 50+ support emails daily, this saved approximately 2-3 hours of collective work each day.

Despite being built with the often-maligned VBA, the module has proven remarkably stable and has been in continuous use for over a year with minimal maintenance required. 