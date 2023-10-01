import formidable from 'formidable';
import { NextApiHandler } from 'next';
import cloudinary from '@/lib/cloudinary';
import { readFile } from '@/lib/utils';

export const config = {
  api: {
    bodyParser: false,
  },
};

const handler: NextApiHandler = (req, res) => {
  const { method } = req;

  switch (method) {
    case 'POST':
      return uploadNewImage(req, res);
    case 'GET':
      return readAllImage(req, res);

    default:
      return res.status(404).send('Not Found!');
  }
};

const uploadNewImage: NextApiHandler = (req, res) => {
  const form = formidable();
  form.parse(req, async (err, fields, files) => {
    try {
      if (err)
        return res.status(500).json({
          error: err.message,
        });

      const imageFile = files.image as formidable.File;

      const { secure_url: url } = await cloudinary.uploader.upload(imageFile.filepath, {
        folder: 'dev-blogs',
      });

      res.json({ src: url });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });
};

const readAllImage: NextApiHandler = async (req, res) => {
  try {
    const { resources } = await cloudinary.api.resources({
      resource_type: 'image',
      type: 'upload',
      prefix: 'dev-blogs',
    });

    const images = resources.map(({ secure_url }: any) => ({
      src: secure_url,
    }));
    res.json({ images });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export default handler;
