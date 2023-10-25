import { ChangeEvent, memo } from 'react';
import { Box, Button, Typography } from '@mui/material';
import Spin from 'app/shared-components/global/Spin';
import { CiCirclePlus } from 'react-icons/ci';
import { FiEye, FiTrash2 } from 'react-icons/fi';
import { PresentionalUploadProps } from '../types';
import { alpha } from '@mui/material/styles';

function SmallScreenUploader({
  error,
  value,
  onChange,
  label,
  onShowFile,
  maxSize,
  acceptDisplayer,
}: PresentionalUploadProps) {
  const onFileAccepted = ({ target }: ChangeEvent<HTMLInputElement>) => {
    const { files } = target;

    onChange(files![0]);
  };

  return (
    <Spin spinning={false}>
      <Box
        className="w-full mx-auto border-2 border-dashed rounded-2xl p-10"
        sx={(theme) => ({
          width: 218,
          maxWidth: 218,
          height: 253,
          maxHeight: 253,
          borderColor: error ? theme.palette.error.main : theme.palette.primary.light,
          backgroundColor: alpha(theme.palette.error.main, error ? 0.05 : 0),
          backgroundImage: value,
        })}
      >
        {value ? (
          <Box className="w-full h-full relative">
            <img
              src={URL.createObjectURL(value)}
              alt="cropped"
              className="w-full h-full object-cover absolute rounded-2xl"
              style={{ transition: '0.3s' }}
            />
          </Box>
        ) : (
          <Box component="label" className="h-full w-full">
            <Box className="flex flex-col items-center justify-around h-full cursor-pointer">
              <input type="file" onChange={onFileAccepted} accept={acceptDisplayer} hidden />

              <Box fontSize={35} className="opacity-50">
                <CiCirclePlus fontSize={35} />
              </Box>

              {label && (
                <div className="flex flex-col items-center justify-center mb-8">
                  {label && <Typography color="primary">{label}</Typography>}
                </div>
              )}

              <Typography fontSize={12} className="mt-4 p-4 text-center" color="text.disabled">
                پسوند های قابل قبول <br /> ( {acceptDisplayer} )
              </Typography>

              {maxSize && (
                <Typography color="text.disabled" className="text-center">
                  (سایز حداکثر {maxSize} کیلوبایت)
                </Typography>
              )}
            </Box>
          </Box>
        )}
      </Box>

      {value && (
        <div className="w-full text-center justify-center items-center mt-6">
          {value && (
            <Button onClick={() => onChange(undefined)}>
              <Typography variant="subtitle1" className="text-24">
                <FiTrash2 />
              </Typography>
            </Button>
          )}
          <Button onClick={() => onShowFile(undefined)}>
            <Typography variant="subtitle1" className="text-24">
              <FiEye />
            </Typography>
          </Button>
        </div>
      )}

      <Typography color="error" className="mt-8 text-center">
        {error?.message}
      </Typography>
    </Spin>
  );
}

export default memo(SmallScreenUploader);
