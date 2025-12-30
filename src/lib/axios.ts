import axios from "axios";

// export const axiosInstance = axios.create({
//   baseURL: import.meta.env.MODE === "development" ? "http://localhost:3000/api" : "/api",
//   withCredentials: true,
// });

const app_axios = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  withCredentials: true,
});

// app_axios.request.use(
//   async (config) => {
//     const cookieStore = await cookies();
//     const token = cookieStore.get("accessToken")?.value;
//     if (token) {
//       config.headers.Authorization = `${token}`;
//     }
//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

export default app_axios;
