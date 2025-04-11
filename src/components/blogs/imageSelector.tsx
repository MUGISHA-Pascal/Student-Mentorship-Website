/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, useCallback } from 'react';
import { UploadedImage } from '@/types/blog';
import { cn } from '@/lib/utils';
import { Upload, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'react-toastify';


interface ImageSelectorProps {
  value?: string;
  onChange: (value: string) => void;
}

const ImageSelector = ({ value, onChange }: ImageSelectorProps) => {
  const [isDragging, setIsDragging] = useState(false);
  const [uploadedImage, setUploadedImage] = useState<UploadedImage | null>(null);

  const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];

      if (!file.type.startsWith('image/')) {
        toast.error('Please upload an image file');
        return;
      }

      const reader = new FileReader();
      reader.onload = () => {
        const preview = reader.result as string;
        setUploadedImage({ file, preview, name: file.name });
        onChange(preview);
      };
      reader.readAsDataURL(file);
    }
  }, [onChange]);

  const handleFileChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];

      if (!file) {
        return; // no file selected, user probably cancelled
      }

      if (!file.type.startsWith('image/')) {
        toast.error("Please upload an image file");
        return;
      }

      const MAX_FILE_SIZE_MB = 5; // Maximum file size in megabytes
      const MAX_FILE_SIZE = MAX_FILE_SIZE_MB * 1024 * 1024; // Convert to bytes


      if (file.size > MAX_FILE_SIZE) {
        toast.error(`File size exceeds ${MAX_FILE_SIZE_MB}MB. Please upload a smaller image.`);
        return;
      }

      const reader = new FileReader();
      reader.onload = () => {
        const preview = reader.result as string;
        setUploadedImage({ file, preview, name: file.name });
        onChange(preview);
      };
      reader.readAsDataURL(file);
    }
  }, [onChange]);

  const clearSelectedImage = () => {
    setUploadedImage(null);
    onChange('');
  };

  const renderSelectedImage = () => {
    if (!value) return null;

    return (
      <div className="relative mt-4 rounded-md overflow-hidden border border-gray-200 group">
        <img
          src={value}
          alt="Selected preview"
          className="w-full h-[450px] object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
          <Button
            variant="destructive"
            size="icon"
            onClick={clearSelectedImage}
            className="rounded-full"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-4">
      {!value && (
        <div
          className={cn(
            "border-2 border-dashed rounded-lg p-8 transition-colors text-center",
            isDragging ? "border-primary bg-primary/5" : "border-gray-300",
            "hover:border-primary hover:bg-primary/5"
          )}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <div className="flex flex-col items-center justify-center space-y-4">
            <div className="h-14 w-14 rounded-full bg-primary/10 flex items-center justify-center">
              <Upload className="h-7 w-7 text-primary" />
            </div>
            <div>
              <p className="text-base font-medium">Drag & drop files here</p>
              <p className="text-sm text-gray-500 mt-1">or</p>
            </div>
            <div className="flex">
              <Button
                className="relative cursor-pointer overflow-hidden"
                onClick={() => document.getElementById('image-upload')?.click()}
              >
                <span>Upload a file</span>
                <input
                  id="image-upload"
                  type="file"
                  accept="image/*"
                  className="absolute inset-0 opacity-0 cursor-pointer"
                  onChange={handleFileChange}
                />
              </Button>
            </div>
            <p className="text-xs text-gray-500 mt-2">
              Supported formats: JPEG, PNG, GIF, WebP
            </p>
          </div>
        </div>
      )}

      {renderSelectedImage()}

    </div>
  );
};

export default ImageSelector;