export default function showMetaDataFile(picPath, fileName, fileNameWithExt) {
  const metaData = `  Path to the file   |  ${picPath}
  File name          |  ${fileName}
  File's extension   |  ${fileNameWithExt.slice(1)}`;
  console.log(metaData);
}
