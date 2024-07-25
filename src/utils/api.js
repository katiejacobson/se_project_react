function renderResult(res) {
  if (res.ok) {
    return res.json();
  } else {
    return Promise.reject(`'Error:' ${res.status}`);
  }
}

export const getItems = () => {
  return fetch(`http://localhost:3001/items/`).then((res) => renderResult(res));
};
