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

  // Get valid field names from schema
  const validFields = Object.keys(User.schema.paths)
    .filter((key) => !["_id", "__v", "createdAt", "updatedAt"].includes(key))
    .map((key) => key.split(".")[0]);
  const uniqueFields = [...new Set(validFields)];

  // Create clean body object
  const cleanBody = {};

  for (const key in body) {
    if (!uniqueFields.includes(key)) continue;

    // Handle primitive fields
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

    // Handle boolean field
    if (key === "availableForWork" || key === "isAdmin") {
      cleanBody[key] = body[key];
      continue;
    }

    // Handle contacts object
    if (key === "contacts") {
      const cleanContacts = {};
      let hasContacts = false;

      for (const contactKey in body[key]) {
        if (body[key][contactKey] && body[key][contactKey] !== "") {
          cleanContacts[contactKey] = body[key][contactKey];
          hasContacts = true;
        }
      }

      if (hasContacts) cleanBody[key] = cleanContacts;
      continue;
    }

    // Handle array fields
    if (Array.isArray(body[key])) {
      const cleanArray = body[key]
        .filter((item) => {
          if (!item || typeof item !== "object") return false;

          // Special handling for currentlyWorkingIn/haveWorkedIn
          if (key === "currentlyWorkingIn" || key === "haveWorkedIn") {
            return !(
              (item.title === "none" || item.title === "") &&
              item.techStack === "" &&
              item.description === ""
            );
          }

          // Filter empty objects from arrays
          return !Object.values(item).every(
            (val) => val === "" || val === undefined || val === null
          );
        })
        .map((item) => {
          // Clean each item in array
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

  // Special validation for email format if email is being updated
  if (cleanBody.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cleanBody.email)) {
    throw new Error("Invalid email format");
  }

  // Special validation for password length if password is being updated
  if (cleanBody.password && cleanBody.password.length < 6) {
    throw new Error("Password must be at least 6 characters");
  }

  return cleanBody;
};
