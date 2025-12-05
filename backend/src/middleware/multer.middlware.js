import multer, { diskStorage } from "multer";

const storage = diskStorage({});

const upload = multer({
    storage,
    limits: {
        fileSize: 2 * 1024 * 1024,
    },
});

export default upload;