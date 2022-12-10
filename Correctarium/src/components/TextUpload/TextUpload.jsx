import React, { useState } from "react";

import "./TextUpload.scss";

function TextUpload(props) {
  const [textareaValue, setTextareaValue] = useState("");
  const [fileName, setFileName] = useState("");
  const [fileContentLength, setFileContentLength] = useState("");

  function textAreaHandler(event) {
    setTextareaValue(() => event.target.value);
    props.textSetter(() => event.target.value)
  }

  function uploadHandler(event) {
    setFileName(event.target.files[0].name);
    const fileReader = new FileReader();
    fileReader.readAsText(event.target.files[0], "UTF-8");
    fileReader.onload = (e) => {
      let content = e.target.result;
      console.log(content.replace("\n", "").replace("\r", "")); // mb I will need to get rid of /r
      setFileContentLength(() => {
        console.log(
          content
            .split(" ")
            .join("")
            .length.toString()
            .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
        );
        return content.length.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      });
      // setFileContent(JSON.parse(content));
    };
  }

  function clearUploadedHandler() {
    setFileName(() => "");
    setFileContentLength(() => "");
  }

  return (
    <div className="file-upload">
      <textarea value={textareaValue} onChange={textAreaHandler}></textarea>
      {!textareaValue && (
        <div className="upload-overlay">
          <span>Введіть текст або </span>
          <label>
            завантажте файл
            <input name="myFile" type="file" onChange={uploadHandler}></input>
          </label>
          {fileName && null}
        </div>
      )}
      {fileName && (
        <div className="file-uploading">
          <span className="file-name">{fileName}</span>
          <span className="char-count">
            Количество символов: {fileContentLength}
          </span>
          <span className="clear-file" onClick={clearUploadedHandler}>
            завантажте файл
          </span>
        </div>
      )}
    </div>
  );
}

export default TextUpload;
