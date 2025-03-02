onload = () => {
  const c = setTimeout(() => {
    const section = document.querySelector(".not-loaded");
    section.classList.remove("not-loaded");
    clearTimeout(c);
  }, 1000);
};