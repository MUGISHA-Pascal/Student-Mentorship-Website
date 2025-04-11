/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, useCallback } from 'react';
import { ImageOption, UploadedImage } from '@/types/blog';
import { cn } from '@/lib/utils';
import { Upload, Image as ImageIcon, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

// Pre-defined image options
const imageOptions: ImageOption[] = [
  { value: "https://source.unsplash.com/random/800x600/?nature", label: "Nature", preview: "https://source.unsplash.com/random/800x600/?nature" },
  { value: "https://source.unsplash.com/random/800x600/?city", label: "City", preview: "https://source.unsplash.com/random/800x600/?city" },
  { value: "https://source.unsplash.com/random/800x600/?technology", label: "Technology", preview: "https://source.unsplash.com/random/800x600/?technology" },
  { value: "https://source.unsplash.com/random/800x600/?business", label: "Business", preview: "https://source.unsplash.com/random/800x600/?business" },
  { value: "https://source.unsplash.com/random/800x600/?people", label: "People", preview: "https://source.unsplash.com/random/800x600/?people" }
];

interface ImageSelectorProps {
  value?: string;
  onChange: (value: string) => void;
}

const ImageSelector = ({ value, onChange }: ImageSelectorProps) => {
  const [isDragging, setIsDragging] = useState(false);
  const [uploadedImage, setUploadedImage] = useState<UploadedImage | null>(null);
  const [showGallery, setShowGallery] = useState(false);

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
        alert('Please upload an image file');
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
      
      if (!file.type.startsWith('image/')) {
        alert('Please upload an image file');
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

  const selectFromGallery = (option: ImageOption) => {
    setUploadedImage(null);
    onChange(option.value);
    setShowGallery(false);
  };

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
            <div className="flex gap-3">
              <Button
                className="relative overflow-hidden"
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
              <Button
                variant="outline"
                onClick={() => setShowGallery(!showGallery)}
              >
                Select from gallery
              </Button>
            </div>
            <p className="text-xs text-gray-500 mt-2">
              Supported formats: JPEG, PNG, GIF, WebP
            </p>
          </div>
        </div>
      )}

      {renderSelectedImage()}

      {showGallery && (
        <div className="mt-4">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {imageOptions.map((option) => (
              <div 
                key={option.value}
                className={cn(
                  "cursor-pointer rounded-md overflow-hidden border-2 transition-all",
                  value === option.value ? "border-primary ring-2 ring-primary/30" : "border-gray-200 hover:border-primary/50"
                )}
                onClick={() => selectFromGallery(option)}
              >
                <img 
                  src={option.preview} 
                  alt={option.label}
                  className="w-full h-24 object-cover" 
                />
                <div className="p-2 bg-gray-50 text-xs font-medium truncate">{option.label}</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageSelector;