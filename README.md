# Backend Assessment

[![Codacy Badge](https://api.codacy.com/project/badge/Grade/cc84ee0e8c9a4db4b7e323155807d6d1)](https://app.codacy.com/gh/IDTitanium/talentql-assessment?utm_source=github.com&utm_medium=referral&utm_content=IDTitanium/talentql-assessment&utm_campaign=Badge_Grade_Settings)
[![Codacy Badge](https://app.codacy.com/project/badge/Grade/16694d12a4bb4ff18e0cdf70d3086133)](https://www.codacy.com/gh/IDTitanium/talentql-assessment/dashboard?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=IDTitanium/talentql-assessment&amp;utm_campaign=Badge_Grade)

See DETAILS.md for API guide.

Build and deploy a very simple API that does the following

1.  Calculate and return the age of a person, given their date of birth (dob) as query parameters to `GET /howold`

2.  Limit calls to `GET /howold` and prevent excessive usage from potentially ill-configured or malicious integrators. Only allow a maximum of 3 calls per second for each API client/caller

See full details and instructions in this [Google Doc](https://docs.google.com/document/d/1ma5vKz0j34gwI9WYrZddMM1ENlQddGOVFJ5qdSq2QlQ)