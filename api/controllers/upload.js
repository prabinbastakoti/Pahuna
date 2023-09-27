const download = require('image-downloader');
const path = require('path');

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

module.exports = { uploadByLink };
