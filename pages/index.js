import { useCallback, useState } from "react";
import { useStorageUpload } from "@thirdweb-dev/react";
import { ThirdwebProvider, ThirdwebStorage } from "@thirdweb-dev/react";
import "../styles/index.module.css";
import { useDropzone } from "react-dropzone";

const Home = () => {
  const { mutateAsync: upload } = useStorageUpload();
  const [uploadedFileUri, setUploadedFileUri] = useState(null);
  const onDrop = useCallback(
    async (acceptedFiles) => {
      const uris = await upload({ data: acceptedFiles });
      console.log(uris);
      console.log("https://ipfs.io/ipfs/" + uris[0].slice(7));
      setUploadedFileUri("https://ipfs.io/ipfs/" + uris[0].slice(7));
    },
    [upload]
  );

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  return (
    <div className="main">
      <h1 id="h1">IMAGE UPLOAD TO IPFS</h1>
      <h2 id="h2">A safe place to upload your files to IPFS</h2>
      <div {...getRootProps()}>
        <input {...getInputProps()} />
        <button id="button">Drop files here</button>
      </div>
      {uploadedFileUri && (
        <div className="uploaded-image-container">
          <h3>Uploaded Image:</h3>
          <img
            src={uploadedFileUri}
            alt="Uploaded"
            className="uploaded-image"
          />
        </div>
      )}
    </div>
  );
};

export default Home;
