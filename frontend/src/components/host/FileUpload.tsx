import React, { useState, useRef } from 'react';
import axios from 'axios';
import { SUPPORTED_FILE_TYPES } from '../../types';

interface FileUploadProps {
  onUpload: (content: string, filename: string, fileType: string) => void;
}

const FileUpload: React.FC<FileUploadProps> = ({ onUpload }) => {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const fileExtension = '.' + file.name.split('.').pop()?.toLowerCase();
    
    if (!SUPPORTED_FILE_TYPES[fileExtension]) {
      setError(`Unsupported file type. Supported types: ${Object.keys(SUPPORTED_FILE_TYPES).join(', ')}`);
      return;
    }

    if (file.size > 50 * 1024) { // 50KB limit
      setError('File size must be less than 50KB');
      return;
    }

    setUploading(true);
    setError('');

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await axios.post('/api/files/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.data.success) {
        onUpload(response.data.content, response.data.filename, response.data.fileType);
      } else {
        setError(response.data.error || 'Upload failed');
      }
    } catch (err: any) {
      setError(err.response?.data?.error || 'Upload failed');
    } finally {
      setUploading(false);
    }
  };

  const handleDragOver = (event: React.DragEvent) => {
    event.preventDefault();
  };

  const handleDrop = (event: React.DragEvent) => {
    event.preventDefault();
    const files = event.dataTransfer.files;
    if (files.length > 0 && fileInputRef.current) {
      fileInputRef.current.files = files;
      handleFileSelect({ target: { files } } as any);
    }
  };

  const supportedExtensions = Object.keys(SUPPORTED_FILE_TYPES);

  return (
    <div className="file-upload">
      {error && <div className="error">{error}</div>}
      
      <div 
        className={`upload-area ${uploading ? 'uploading' : ''}`}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept={supportedExtensions.join(',')}
          onChange={handleFileSelect}
          style={{ display: 'none' }}
          disabled={uploading}
        />
        
        {uploading ? (
          <div className="upload-status">
            <div className="spinner"></div>
            <p>Uploading...</p>
          </div>
        ) : (
          <div className="upload-prompt">
            <div className="upload-icon">📁</div>
            <p><strong>Click to browse</strong> or drag and drop a file</p>
            <p className="file-info">
              Supported: {supportedExtensions.slice(0, 5).join(', ')}
              {supportedExtensions.length > 5 && ` and ${supportedExtensions.length - 5} more`}
            </p>
            <p className="file-info">Max size: 50KB</p>
          </div>
        )}
      </div>

      <style dangerouslySetInnerHTML={{
        __html: `
        .file-upload {
          margin-bottom: 20px;
        }

        .upload-area {
          border: 2px dashed #ddd;
          border-radius: 8px;
          padding: 30px;
          text-align: center;
          cursor: pointer;
          transition: all 0.2s ease;
          background-color: #fafafa;
        }

        .upload-area:hover {
          border-color: #007bff;
          background-color: #f0f8ff;
        }

        .upload-area.uploading {
          cursor: not-allowed;
          opacity: 0.7;
        }

        .upload-prompt {
          color: #666;
        }

        .upload-icon {
          font-size: 48px;
          margin-bottom: 15px;
        }

        .upload-prompt p {
          margin: 8px 0;
        }

        .file-info {
          font-size: 12px;
          color: #888;
        }

        .upload-status {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 15px;
        }

        .upload-status p {
          margin: 0;
          color: #007bff;
          font-weight: 600;
        }
        `
      }} />
    </div>
  );
};

export default FileUpload;
