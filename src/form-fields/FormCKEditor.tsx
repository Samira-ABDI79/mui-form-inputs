import { memo, JSX } from 'react';
import { useController, FieldValues } from 'react-hook-form';
import CKEditor from '../components/CKEditor/CKEditor';
import { Typography, Box } from '@mui/material';
import EventInfo from '@ckeditor/ckeditor5-utils/src/eventinfo';
import Editor from '@ckeditor/ckeditor5-build-classic';
import { RhfCKEditorProps } from './types';

function FormCKEditor<T extends FieldValues>({ control, name, rules }: RhfCKEditorProps<T>) {
  const {
    field: { onChange, value },
    fieldState: { error },
  } = useController({
    name,
    control,
    rules,
  });

  const onEditorChange = (event: EventInfo<string, unknown>, editor: Editor) => {
    const data = editor.getData();
    onChange(data);
  };

  return (
    <Box
      sx={(theme) => ({
        outline: error ? `1px solid ${theme.palette.error.main}` : 'initial',
      })}
    >
      <CKEditor value={value} onChange={onEditorChange} />
      {error && (
        <Typography color="error" className="mt-5 mb-10">
          {error?.message}
        </Typography>
      )}
    </Box>
  );
}

export default memo(FormCKEditor) as <T extends FieldValues>(
  props: RhfCKEditorProps<T>
) => JSX.Element;
