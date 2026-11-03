import axios from "axios";

const baseURL = (import.meta.env.VITE_API_URL || "http://localhost:5000").replace(/\/$/, "");

export const api = axios.create({ baseURL: `${baseURL}/api`, timeout: 6000 });

export const fetchProjects = () => api.get("/projects").then((r) => r.data?.data ?? []);
export const fetchProject = (slug) => api.get(`/projects/${slug}`).then((r) => r.data?.data ?? null);
