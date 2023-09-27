const download = require('image-downloader');
const path = require('path');
const fs = require('fs');

const upload = async (req, res) => {
  const uploadedPhotos = [];

  for (let i = 0; i < req.files.length; i++) {
    const { originalname, path } = req.files[i];
    const parts = originalname.split('.');
    const ext = parts[parts.length - 1];
    const newPath = path + '.' + ext;
    fs.renameSync(path, newPath);
    uploadedPhotos.push(newPath.replace('uploads/', ''));
  }
  res.json(uploadedPhotos);
};

const uploadByLink = async (req, res) => {
  const { link } = req.body;

  const newName = 'photo' + Date.now() + '.jpg';

  const pathname = path.join(__dirname, '../', 'uploads', newName);

  await download.image({
    url: link,
    dest: pathname,
  });

  res.json(newName);
};

module.exports = { upload, uploadByLink };
