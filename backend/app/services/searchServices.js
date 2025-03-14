import {fuzzySearch} from "../utility/fuzzySearch.js";
import {findAllUser} from "./userServices.js";
const searchService = async (category, value) => {
  try {
    const users = await findAllUser();
    const transformedUsers = users.map((user) => ({
      ...user._doc,
      jobExperienceCompanies: user.jobExperience
        .map((job) => job.company)
        .join(" "), // Flatten company names
    }));
    const res = await fuzzySearch(category, transformedUsers, value);
    if (!res) return null;
    return res;
  } catch (error) {
    console.error("Search error:", error);
    throw error;
  }
};

export default searchService;
