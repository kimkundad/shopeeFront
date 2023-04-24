import React, { useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import {
    Box,
    Text,
    Flex,
    Spacer,
    Image,
    Input,
    Link,
  } from "@chakra-ui/react";
const thumbsContainer = {
  display: "flex",
  flexDirection: "row",
  flexWrap: "wrap",
  marginTop: 16,
};

const thumb = {
  display: "inline-flex",
  borderRadius: 2,
  border: "1px solid #eaeaea",
  marginBottom: 8,
  marginRight: 8,
  width: 100,
  height: 100,
  padding: 4,
  boxSizing: "border-box",
};

const thumbInner = {
  display: "flex",
  minWidth: 0,
  overflow: "hidden",
};

const img = {
  display: "block",
  width: "auto",
  height: "100%",
};

function Dropzone(props) {
  const [files, setFiles] = useState([]);
  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      "image/*": [],
    },
    onDrop: (acceptedFiles) => {
      setFiles(
        acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        )
      );
    },
  });

  const thumbs = files.map((file) => (
    <div style={thumb} key={file.name}>
      <div style={thumbInner}>
        <img
          src={file.preview}
          style={img}
          // Revoke data uri after image is loaded
          onLoad={() => {
            URL.revokeObjectURL(file.preview);
          }}
        />
      </div>
    </div>
  ));

  useEffect(() => {
    // Make sure to revoke the data uris to avoid memory leaks, will run on unmount
    return () => files.forEach((file) => URL.revokeObjectURL(file.preview));
  }, []);

  return (
    <Box className="container" mx="50px" mt="10px">
      <Box {...getRootProps({ className: "dropzone" })} borderRadius="xl">
        <Input {...getInputProps()} />
        <Image src="/img/upload.png" alt="" h="60px" w="60px"/>
        <Text>กดเพื่ออัพโหลดรูป</Text>
      </Box>
      <aside style={thumbsContainer} h="60px" w="60px">{thumbs}</aside>
    </Box>
  );
}

export default Dropzone;
