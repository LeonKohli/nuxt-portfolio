---
slug: moses
sort: 5
title: MOSES
subtitle: Outlook VBA Module
description: An Outlook VBA module to shift emails into servity itsm via API
tech: [{ name: 'VBA', icon: 'vscode-icons:file-type-vba' }]
image: /images/projects/moses-preview.png
tags: ['internal', 'automation', 'outlook', 'itsm', 'productivity']
--- 

# MOSES: Mail to Ticket Automation

As an internal project, I developed a solution when our IT department transitioned to a new Service Management system. We needed a way to efficiently convert incoming support emails into tickets without the tedious manual copy-pasting that was slowing down our team.

## The Solution

I created MOSES (Mail Outlook Service Entry System), a VBA module for Microsoft Outlook that:

- Adds a custom ribbon button to the Outlook interface
- Extracts email content, attachments, and metadata
- Communicates with our internal ITSM API to create tickets
- Maintains email threading for ongoing conversations
- Provides status feedback to the user

## Impact on Workflow

This internal tool transformed our support process, reducing the average time to process an email ticket from 3-4 minutes to under 30 seconds. With our team handling 50+ support emails daily, this saved approximately 2-3 hours of collective work each day.

Despite being built with the often-maligned VBA, the module has proven remarkably stable and has been in continuous use throughout our department for over a year with minimal maintenance required.