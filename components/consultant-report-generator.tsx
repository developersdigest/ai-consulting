'use client'

import { useState } from 'react'
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Underline from '@tiptap/extension-underline'
import TextAlign from '@tiptap/extension-text-align'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Bold, Italic, Underline as UnderlineIcon, List, AlignLeft, AlignCenter, AlignRight } from 'lucide-react'

const sampleReports = [
  `<h2>Market Expansion Strategy</h2>
   <p>Our analysis indicates a <strong>25% growth potential</strong> in emerging markets. Key recommendations:</p>
   <ul>
     <li>Establish local partnerships to navigate regulatory landscapes</li>
     <li>Adapt product offerings to suit regional preferences</li>
     <li>Implement targeted marketing campaigns to build brand awareness</li>
   </ul>
   <p>By following these strategies, we project a <em>15% increase in global market share</em> within the next fiscal year.</p>`,
  
  `<h2>Digital Transformation Roadmap</h2>
   <p align="center">Proposed 3-Phase Implementation Plan</p>
   <ol>
     <li><strong>Assessment & Planning (3 months)</strong>: Evaluate current systems and define transformation goals</li>
     <li><strong>Technology Integration (6-9 months)</strong>: Implement cloud solutions and automate key processes</li>
     <li><strong>Training & Optimization (3-6 months)</strong>: Upskill employees and refine new systems</li>
   </ol>
   <p>Expected outcomes include a <u>30% increase in operational efficiency</u> and improved customer satisfaction scores.</p>`,
  
  `<h2>Sustainability Initiative Proposal</h2>
   <p align="justify">To align with global environmental goals and enhance brand reputation, we recommend:</p>
   <ul>
     <li>Transition to 100% renewable energy sources by 2025</li>
     <li>Implement a circular economy model for product lifecycle management</li>
     <li>Launch a sustainability-focused marketing campaign to engage eco-conscious consumers</li>
   </ul>
   <p>These initiatives are projected to result in a <strong>15% reduction in carbon footprint</strong> and potentially unlock new market segments.</p>`,
  
  `<h2>Employee Engagement Enhancement Plan</h2>
   <p>Based on our recent survey, we've identified key areas for improvement:</p>
   <ol>
     <li><strong>Communication</strong>: Implement bi-weekly town halls and an anonymous feedback system</li>
     <li><strong>Professional Development</strong>: Introduce personalized learning paths and mentorship programs</li>
     <li><strong>Work-Life Balance</strong>: Offer flexible working hours and wellness initiatives</li>
   </ol>
   <p align="center"><em>Target: Increase employee satisfaction scores by 20% within 6 months</em></p>`,
  
  `<h2>Supply Chain Optimization Strategy</h2>
   <p>Our analysis reveals potential for significant efficiency gains:</p>
   <ul>
     <li>Implement AI-driven demand forecasting to reduce inventory costs by <strong>18%</strong></li>
     <li>Streamline supplier network to cut lead times by <u>25%</u></li>
     <li>Adopt blockchain technology for enhanced traceability and reduced compliance risks</li>
   </ul>
   <p align="right">Estimated annual savings: $2.5M</p>`
]

export function ConsultantReportGeneratorComponent() {
  const [reportContent, setReportContent] = useState('')
  const [url, setUrl] = useState('')
  const [instructions, setInstructions] = useState('')
  const [loading, setLoading] = useState(false)

  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      TextAlign.configure({ types: ['heading', 'paragraph'] }),
    ],
    content: reportContent,
    onUpdate: ({ editor }) => {
      setReportContent(editor.getHTML())
    },
  })

  const generateRandomReport = () => {
    const randomReport = sampleReports[Math.floor(Math.random() * sampleReports.length)]
    editor?.commands.setContent(randomReport)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    const response = await fetch('/api/generate-report', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ url, instructions }),
    })
    const data = await response.json()
    editor?.commands.setContent(data.html)
    setLoading(false)
  }

  return (
    <div className="flex flex-col min-h-screen">
      <header className="bg-primary text-primary-foreground p-4">
        <h1 className="text-2xl font-bold">Consultant Report Generator</h1>
      </header>

      <main className="flex-grow p-4">
        <form onSubmit={handleSubmit} className="mb-4 space-y-4">
          <div>
            <label htmlFor="url" className="block text-sm font-medium text-gray-700">URL</label>
            <Input
              type="url"
              id="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="Enter URL to analyze"
              required
            />
          </div>
          <div>
            <label htmlFor="instructions" className="block text-sm font-medium text-gray-700">Instructions</label>
            <Textarea
              id="instructions"
              value={instructions}
              onChange={(e) => setInstructions(e.target.value)}
              placeholder="Enter instructions for report generation"
              rows={3}
            />
          </div>
          <Button type="submit" disabled={loading}>
            {loading ? 'Generating...' : 'Generate Report from URL'}
          </Button>
        </form>

        <div className="mb-4 flex flex-wrap gap-2">
          <Button
            onClick={() => editor?.chain().focus().toggleBold().run()}
            disabled={!editor?.can().chain().focus().toggleBold().run()}
            className={editor?.isActive('bold') ? 'is-active' : ''}
          >
            <Bold className="h-4 w-4" />
          </Button>
          <Button
            onClick={() => editor?.chain().focus().toggleItalic().run()}
            disabled={!editor?.can().chain().focus().toggleItalic().run()}
            className={editor?.isActive('italic') ? 'is-active' : ''}
          >
            <Italic className="h-4 w-4" />
          </Button>
          <Button
            onClick={() => editor?.chain().focus().toggleUnderline().run()}
            disabled={!editor?.can().chain().focus().toggleUnderline().run()}
            className={editor?.isActive('underline') ? 'is-active' : ''}
          >
            <UnderlineIcon className="h-4 w-4" />
          </Button>
          <Button
            onClick={() => editor?.chain().focus().toggleBulletList().run()}
            disabled={!editor?.can().chain().focus().toggleBulletList().run()}
            className={editor?.isActive('bulletList') ? 'is-active' : ''}
          >
            <List className="h-4 w-4" />
          </Button>
          <Button
            onClick={() => editor?.chain().focus().setTextAlign('left').run()}
            className={editor?.isActive({ textAlign: 'left' }) ? 'is-active' : ''}
          >
            <AlignLeft className="h-4 w-4" />
          </Button>
          <Button
            onClick={() => editor?.chain().focus().setTextAlign('center').run()}
            className={editor?.isActive({ textAlign: 'center' }) ? 'is-active' : ''}
          >
            <AlignCenter className="h-4 w-4" />
          </Button>
          <Button
            onClick={() => editor?.chain().focus().setTextAlign('right').run()}
            className={editor?.isActive({ textAlign: 'right' }) ? 'is-active' : ''}
          >
            <AlignRight className="h-4 w-4" />
          </Button>
        </div>

        <EditorContent editor={editor} className="border p-4 min-h-[300px] mb-4" />

        <Button onClick={generateRandomReport}>Generate Random Report</Button>
      </main>

      <footer className="bg-muted p-4 text-center">
        <p>&copy; 2023 Consultant Report Generator. All rights reserved.</p>
      </footer>
    </div>
  )
}