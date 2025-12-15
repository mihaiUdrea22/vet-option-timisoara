const ADMIN_AUTH_KEY = "admin_auth";

const expectedPassword = import.meta.env.VITE_ADMIN_PASSWORD;

export function isAdminAuthenticated() {
  return localStorage.getItem(ADMIN_AUTH_KEY) === "1";
}

export function loginAsAdmin(password: string) {
  if (!expectedPassword) {
    throw new Error("Variabila VITE_ADMIN_PASSWORD nu este setată");
  }

  if (password !== expectedPassword) {
    return false;
  }

  localStorage.setItem(ADMIN_AUTH_KEY, "1");
  return true;
}

export function logoutAdmin() {
  localStorage.removeItem(ADMIN_AUTH_KEY);
}

