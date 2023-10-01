import Editor, { FinalPost } from '@/components/editor';
import AdminLayout from '@/components/layout/AdminLayout';
import { generateFormData } from '@/utils/helper';
import axios from 'axios';
import { FC } from 'react';

interface Props {}

const Create: FC<Props> = (props): JSX.Element => {
  const handleSubmit = async (post: FinalPost) => {
    try {
      // GENERATE FORM DATA
      const formData = generateFormData(post);

      // SUBMIT OUR POST
      const { data } = await axios.post('/api/posts', formData);
      console.log(data);
    } catch (error: any) {
      console.log(error.response.data);
    }
  };
  return (
    <AdminLayout title="New Post">
      <div className="max-w-4xl mx-auto">
        <Editor onSubmit={handleSubmit} btnTitle="Submit" />
      </div>
    </AdminLayout>
  );
};

export default Create;
