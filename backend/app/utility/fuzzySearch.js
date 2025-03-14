import Fuse from "fuse.js";
export const fuzzySearch = async (category, transformedUsers, value) => {
  // Set up Fuse.js options
  const fuseOptions = {
    keys: [category === "company" ? "jobExperienceCompanies" : category],
    threshold: 0.3,
    distance: 100, // Consider matches within a distance
    ignoreLocation: true, // Make search more flexible
  };

  const fuse = new Fuse(transformedUsers, fuseOptions);

  const fuzzyResults = fuse.search(value).map((result) => result.item);
  return fuzzyResults;
};
