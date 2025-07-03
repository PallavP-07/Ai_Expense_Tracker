import { create } from "zustand";

const useThemeChanger = create((set) => ({
  theme: localStorage.getItem("app_theme") || "light",

  setTheme: (theme) => {
    localStorage.setItem("app_theme", theme);
    document.documentElement.classList.remove("light", "dark");
    document.documentElement.classList.add(theme);
    set({ theme });
  },
  toggleTheme: () =>
    set((state) => {
      const newTheme = state.theme === "light" ? "dark" : "light";
      localStorage.setItem("app_theme", newTheme);
      document.documentElement.classList.remove("light", "dark");
      document.documentElement.classList.add(newTheme);
      return { theme: newTheme };
    }),
}));


export default useThemeChanger;