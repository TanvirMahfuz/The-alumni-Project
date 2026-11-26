import User from "../models/userModel.js";

// Fields a user may never set on themselves through the profile update
const PROTECTED_FIELDS = ["_id", "__v", "createdAt", "updatedAt", "isAdmin", "posts"];

const updatableFields = () => {
  const fieldNames = Object.keys(User.schema.paths)
    .map((key) => key.split(".")[0])
    .filter((key) => !PROTECTED_FIELDS.includes(key));
  return [...new Set(fieldNames)];
};

export const validateUserUpdate = (id, body) => {
  if (!id || !body) return null;

  const uniqueFields = updatableFields();
  const cleanBody = {};

  // Handle contacts separately
  if (body.contacts && typeof body.contacts === "object") {
    const cleanContacts = {};
    let hasContacts = false;

    for (const contactKey of ["facebook", "github", "linkedin", "portfolio"]) {
      const val = body.contacts[contactKey];
      if (typeof val === "string" && val.trim() !== "") {
        cleanContacts[contactKey] = val.trim();
        hasContacts = true;
      }
    }

    if (hasContacts) {
      cleanBody.contacts = cleanContacts;
    }
  }

  for (const key in body) {
    if (!uniqueFields.includes(key) || key === "contacts") continue;

    if (
      ["name", "session", "email", "image", "bio", "password", "resume"].includes(
        key
      )
    ) {
      if (body[key] !== "" && body[key] !== undefined) {
        cleanBody[key] = body[key];
      }
      continue;
    }

    if (key === "availableForWork") {
      cleanBody[key] = Boolean(body[key]);
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

  if (
    cleanBody.email &&
    (typeof cleanBody.email !== "string" ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cleanBody.email))
  ) {
    throw new Error("Invalid email format");
  }
  if (
    cleanBody.password &&
    (typeof cleanBody.password !== "string" || cleanBody.password.length < 6)
  ) {
    throw new Error("Password must be at least 6 characters");
  }
  return cleanBody;
};
