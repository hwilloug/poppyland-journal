import React from "react";
import MDEditor from '@uiw/react-md-editor';
import rehypeSanitize from "rehype-sanitize";


interface MarkdownComponentProps {
    value?: string
    onChange?: React.Dispatch<React.SetStateAction<string | undefined>>
    view: "edit" | "view"
}

const MarkdownComponent: React.FunctionComponent<MarkdownComponentProps> = ({ value, onChange, view }) => {
  return (
    <div className="container">
      {view === 'edit' && 
        <MDEditor
          value={value}
          // @ts-ignore
          onChange={onChange} 
          previewOptions={{
            rehypePlugins: [[rehypeSanitize]]
          }}
        />
      }
      {view === 'view' &&
        <MDEditor.Markdown source="value" />
      
      }
    </div>
  )
}

export default MarkdownComponent