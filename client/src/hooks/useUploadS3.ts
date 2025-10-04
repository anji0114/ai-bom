import { apiUrl } from "@/constants/url";

export const useUploadS3 = () => {
  const openUploadS3 = async (file: File) => {
    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch(`${apiUrl}/s3/upload`, {
        method: "POST",
        credentials: "include",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Upload failed");
      }

      const data = await response.json();

      return data;
    } catch (error) {
      console.log(error);
    }
  };

  return { openUploadS3 };
};
