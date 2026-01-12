// "use server";
"use client";

import axios from "axios";
// import { cookies } from "next/headers";
// import { cookies } from "next/headers";

// export const axiosInstance = axios.create({
//   baseURL: import.meta.env.MODE === "development" ? "http://localhost:3000/api" : "/api",
//   withCredentials: true,
// });

const app_axios = axios.create({
  // baseURL: process.env.NEXT_PUBLIC_BASE_URL_LOCAL || process.env.NEXT_PUBLIC_BASE_URL_LIVE,
  baseURL: process.env.NEXT_PUBLIC_BASE_URL_LIVE,
  withCredentials: true,
});

// app_axios.request.use(
//   async (config) => {
//     const cookieStore = await cookies();
//     const token = cookieStore.get("accessToken")?.value;
//     console.log("token", token);

//     if (token) {
//       config.headers.Authorization = `${token}`;
//     }
//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

// app_axios.interceptors.request.use((config) => {
//   const token = req.cookies?.accessToken || req.headers.authorization;

//   console.log("token", token);

//   if (token) {
//     config.headers.Authorization = `${token}`;
//   }

//   return config;
// });

export default app_axios;
