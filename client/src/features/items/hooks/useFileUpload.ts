import { graphql } from "@/gql";
import {
  CreateItemFileDocument,
  GeneratePresignedUploadUrlDocument,
  GeneratePresignedUploadUrlInput,
} from "@/gql/graphql";
import { useMutation } from "@apollo/client/react";
import { useState } from "react";

graphql(`
  mutation GeneratePresignedUploadUrl(
    $input: GeneratePresignedUploadUrlInput!
  ) {
    generatePresignedUploadUrl(input: $input) {
      presignedUrl
      s3Key
    }
  }
`);

graphql(`
  mutation CreateItemFile($input: CreateFileInput!) {
    createFile(input: $input) {
      id
      itemId
      s3Key
      name
      fileType
      folderId
      metadata
    }
  }
`);

export const useFileUpload = () => {
  const [mutate, { error }] = useMutation(GeneratePresignedUploadUrlDocument);
  const [createFile] = useMutation(CreateItemFileDocument);

  const [isLoading, setIsLoading] = useState(false);

  const generatePresignedUrl = (input: GeneratePresignedUploadUrlInput) => {
    return mutate({
      variables: { input },
    });
  };

  const uploadFile = async (file: File, presignedUrl: string) => {
    try {
      // LocalStack用にホスト名を置き換え（開発環境のみ）
      const uploadUrl = presignedUrl.replace(
        "http://localstack:4566",
        "http://localhost:4566"
      );

      const response = await fetch(uploadUrl, {
        method: "PUT",
        body: file,
      });

      if (!response.ok) {
        throw new Error(`Upload failed: ${response.statusText}`);
      }

      return response;
    } catch (err) {
      console.error("Failed to upload file:", err);
      throw err;
    }
  };

  const createItemFile = async (itemId: string, file: File) => {
    setIsLoading(true);
    try {
      const result = await generatePresignedUrl({
        itemId,
        fileName: file.name,
        contentType: file.type,
      });

      const generatePresignedUploadUrl =
        result.data?.generatePresignedUploadUrl;

      if (!generatePresignedUploadUrl) {
        throw new Error("Failed to generate presigned URL");
      }

      await uploadFile(file, generatePresignedUploadUrl.presignedUrl);

      await createFile({
        variables: {
          input: {
            itemId,
            s3Key: generatePresignedUploadUrl.s3Key,
            name: file.name,
            fileType: file.type,
            folderId: null,
            metadata: null,
          },
        },
      });

      return generatePresignedUploadUrl.s3Key;
    } catch (err) {
      console.error("Failed to create item file:", err);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return { createItemFile, loading: isLoading, error };
};
