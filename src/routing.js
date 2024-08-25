const navItems = Array.from(document.getElementsByClassName('nav-item'));

navItems.forEach((navItem) => {
  console.log(navItem);
  let href = navItem.getAttribute("href");

  if (!href)
    return;
  href = href.replaceAll(".html", "").replaceAll("./", "");

  const isActive = window.location.pathname.includes(href);

  if (isActive) {
    navItem.style.color = "var(--accent)";
    navItem.style.stroke = "var(--accent)";
  }
  else
    navItem.style.color = 'unset';
});
