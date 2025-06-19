'use client'
import { useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Link from '@tiptap/extension-link'
import Placeholder from '@tiptap/extension-placeholder'

export interface UseMinimalTiptapEditorProps {
  value?: string
  onUpdate?: (value: string) => void
}

export function useMinimalTiptapEditor({ value, onUpdate }: UseMinimalTiptapEditorProps) {
  return useEditor({
    extensions: [
      StarterKit,
      Link.configure({ openOnClick: false }),
      Placeholder.configure({ placeholder: 'Start writing...' }),
    ],
    content: value,
    onUpdate: ({ editor }) => {
      onUpdate?.(editor.getHTML())
    },
  })
}
