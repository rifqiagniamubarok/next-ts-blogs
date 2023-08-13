import Editor from '@/components/editor';
import AdminLayout from '@/components/layout/AdminLayout';
import { FC } from 'react';

interface Props {}

const Create: FC<Props> = (props): JSX.Element => {
  return (
    <AdminLayout>
      <Editor />
    </AdminLayout>
  );
};

export default Create;
