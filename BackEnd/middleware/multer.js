import multer from "multer"

let storage = multer.diskStorage({
    destination : (req,file,cb)=>{
        cb(null, "uploads/")
    },
    filename:(req,file,cb)=>{
cb(null,Date.now()+file.originalname);
    },
});

let upload = multer({storage :storage, limits:{
    limits : {file : 2 * 1024 * 1024 }
}})

export default upload