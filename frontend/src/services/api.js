const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

const getHeaders = (token) => ({
  "Content-Type": "application/json",
  ...(token && { Authorization: `Bearer ${token}` }),
});

export const api = {
  get: async (endpoint, token) => {
    const res = await fetch(`${BASE_URL}${endpoint}`, {
      headers: getHeaders(token),
    });
    if (!res.ok) throw new Error(await res.text());
    return res.json();
  },
  post: async (endpoint, body, token) => {
    const res = await fetch(`${BASE_URL}${endpoint}`, {
      method: "POST",
      headers: getHeaders(token),
      body: JSON.stringify(body),
    });
    if (!res.ok) throw new Error(await res.text());
    return res.json();
  },
};
