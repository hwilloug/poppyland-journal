import React from "react"
import MDEditor from "@uiw/react-md-editor"
import rehypeSanitize from "rehype-sanitize"

interface MarkdownComponentProps {
  value?: string
  onChange?: Function
  view: "edit" | "view"
  height?: number
  hideToolbar?: boolean
  preview?: "edit" | "live"
}

const MarkdownComponent: React.FunctionComponent<MarkdownComponentProps> = ({
  value,
  onChange,
  view,
  height,
  hideToolbar,
  preview,
}) => {
  return (
    <div className="container" data-color-mode="#e0f0bb">
      {view === "edit" && (
        <MDEditor
          value={value}
          // @ts-ignore
          onChange={onChange}
          height={height}
          hideToolbar={hideToolbar}
          preview={preview}
          defaultTabEnable={preview === "edit"}
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
