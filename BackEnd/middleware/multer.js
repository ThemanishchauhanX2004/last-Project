import multer from "multer";

let storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname)
});

let upload = multer({
  storage,
  limits: { fileSize: 2 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith("image/")) cb(null, true);
    else cb(new Error("Only image files are allowed!"), false);
  }
});

// Error handler
export const handleMulterError = (error, req, res, next) => {
  if (error) return res.status(400).json({ error: error.message });
  next();
};

export default upload;
