/* eslint-disable jsx-a11y/label-has-associated-control */
import { useRef } from 'react';
import { useFormContext, Controller } from 'react-hook-form';
import { Box, FormHelperText, IconButton } from '@mui/material';

import { Icon } from '@iconify/react';

interface FileInputProps {
  name: string;
  label: string;
  selectedFile: File | null;
  setSelectedFile: (file: File | null) => void;
  setFilePreview?: (preview: string | null) => void;
  text?: string;
  sx?: any;
  [key: string]: any;
}

export default function RhfFileInput({
  name,
  label = 'Upload',
  selectedFile,
  setSelectedFile,
  setFilePreview,
  helperText,
  text = '',
  sx = {},
  ...other
}: FileInputProps) {
  const { control } = useFormContext();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleUnselect = () => {
    if (fileInputRef.current) {
      fileInputRef.current.value = ''; // Clear the input value
    }
    setSelectedFile(null); // Clear the file state
    if (setFilePreview) {
      setFilePreview(null); // Clear the preview state
    }
  };

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <Box position="relative" display="inline-block">
          <Box sx={{ width: selectedFile ? '90%' : '100%' }}>
            <label htmlFor="file-input" style={{ fontSize: '12px' }}>
              {label}
            </label>
            <input
              type="file"
              id="file-input"
              className="form-control"
              ref={fileInputRef}
              onChange={(e: any) => {
                const file = e.target.files[0];
                if (file) {
                  field.onChange(file);
                  setSelectedFile(file);
                  if (setFilePreview) setFilePreview(URL.createObjectURL(file));
                }
              }}
              {...other}
            />
            {selectedFile && (
              <IconButton
                onClick={handleUnselect}
                sx={{
                  position: 'absolute',
                  right: -10,
                  top: 12,
                  width: '50px',
                  height: '50px',
                  backgroundColor: 'transparent',
                  color: 'red',
                  '&:hover': {
                    backgroundColor: 'transparent'
                  }
                }}
              >
                <Icon icon="basil:cross-solid" style={{ width: '130px', height: '130px' }} />
              </IconButton>
            )}
          </Box>
          <FormHelperText error>{error?.message}</FormHelperText>
          {helperText && <FormHelperText>{helperText}</FormHelperText>}
        </Box>
      )}
    />
  );
}
