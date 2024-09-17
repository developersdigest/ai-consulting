import { NextResponse } from 'next/server';
import OpenAI from "openai";
import FirecrawlApp from '@mendable/firecrawl-js';

const openai = new OpenAI();
const firecrawlApp = new FirecrawlApp({ apiKey: process.env.FIRECRAWL_API_KEY });

export async function POST(request: Request) {
  const { url, instructions } = await request.json();

  const crawlResponse = await firecrawlApp.crawlUrl(url, {
    limit: 5,
    scrapeOptions: {
      formats: ['markdown', 'html'],
    }
  });

  if (!crawlResponse.success) {
    throw new Error(`Failed to crawl: ${crawlResponse.error}`);
  }

  const completion = await openai.chat.completions.create({
    model: "o1-preview",
    messages: [
      {
        role: "user", 
        content: `
          Generate a report with the following details in valid HTML:
          - Instructions: ${instructions}
          - URL: ${url}
          - Results: ${JSON.stringify(crawlResponse.data)}
        `
      }
    ]
  });

  const generatedHtml = completion.choices[0].message.content;

  return NextResponse.json({ html: generatedHtml, crawlData: crawlResponse.data });
}