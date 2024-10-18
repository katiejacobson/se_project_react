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
  const token = localStorage.getItem("jwt");
  return fetch(`${baseUrl}/items/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      name: data.name,
      imageUrl: data.imageUrl,
      weather: data.weather,
    }),
  }).then((res) => renderResult(res));
};

export const deleteItems = (id) => {
  const token = localStorage.getItem("jwt");
  return fetch(`${baseUrl}/items/${id}`, {
    method: "DELETE",
    headers: {
      authorization: `Bearer ${token}`,
    },
  }).then((res) => renderResult(res));
};

export const addCardLike = (id, token) => {
  console.log(id);
  return fetch(`${baseUrl}/items/${id}/likes`, {
    method: "PUT",
    headers: {
      authorization: `Bearer ${token}`,
    },
  }).then((res) => renderResult(res));
};

export const removeCardLike = (id, token) => {
  return fetch(`${baseUrl}/items/${id}/likes`, {
    method: "DELETE",
    headers: {
      authorization: `Bearer ${token}`,
    },
  }).then((res) => renderResult(res));
};

export { renderResult };
