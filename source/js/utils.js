const isEscapeKey = (evt) => evt.key === 'Escape';

const createNode = (tag, text, classNames = [], attributes = []) => {
  const node = document.createElement(tag);

  if (text !== null) {
    node.textContent = text;
  }

  classNames.forEach((className) => {
    node.classList.add(className);
  });

  attributes.forEach(({name, value}) => {
    node.setAttribute(name, value);
  });

  return node;
};

export {isEscapeKey, createNode};
