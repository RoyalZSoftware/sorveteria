/**
 * Creates an `tag` element with attributes and children
 */
function h(tag, attributes, children) {
  const el = document.createElement(tag);
  Object.entries(attributes).forEach((pair) => {
    el.setAttribute(pair[0], pair[1]);
  });
  children.forEach((child) => {
    if (typeof child === 'string') {
      el.innerHTML += child;
    } else
    el.appendChild(child);
  });
  return el;
}

