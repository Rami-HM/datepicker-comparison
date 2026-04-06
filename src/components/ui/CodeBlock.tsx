import { useState } from 'react'
import SyntaxHighlighter from 'react-syntax-highlighter'
import { githubGist } from 'react-syntax-highlighter/dist/esm/styles/hljs'

interface CodeBlockProps {
  code: string
}

export function CodeBlock({ code }: CodeBlockProps) {
  const [open, setOpen] = useState(false)

  return (
    <>
      <button
        onClick={() => setOpen(!open)}
        style={{
          width: '100%',
          padding: '8px 16px',
          border: 'none',
          borderTop: '1px solid #f3f4f6',
          background: open ? '#f9fafb' : 'white',
          textAlign: 'left',
          cursor: 'pointer',
          fontSize: 11,
          color: '#6b7280',
          display: 'flex',
          alignItems: 'center',
          gap: 4,
        }}
      >
        {open ? '코드 닫기' : '코드 보기'}
      </button>
      {open && (
        <SyntaxHighlighter
          language="tsx"
          style={githubGist}
          customStyle={{ margin: 0, fontSize: 11, borderTop: '1px solid #e5e7eb' }}
        >
          {code}
        </SyntaxHighlighter>
      )}
    </>
  )
}
