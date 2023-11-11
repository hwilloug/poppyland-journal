import React from "react"
import MDEditor from "@uiw/react-md-editor"
import rehypeSanitize from "rehype-sanitize"

interface MarkdownComponentProps {
  value?: string
  onChange?: Function
  view: "edit" | "view"
  height?: number
  hideToolbar?: boolean
}

const MarkdownComponent: React.FunctionComponent<MarkdownComponentProps> = ({
  value,
  onChange,
  view,
  height,
  hideToolbar,
}) => {
  return (
    <div className="container" data-color-mode="light">
      {view === "edit" && (
        <MDEditor
          value={value}
          // @ts-ignore
          onChange={onChange}
          height={height}
          hideToolbar={hideToolbar}
          previewOptions={{
            rehypePlugins: [[rehypeSanitize]],
          }}
        />
      )}
      {view === "view" && (
        <MDEditor.Markdown source={value} style={{ padding: "20px" }} />
      )}
    </div>
  )
}

export default MarkdownComponent
