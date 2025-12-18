"use client";

import * as React from "react";
import Image from "next/image";
import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Upload, X } from "lucide-react";

interface ImageUploaderProps {
  label?: string;
  onFilesChange?: (files: File[]) => void; // ✅ now supports multiple files
  defaultPreviews?: string[];
  className?: string;
}

export function ImageUploader({
  label = "Upload Images",
  onFilesChange,
  defaultPreviews = [],
  className,
}: ImageUploaderProps) {
  const [previews, setPreviews] = useState<string[]>(defaultPreviews);
  const [files, setFiles] = useState<File[]>([]);
  const inputRef = useRef<HTMLInputElement | null>(null);

  // ✅ Handle multiple file uploads
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(e.target.files || []);
    if (selectedFiles.length > 0) {
      const newPreviews = selectedFiles.map((file) =>
        URL.createObjectURL(file)
      );
      const updatedFiles = [...files, ...selectedFiles];
      const updatedPreviews = [...previews, ...newPreviews];
      setFiles(updatedFiles);
      setPreviews(updatedPreviews);
      onFilesChange?.(updatedFiles);
    }
  };

  // ✅ Remove specific file
  const handleRemove = (index: number) => {
    const newFiles = files.filter((_, i) => i !== index);
    const newPreviews = previews.filter((_, i) => i !== index);
    setFiles(newFiles);
    setPreviews(newPreviews);
    onFilesChange?.(newFiles);
  };

  // ✅ Handle drag-and-drop multiple files
  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const droppedFiles = Array.from(e.dataTransfer.files || []);
    if (droppedFiles.length > 0) {
      const newPreviews = droppedFiles.map((file) => URL.createObjectURL(file));
      const updatedFiles = [...files, ...droppedFiles];
      const updatedPreviews = [...previews, ...newPreviews];
      setFiles(updatedFiles);
      setPreviews(updatedPreviews);
      onFilesChange?.(updatedFiles);
    }
  };

  return (
    <div className={cn("w-full space-y-2", className)}>
      {label && (
        <p className="text-sm font-medium text-muted-foreground">{label}</p>
      )}

      <div
        onDrop={handleDrop}
        onDragOver={(e) => e.preventDefault()}
        className={cn(
          "relative flex flex-col items-center justify-center border-2 border-dashed rounded-2xl p-6 cursor-pointer transition hover:bg-muted/50",
          "border-muted-foreground/10"
        )}
        onClick={() => inputRef.current?.click()}
      >
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 w-full">
          {previews.map((preview, index) => (
            <div key={index} className="relative w-full aspect-square">
              <Image
                src={preview}
                alt={`Preview ${index}`}
                fill
                className="object-cover rounded-lg"
              />
              <Button
                size="icon"
                variant="destructive"
                className="absolute top-2 right-2 rounded-full"
                onClick={(e) => {
                  e.stopPropagation();
                  handleRemove(index);
                }}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          ))}

          <div className="flex flex-col items-center justify-center border-2 border-dashed border-muted-foreground/20 rounded-lg aspect-square text-muted-foreground hover:bg-muted/30 transition">
            <Upload className="h-6 w-6 mb-1" />
            <p className="text-xs text-center">Add images</p>
          </div>
        </div>

        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          multiple // ✅ multiple upload support
          className="hidden"
          onChange={handleFileChange}
        />
      </div>
    </div>
  );
}
