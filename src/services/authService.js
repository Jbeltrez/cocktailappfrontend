const API_URL = "http://localhost:8080/api";

export const authService = {
  login: async (username, password) => {
    const response = await fetch(`${API_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });

    if (!response.ok) {
      throw new Error("Login failed");
    }

    const data = await response.json();
    localStorage.setItem("token", data.token);
    localStorage.setItem("username", username);
    return data;
  },

  register: async (username, password) => {
    try {
      const response = await fetch(`${API_URL}/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.text();

      if (!response.ok) {
        throw new Error(data || "Registration failed");
      }

      console.log("Registration successful:", data);
      return data;
    } catch (error) {
      console.error("Registration error:", error);
      throw error;
    }
  },

  logout: () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
  },

  isAuthenticated: () => {
    return !!localStorage.getItem("token");
  },
};
