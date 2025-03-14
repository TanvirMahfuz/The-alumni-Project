import multer from "multer";
import path from "path";
import fs from "fs";

const __dirname = path.dirname(new URL(import.meta.url).pathname);
let uploadDir = path.resolve(__dirname, "../public/uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, {recursive: true});
}
let fileName = null;
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    fileName = Date.now() + "-" + file.originalname;
    cb(null, fileName);
  },
});

const upload = multer({
  storage: storage,
  limits: {fileSize: 10 * 1024 * 1024},
  fileFilter: (req, file, cb) => {
    console.log("multer invoked",file);
    console.log(file.originalname);
    uploadDir = uploadDir.replace("%20", " ");
    console.log(uploadDir, "-----", file.originalname);
    const filetypes = /jpeg|jpg|png/;
    const mimetype = filetypes.test(file.mimetype);
    const extname = filetypes.test(file.originalname.toLowerCase());

    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb("Error: Only images are allowed!");
    }
  },
});

export default upload;
