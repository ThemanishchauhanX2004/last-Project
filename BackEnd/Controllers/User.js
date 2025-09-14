import User from "../Model/UserModel.js";
import bcrypt from "bcrypt";
import validator from "validator";
import jwt from "jsonwebtoken"

export async function signup(req, res) {
  try {
    let { firstName, lastName, userName, password } = req.body;

    
    if (!firstName || !userName || !password) {
      return res.status(400).json({ message: "All required fields must be filled" });
    }

    
    if (!validator.isStrongPassword(password)) {
      return res.status(400).json({
        message:
          "Password must include uppercase, lowercase, number & special character",
      });
    }
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    
    const user = new User({
      firstName,
      lastName,
      userName,
      password: hashedPassword,
    });

    await user.save();

    return res.status(201).json({ message: "User registered successfully", success: true , data : user });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}


export async function login(req, res){
  let {user} = req.body;
 try {
        let token = jwt.sign({ id: user._id }, process.env.SECRET_KEY, { expiresIn: "1d" });
        res.cookie("token", token, {
          secure : false
        }).json({message : "loggedin successfully" , isAdmin : false,
          user : {
            id : user_id,
            firstName : user.firstName,
            lastName : user.lastName,
            userName : user.userName
          }
        })
        console.log(token)
      } 
    catch (error) {
    res.send(error.message);
  }
}

export async function getProfile(req,res){
  let token = req.cookies.token;
  console.log(token)

  if(!token){
    return res.status(401).json({message: "Please login first to continue"})}
    
    let decodedUser = jwt.verify(token,process.env.SECRET_KEY)
    let user = await User.findById(decodedUser.id).select("-password")
    if(!user) return res.send("invalid token")
      res.status(200).json({
    user,
    });
}

export async function logout(req,res){
  try{
    res.clearCookeie("token");
    res.status(200).json({message : "Logged out successfully"})
  }catch(error){
res.status(500).json({message: "Something went wrong" , error : error.message})
  }
}