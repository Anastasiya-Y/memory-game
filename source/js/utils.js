const isEscapeKey = (evt) => evt.key === 'Escape';

const createNode = (tag, text, classNames = [], attributes = {}) => {
  const node = document.createElement(tag);

  if (text !== null) {
    node.textContent = text;
  }

  classNames.forEach((className) => {
    node.classList.add(className);
  });

  for (const [name, value] of Object.entries(attributes)) {
    if (value !== null) {
      node.setAttribute(name, value);
    }
  }

  return node;
};

export {isEscapeKey, createNode};
