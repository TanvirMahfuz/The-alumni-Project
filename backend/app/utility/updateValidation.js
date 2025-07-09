import User from "../models/userModel.js";
import mongoose from "mongoose";

function field_selectors() {
  const fieldNames = Object.keys(User.schema.paths)
    .filter(
      (key) =>
        !["_id", "__v", "isAdmin", "updatedAt", "createdAt"].includes(key)
    )
    .map((key) => key.split(".")[0]);
  return [...new Set(fieldNames)];
}

export const validateUserUpdate = (id, body) => {
  if (!id || !body) return null;

  const validFields = Object.keys(User.schema.paths)
    .filter((key) => !["_id", "__v", "createdAt", "updatedAt"].includes(key))
    .map((key) => key.split(".")[0]);
  const uniqueFields = [...new Set(validFields)];

  const cleanBody = {};

  // ✅ Handle contacts separately
  if (body.contacts && typeof body.contacts === "object") {
    const cleanContacts = {};
    let hasContacts = false;

    for (const contactKey of ["facebook", "github", "linkedin", "portfolio"]) {
      const val = body.contacts[contactKey];
      if (val && val.trim() !== "") {
        cleanContacts[contactKey] = val.trim();
        hasContacts = true;
      }
    }

    if (hasContacts) {
      cleanBody.contacts = cleanContacts;
      
    }
  }
  console.log(cleanBody);

  // ✅ Loop for the rest of the fields
  for (const key in body) {
    if (!uniqueFields.includes(key) || key === "contacts") continue;

    if (
      [
        "name",
        "session",
        "email",
        "image",
        "bio",
        "password",
        "resume",
      ].includes(key)
    ) {
      if (body[key] !== "" && body[key] !== undefined) {
        cleanBody[key] = body[key];
      }
      continue;
    }

    if (key === "availableForWork" || key === "isAdmin") {
      cleanBody[key] = body[key];
      continue;
    }

    if (Array.isArray(body[key])) {
      const arrayValue = body[key];

      if (
        arrayValue.every(
          (item) =>
            typeof item !== "object" &&
            item !== "" &&
            item !== undefined &&
            item !== null
        )
      ) {
        cleanBody[key] = arrayValue;
        continue;
      }

      const cleanArray = arrayValue
        .filter((item) => {
          if (!item || typeof item !== "object") return false;

          if (key === "currentlyWorkingIn" || key === "haveWorkedIn") {
            return !(
              (item.title === "none" || item.title === "") &&
              item.techStack === "" &&
              item.description === ""
            );
          }

          return !Object.values(item).every(
            (val) => val === "" || val === undefined || val === null
          );
        })
        .map((item) => {
          const cleanItem = {};
          for (const itemKey in item) {
            if (item[itemKey] !== "" && item[itemKey] !== undefined) {
              cleanItem[itemKey] = item[itemKey];
            }
          }
          return cleanItem;
        });

      if (cleanArray.length > 0) cleanBody[key] = cleanArray;
    }
  }

  if (cleanBody.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cleanBody.email)) {
    throw new Error("Invalid email format");
  }

  if (cleanBody.password && cleanBody.password.length < 6) {
    throw new Error("Password must be at least 6 characters");
  }
  // console.log(cleanBody);
  
  return cleanBody;
};

