import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { FiTrash2, FiEye } from 'react-icons/fi';
import { useFuseDispatch } from 'src/app/utils/hooks/useStore';
import { openAlertDialog } from 'app/store/alertDialogSlice';

interface FileDisplayerProps {
  file: string;
  onDelete: () => void;
  onShow: () => void;
}

const FileDisplayer: React.FC<FileDisplayerProps> = ({ file, onDelete, onShow }) => {
  const dispatch = useFuseDispatch();

  const deleteHandler = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    dispatch(
      openAlertDialog({
        title: 'هشدار',
        body: 'آیا میخواهید تصویر پیش نمایش را پاک کنید ؟',
        okText: 'بله',
        cancelText: 'خیر',
        onOk: () => {
          onDelete();
        },
      })
    );
  };

  const showHandler = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    onShow();
  };

  return (
    <Box
      className="w-full h-full relative"
      sx={{
        '&:hover': {
          '& img': {
            opacity: 0.3,
          },
          '& div': {
            display: 'flex',
          },
        },
      }}
    >
      <img
        src={file}
        alt="پیش نمایش"
        className="w-full h-full max-h-[290px] transition-all duration-300 hover:opacity-40"
      />
      <Box className="hidden absolute top-[50%] left-[50%] right-[50%] gap-24 items-center justify-center">
        <Button onClick={showHandler}>
          <Typography variant="subtitle1" className="text-24 opacity-70 hover:opacity-100">
            <FiEye />
          </Typography>
        </Button>
        <Button onClick={deleteHandler}>
          <Typography variant="subtitle1" className="text-24 opacity-70 hover:opacity-100">
            <FiTrash2 />
          </Typography>
        </Button>
      </Box>
    </Box>
  );
};

export default React.memo(FileDisplayer);
