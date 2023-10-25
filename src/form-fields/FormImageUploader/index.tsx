import useUserDeviceOS from 'src/app/utils/hooks/useUserDeviceOS';
import SmallScreenUploader from './SmallScreenUploader';
import { FieldValues, useController } from 'react-hook-form';
import React from 'react';
import { RhfImageUploaderProps } from '../types';
import { useFuseDispatch } from 'src/app/utils/hooks/useStore';
import { openLightBox } from 'app/store/lightboxSlice';
import { showMessage } from 'app/store/fuse/messageSlice';
import { jsx } from '@emotion/react';
import DragingUploader from './DragingUploader';
import { openAlertDialog } from 'app/store/alertDialogSlice';

function FormImageUploader<T extends FieldValues>({
  name,
  control,
  rules,
  maxSize,
  accept = ['*'],
  label,
}: RhfImageUploaderProps<T>) {
  const { isUserDeviceAndroid, isUserDeviceIOS } = useUserDeviceOS();

  const dispatch = useFuseDispatch();

  const {
    fieldState: { error },
    field: { value, onChange },
  } = useController<T>({
    name,
    control,
    rules,
  });

  const acceptDisplayer = React.useMemo(() => {
    if (accept.includes('*')) return 'image/*';

    return accept.join(' , ');
  }, [accept]);

  const onChangeFile = React.useCallback(
    (file?: File, callback?: () => void) => {
      const dispatchCallback = () => {
        if (callback) {
          callback();
        }
      };

      if (file) {
        if (maxSize && file.size > maxSize * 1024) {
          dispatch(
            showMessage({
              variant: 'error',
              message: `اندازه فایل باید کمتر از ${maxSize} کیلوبایت باشد`,
            })
          );
          return;
        }

        onChange(file);
        dispatchCallback();
      } else {
        dispatch(
          openAlertDialog({
            body: 'آیا میخواهید این عکس را پاک کنید ؟',
            title: 'حذف عکس',
            okText: 'حذف',
            onOk: () => {
              onChange(null);
              dispatchCallback();
            },
          })
        );
      }
    },
    [dispatch, maxSize, onChange]
  );

  const onShowFile = React.useCallback(
    (fileToShow?: File) => {
      dispatch(
        openLightBox({ images: [URL.createObjectURL(fileToShow || value)], currentIndex: 0 })
      );
    },
    [dispatch, value]
  );

  if (isUserDeviceAndroid || isUserDeviceIOS)
    return (
      <SmallScreenUploader
        label={label}
        error={error}
        value={value}
        onChange={onChangeFile}
        onShowFile={onShowFile}
        maxSize={maxSize}
        accept={accept}
        acceptDisplayer={acceptDisplayer}
      />
    );

  return (
    <DragingUploader
      label={label}
      error={error}
      value={value}
      onChange={onChangeFile}
      onShowFile={onShowFile}
      maxSize={maxSize}
      accept={accept}
      acceptDisplayer={acceptDisplayer}
    />
  );
}

export default React.memo(FormImageUploader) as <T extends FieldValues>(
  props: RhfImageUploaderProps<T>
) => jsx.JSX.Element;
