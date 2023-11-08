import React from "react";
import MDEditor from '@uiw/react-md-editor';
import rehypeSanitize from "rehype-sanitize";


interface MarkdownComponentProps {
    value?: string
    onChange?: Function
    view: "edit" | "view"
}

const MarkdownComponent: React.FunctionComponent<MarkdownComponentProps> = ({ value, onChange, view }) => {
  return (
    <div className="container" data-color-mode="light">
      {view === 'edit' && 
        <MDEditor
          value={value}
          // @ts-ignore
          onChange={onChange}
          height={500}
          previewOptions={{
            rehypePlugins: [[rehypeSanitize]]
          }}
        />
      }
      {view === 'view' &&
        <MDEditor.Markdown source={value} />
      
      }
    </div>
  )
}

export default MarkdownComponent