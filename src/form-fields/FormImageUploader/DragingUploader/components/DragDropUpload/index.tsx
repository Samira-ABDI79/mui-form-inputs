import React from 'react';

import { Grid, Button, Typography, alpha, styled, Box } from '@mui/material';
import { useDropzone } from 'react-dropzone';
import { useDispatch } from 'react-redux';

import { showMessage } from 'app/store/fuse/messageSlice';
import { closeModal } from 'app/store/modalSlice';
import FileDisplayer from '../FileDisplayer';
import { PresentionalUploadProps } from 'app/shared-components/form-fields/types';

const StyledDropContainer = styled('div')(({ theme }) => ({
  borderRadius: theme.shape.borderRadius,
  padding: 0,
  background: theme.palette.grey[100],
  color: theme.palette.grey[500],
  cursor: 'pointer',
  height: '300px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const DragDropUpload: React.FC<PresentionalUploadProps> = ({
  error,
  value,
  onChange,
  accept,
  onShowFile,
  maxSize,
  acceptDisplayer,
}) => {
  const [preview, setPreview] = React.useState<{ file: File; url: string } | null>(null);

  const dispatch = useDispatch();

  const onDropAccepted = (acceptedFiles: File[]): void => {
    const file = acceptedFiles[0];
    const fileUrl = URL.createObjectURL(file);

    setPreview({ file, url: fileUrl });
  };

  const acceptHandler = React.useMemo(() => {
    // jpg and jpeg uses same MIME type as image/jpeg
    if (accept!.includes('*')) return { 'image/jpeg': [], 'image/png': [] };

    const acceptContainer: {
      [index: string]: [];
    } = {};

    accept!.forEach((type) => {
      let currentTypeName = type;
      if (type === '.jpg') {
        currentTypeName = '.jpeg';
      }

      const removeDot = currentTypeName.slice(1);

      acceptContainer[`image/${removeDot}`] = [];
    });

    return acceptContainer;
  }, [accept]);

  const { getRootProps, getInputProps, isDragActive, fileRejections } = useDropzone({
    maxFiles: 1,
    accept: acceptHandler,
    maxSize: maxSize ? maxSize * 1024 : undefined,
    onDropAccepted,
  });

  const onSubmit = () => {
    onChange(preview?.file, () => {
      dispatch(
        showMessage({
          message: 'بارگذاری فایل با موفقیت انجام شد',
          variant: 'success',
        })
      );
      dispatch(closeModal());
    });
  };

  React.useEffect(() => {
    if (value) {
      const fileUrl = URL.createObjectURL(value);
      setPreview({ file: value, url: fileUrl });
    } else {
      setPreview(null);
    }
  }, [value]);

  return (
    <Grid container spacing={4} className="justify-center mt-1">
      <Grid item xs={12}>
        <StyledDropContainer
          sx={(theme) => ({
            border: `2px dashed ${error ? theme.palette.error.main : theme.palette.grey[400]}`,
          })}
          {...(isDragActive && {
            sx: (theme) => ({
              borderColor: theme.palette.primary.main,
              color: theme.palette.primary.main,
              backgroundColor: alpha(theme.palette.primary.main, 0.25),
            }),
          })}
          {...getRootProps()}
        >
          <input {...getInputProps()} />
          <Box className="h-40 flex flex-col justify-center">
            {preview ? (
              <Grid item xs={12} className="flex justify-center">
                <FileDisplayer
                  file={preview.url}
                  onDelete={() => {
                    setPreview(null);
                  }}
                  onShow={() => onShowFile(preview.file)}
                />
              </Grid>
            ) : (
              <>
                <Typography variant="subtitle1" align="center">
                  {isDragActive
                    ? 'فایل را اینجا رها کنید ...'
                    : ' کلیک کنید یا فایل را در اینجا رها کنید '}
                </Typography>
                <Typography variant="subtitle1" align="center" className="mt-16" fontSize={14}>
                  {isDragActive ? '' : ` پسوند های قابل قبول  ${acceptDisplayer} `}
                </Typography>
              </>
            )}
          </Box>
        </StyledDropContainer>
      </Grid>

      {!!fileRejections.length && (
        <Grid item xs={12}>
          <Typography className="py-4" align="center" color="error.main">
            حداکثر حجم مجاز {maxSize} کیلوبایت میباشد و فقط قالب های ({acceptDisplayer}) مجاز
            میباشد.
          </Typography>
        </Grid>
      )}

      <Grid item xs={12} className="text-center">
        <Button
          variant="contained"
          color="primary"
          fullWidth
          disabled={!(preview || value)}
          onClick={onSubmit}
        >
          ثبت
        </Button>
      </Grid>
    </Grid>
  );
};

export default DragDropUpload;
