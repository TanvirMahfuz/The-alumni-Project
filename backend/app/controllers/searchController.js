import searchService from "../services/searchServices.js";

const searchController = async (req, res) => {
  const {category, value} = req.query;
  if (!category || !value) {
    return res
      .status(400)
      .json({error: "Both category and value are required"});
  }

  try {
    const results = await searchService(category, value);
    // console.log(results);
    // const filteredresults = results.map(({name, email, jobExperience}) => ({
    //   name,
    //   email,
    //   jobExperience: jobExperience.map(({post, company}) => ({
    //     post,
    //     company,
    //   })),
    // }));

    res.status(200).json({
      message: "Search results",
      results,
    });
  } catch (error) {
    res.status(500).json({error: "Internal Server Error"});
  }
};

export default searchController;
