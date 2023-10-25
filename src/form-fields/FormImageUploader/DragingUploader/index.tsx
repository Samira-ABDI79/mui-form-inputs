import React from 'react';
import { Button } from '@mui/material';
import DragDropUpload from './components/DragDropUpload';
import { openModal } from 'app/store/modalSlice';
import { useFuseDispatch } from 'src/app/utils/hooks/useStore';
import { PresentionalUploadProps } from '../../types';
import { HiOutlineCloudUpload } from 'react-icons/hi';

const DraggingUploader: React.FC<PresentionalUploadProps> = ({
  error,
  value,
  onChange,
  label,
  accept,
  onShowFile,
  maxSize,
  acceptDisplayer,
}) => {
  const dispatch = useFuseDispatch();

  const onOpenModal = () =>
    dispatch(
      openModal({
        body: (
          <DragDropUpload
            label={label}
            error={error}
            value={value}
            onChange={onChange}
            onShowFile={onShowFile}
            maxSize={maxSize}
            accept={accept}
            acceptDisplayer={acceptDisplayer}
          />
        ),
        maxWidth: 'md',
        key: 'DragDropUpload',
        title: label,
      })
    );

  return (
    <Button
      onClick={onOpenModal}
      color={error ? 'error' : 'inherit'}
      fullWidth
      endIcon={<HiOutlineCloudUpload />}
      variant="outlined"
      className="h-auto max-h-max"
      title={label}
    >
      {value?.name?.length > 40 && `${value.name.slice(0, 40)}...`}
      {value?.name?.length < 40 && value.name}
      {!value?.name && label}
    </Button>
  );
};

export default React.memo(DraggingUploader);
