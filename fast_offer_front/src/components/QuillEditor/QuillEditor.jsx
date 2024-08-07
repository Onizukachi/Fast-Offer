import ReactQuill from "react-quill";
import { useMemo } from "react";
import hljs from "highlight.js";
import PropTypes from "prop-types";

const QuillEditor = ({ value, onChange, quillRef, placeholder }) => {
  hljs.configure({
    languages: [
      "javascript",
      "CSS",
      "HTML",
      "java",
      "ruby",
      "python",
      "sql",
      "json",
      "php",
    ],
  });

  const modules = useMemo(() => {
    return {
      syntax: {
        highlight: (text) => hljs.highlightAuto(text).value,
      },
      toolbar: {
        container: [
          [{ header: [1, 2, false] }],
          ["bold", "italic", "underline", "strike", "blockquote", "code-block"],
          [{ list: "ordered" }, { list: "bullet" }, "link", { align: [] }],
          ["clean"],
        ],
      },
      clipboard: {
        matchVisual: false,
      },
    };
  }, []);

  return (
    <ReactQuill
      className="grow"
      theme="snow"
      modules={modules}
      value={value}
      onChange={(content, delta, source, editor) => {
        onChange(content, editor);
      }}
      ref={quillRef}
      placeholder={placeholder}
    />
  );
};

QuillEditor.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func,
  quillRef: PropTypes.object,
  placeholder: PropTypes.string,
};

export default QuillEditor;
