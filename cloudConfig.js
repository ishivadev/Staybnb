const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');

//To connect with cloudinary account
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET
})

//storage location
const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
      folder: 'staybnb_DEV',
      allowedFormats: ["png", "jpg", "jpeg"], // supports promises as well
    },
  });

module.exports = { cloudinary, storage }