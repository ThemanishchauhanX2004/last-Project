import multer from "multer"

// let storage = multer.diskStorage({
//     destination : (req,file,cb)=>{
//         cb(null, "uploads/")
//     },
//     filename:(req,file,cb)=>{
// cb(null,Date.now()+file.originalname);
//     },
// });

// let upload = multer({storage :storage, limits:{
//     limits : {file : 2 * 1024 * 1024 }
// }})

let upload = multer({
    storage: storage,
    limits:{fileSize: 2 * 1024 * 1024}, //2mb file size exceed nhi karega  deepak 17.00

    fileFilter:(req,file,cb)=>{
        if(file.mimetype.startsWith("image/")){
            cb(null, true)
        }
        else{
            cb(new Error('Only image files are allowed!'), false)
        }
    }
})



export const handleMulterError =(error,req, res, next)=>{
    if(error instanceof multer.MulterError){
        if(error.code == "LIMIT_FILE_SIZE"){
            return res.status(400).json({
                error:"File too large. Maximum size is 2MB"
            })
        }
        
        return res.status(400).json({
            error:error.message
        })
    }

    else if(error){
        return res.status(400).json({
            error: error.message
        })
    }

    next()
}



export default upload