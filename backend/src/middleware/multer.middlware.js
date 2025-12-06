import multer from "multer";

const storage = multer.memoryStorage();

const upload = multer({
    storage,
    limits: {
        fileSize: 2 * 1024 * 1024,
    },
    fileFilter: (req, file, cb) => {
     const allowedMimes = ['image/jpeg', 'image/png',  'image/webp'];
      if (allowedMimes.includes(file.mimetype)) {
           cb(null, true);
       } else {
           cb(new Error('Invalid file type. Only JPEG, PNG,  and WebP images are allowed.'), false);
       }
    },
});

export default upload;