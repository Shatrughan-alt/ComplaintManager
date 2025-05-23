import React from 'react';
import axios from 'axios';
import { fileTypeFromBlob } from 'file-type';

const DownloadButton = ({ uuid }) => {
  const handleDownload = async () => {
    try {
      const response = await axios.get(
        `http://localhost:9090/api/complaints/${uuid}/uploadedDocument`,
        {
          responseType: 'blob',
          withCredentials: true,
        }
      );

      const blob = new Blob([response.data]);
      const fileType = await fileTypeFromBlob(blob);

      if (fileType) {
        const contentDisposition = response.headers['content-disposition'];
        let filename = 'document';
        if (contentDisposition) {
          const matches = contentDisposition.match(/filename="(.+)"/);
          if (matches && matches[1]) {
            filename = matches[1];
          }
        }

        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', filename);
        document.body.appendChild(link);
        link.click();
        link.remove();
        window.URL.revokeObjectURL(url);
      } else {
        console.error('Unsupported file type');
      }
    } catch (error) {
      console.error('Error downloading the document:', error);
    }
  };

  return <button onClick={handleDownload}>Download Document</button>;
};

export default DownloadButton;
