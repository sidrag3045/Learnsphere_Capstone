
export const getInitialDarkMode = () => {
  return localStorage.getItem('theme') === 'dark';
};

export const setDarkMode = (isDark) => {
  const root = document.documentElement;
  root.classList.toggle('dark', isDark); // ✅ Adds or removes "dark" class on <html>
  localStorage.setItem('theme', isDark ? 'dark' : 'light');
};
