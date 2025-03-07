'use client';

import { ChangeEvent, DragEvent, useState } from 'react';
import { UploadSimple } from '@phosphor-icons/react';

interface SelectFileProps {
  onSelectFile: (e: ChangeEvent<HTMLInputElement>) => void;
  setContractToMint: (value: string) => void;
  setChainId: (value: number) => void;
}

const SelectFile = ({ onSelectFile }: SelectFileProps) => {
  const [isDragging, setIsDragging] = useState(false);

  const handleDragEnter = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const files = e.dataTransfer.files;
    if (files && files.length > 0) {
      // Create a synthetic event
      const syntheticEvent = {
        target: {
          files: files
        }
      } as ChangeEvent<HTMLInputElement>;

      onSelectFile(syntheticEvent);
    }
  };

  return (
    <div className="w-full mx-auto p-5">
      <div
        className={`
          relative
          flex flex-col items-center justify-center
          w-full min-h-[300px]
          border-2 border-dashed rounded-xl
          transition-all duration-200 ease-in-out
          ${isDragging
            ? 'border-blue-500 bg-blue-500/10'
            : 'border-blue-900/40 hover:border-blue-500/50 hover:bg-blue-900/10'
          }
        `}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        <label
          htmlFor="dropzone-file"
          className="flex flex-col items-center justify-center w-full h-full cursor-pointer"
        >
          <div className="flex flex-col items-center justify-center pt-5 pb-6 px-4">
            <UploadSimple
              weight="thin"
              className={`w-16 h-16 mb-4 transition-colors duration-200 ${isDragging ? 'text-blue-500' : 'text-blue-300/60'
                }`}
            />
            <p className={`mb-2 text-xl transition-colors duration-200 ${isDragging ? 'text-blue-500' : 'text-white'
              }`}>
              <span className="font-semibold">Click to upload</span> or drag and drop
            </p>
            <p className={`text-sm transition-colors duration-200 ${isDragging ? 'text-blue-500' : 'text-blue-300/40'
              }`}>
              PNG, JPG or GIF (MAX. 800x400px)
            </p>
          </div>

          <input
            id="dropzone-file"
            type="file"
            className="hidden"
            onChange={onSelectFile}
            accept="image/*"
          />
        </label>

        {/* Optional decorative elements */}
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute -top-1/2 -left-1/2 w-[200%] h-[200%] bg-grid-white/[0.02] [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]" />
        </div>
      </div>

      {/* Optional helper text */}
      <p className="mt-4 text-sm text-center text-blue-300/40">
        Recommended: Use high-quality images for best results
      </p>
    </div>
  );
};

export default SelectFile;
