const baseUrl = "http://localhost:3001";

function renderResult(res) {
  if (res.ok) {
    return res.json();
  } else {
    return Promise.reject(`'Error:' ${res.status}`);
  }
}

export const getItems = () => {
  return fetch(`${baseUrl}/items/`).then((res) => renderResult(res));
};

export const addItems = (data) => {
  return fetch(`${baseUrl}/items/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      name: data.name,
      imageUrl: data.imageUrl,
      weather: data.weather,
    }),
  }).then((res) => renderResult(res));
};

export const deleteItems = (id) => {
  return fetch(`${baseUrl}/items/${id}`, {
    method: "DELETE",
  }).then((res) => renderResult(res));
};

export { renderResult };
