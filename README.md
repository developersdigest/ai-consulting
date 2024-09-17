
# Code Documentation

## Overview

This project is a Next.js application that implements a Consultant Report Generator. It allows users to generate reports based on URLs and custom instructions, as well as edit and format the generated content.

## Key Components

### 1. ConsultantReportGeneratorComponent (components/consultant-report-generator.tsx)

This is the main component of the application. It includes:

- A form for URL and instruction input
- A rich text editor for report content
- Formatting controls for the editor
- A function to generate random sample reports

#### Inputs:
- URL (string)
- Instructions (string)

#### Outputs:
- Generated report content (HTML)

### 2. API Route (app/api/generate-report/route.ts)

This serverless function handles the report generation process:

- Crawls the provided URL using Firecrawl
- Generates a report using OpenAI's GPT model

#### Inputs:
- URL (string)
- Instructions (string)

#### Outputs:
- Generated HTML content
- Crawl data

### 3. UI Components (components/ui/*)

Custom UI components used throughout the application:
- Button
- Input
- Textarea

### 4. Layout and Styling

- Global styles defined in app/globals.css
- Tailwind CSS used for styling
- Custom font configuration in app/layout.tsx

## Key Features

1. URL-based report generation
2. Rich text editing capabilities
3. Random sample report generation
4. Responsive design

## Technologies Used

- Next.js (React framework)
- TypeScript
- Tailwind CSS
- TipTap (rich text editor)
- OpenAI API
- Firecrawl (web crawling)

## Setup and Usage

1. Install dependencies: `npm install`
2. Set up environment variables (OpenAI API key, Firecrawl API key)
3. Run the development server: `npm run dev`
4. Access the application at `http://localhost:3000`

## Deployment

The project is configured for easy deployment on Vercel, the creators of Next.js.
