"use client"

import { toast } from "@/hooks/use-toast";
import config from "@/lib/config";
import { 
  IKImage,  
  ImageKitProvider, 
  IKUpload, 
} from "imagekitio-next";
import Image from "next/image";
import { useRef, useState } from "react";

const { 
  env: {
      imagekit: {publicKey, urlEndpoint },
  },
} = config;

const authenticator = async () => {
  try {
    const response = await fetch(`${config.env.apiEndpoint}/api/auth/imagekit`);
    
    if(!response.ok){
      const errorText = await response.text();

      throw new Error(`Request failed with status ${response.status}: ${errorText}`);
    }

    const data = await response.json();
    const { signature, expire, token } = data;

    return { signature, expire, token };
  } catch (error: any) {
    throw new Error(`Failed to authenticate: ${error.message}`);

  }
}

const ImageUpload = ({ onFileChange }: { onFileChange: (filePath: string) => void}) => {

  const ikUploadRef = useRef(null);
  const [file, setFile] = useState<{ filePath: string} | null>(null);

  const onError = (error: any) => {
    console.error();

    toast(
      {
        title: 'Image upload failed',
        description: 'Your image could not be uploaded. Please try again',
        variant: 'destructive'
      }
    )
  }

  const onSuccess = (res: any) => {
    setFile(res)

    onFileChange(res.filePath);

    toast(
      {
        title: 'File uploaded successfully',
      description: `${res.filePath} uploaded`,
      }
    )
  }

  return (
    <ImageKitProvider 
      publicKey={publicKey} 
      urlEndpoint={urlEndpoint}
      authenticator={authenticator}
      >
        <IKUpload 
          className="hidden"
          ref={ikUploadRef}
          onError={onError}
          onSuccess={onSuccess}
          fileName="test-upload.png"
        />

        <button className="upload-btn" onClick={(e) => {
          e.preventDefault();
          
          if(ikUploadRef.current){
            // @ts-ignore
            ikUploadRef.current?.click();
          }
        } } >
          <Image 
            src='/icons/upload.svg'
            alt="upload"
            width={20}
            height={20} 
          />

          <p className="text-base text-light-100">Upload a file</p>

          {file && <p className="upload-filename">{file.filePath}</p>}
        </button>

        {file && (
          <IKImage
            alt={file.filePath}
            path={file.filePath}
            width={500}
            height={500}
          />
        )}
      </ImageKitProvider>
  );
};

export default ImageUpload;