// export const baseUrl = "http://localhost:8080";
// const token = localStorage.getItem("token");

// export const baseUrl = import.meta.env.VITE_API_BASE_URL;

const SummaryApi = {
  signUp: {
    url: `/api/auth/register`,
    method: "POST",
  },

  login: {
    url: `/api/auth/login`,
    method: "POST",
  },

  getAllProject: {
    url: `/api/project/getAllproject`,
    method: "GET",
  },

  createProject: {
    url: `/api/project/createProject`,
    method: "POST",
  },

  getSingleProject: (id) => ({
    url: `/api/project/getSingleProject/${id}`,
    method: "GET",
  }),

  deleteProject: (id) => ({
    url: `/api/project/deleteProject/${id}`,
    method: "DELETE",
  }),

  createTask: {
    url: `/api/task/create-task`,
    method: "POST",
  },
  searchProjects: {
    url: "/api/project/search-projects",
    method: "GET",
  },
};

export default SummaryApi;













