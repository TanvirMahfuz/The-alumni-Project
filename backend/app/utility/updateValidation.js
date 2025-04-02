import User from "../models/userModel.js";
import mongoose from "mongoose";
function field_selectors(){
   const fieldNames = Object.keys(User.schema.paths)
     .filter(
       (key) =>
         !["_id", "__v", "isAdmin", "updatedAt", "createdAt"].includes(key)
     )
     .map((key) => key.split(".")[0]); 
     return [...new Set(fieldNames)];
}

export const updateValidation = (id,body)=>{
  if (!id || !body) return null;
  const uniqueFieldNames = field_selectors();
  for (let key in body) {
    if (!uniqueFieldNames.includes(key)) {
      delete body[key];
    }
  }
  return body;
}