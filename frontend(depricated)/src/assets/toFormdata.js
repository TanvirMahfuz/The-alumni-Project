export const toFormdata = async (user) => {
  const formData = new FormData();
  
  // Basic fields
  formData.append("name", user.name);
  formData.append("email", user.email);
  formData.append("password", user.password);
  formData.append("confirmPassword", user.confirmPassword);

  // File fields
  if (user.image) {
    formData.append("profileImage", user.image); 
  }

  // Education (Array)
  user.education.forEach((edu, index) => {
    formData.append(`education[${index}][degree]`, edu.degree || '');
    formData.append(`education[${index}][institute]`, edu.institute || '');
    formData.append(`education[${index}][startDate]`, edu.startDate || '');
    formData.append(`education[${index}][endDate]`, edu.endDate || '');
  });

  // Contacts (Object)
  Object.keys(user.contacts).forEach((key) => {
    formData.append(`contacts[${key}]`, user.contacts[key] || '');
  });

  // Job Experience (Array)
  user.jobExperience.forEach((job, index) => {
    formData.append(`jobExperience[${index}][title]`, job.title || '');
    formData.append(`jobExperience[${index}][company]`, job.company || '');
    formData.append(`jobExperience[${index}][startDate]`, job.startDate || '');
    formData.append(`jobExperience[${index}][endDate]`, job.endDate || '');
    formData.append(`jobExperience[${index}][description]`, job.description || '');
  });

  // Currently Working In (Array)
  user.currentlyWorkingIn.forEach((work, index) => {
    formData.append(`currentlyWorkingIn[${index}][title]`, work.title || '');
    formData.append(`currentlyWorkingIn[${index}][techStack]`, work.techStack || '');
    formData.append(`currentlyWorkingIn[${index}][description]`, work.description || '');
  });

  // Skills (Array)
  user.skills.forEach((skill, index) => {
    formData.append(`skills[${index}][title]`, skill.title || '');
    formData.append(`skills[${index}][image]`, skill.image || '');
    formData.append(`skills[${index}][level]`, skill.level || 0);
  });

  // Projects (Array)
  user.projects.forEach((project, index) => {
    formData.append(`projects[${index}][projectName]`, project.projectName || '');
    formData.append(`projects[${index}][projectDescription]`, project.projectDescription || '');
    formData.append(`projects[${index}][projectLink]`, project.projectLink || '');
  });

  // Resume file
  if (user.resume) {
    formData.append("resume", user.resume); 
  }

  // Other fields
  formData.append("bio", user.bio || '');
  formData.append("availableForWork", user.availableForWork);
  formData.append("futureInterests", JSON.stringify(user.futureInterests) || '[]');
  formData.append("isAdmin", user.isAdmin);

  return formData;
};
