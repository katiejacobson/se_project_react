function renderResult(res) {
  if (res.ok) {
    return res.json();
  } else {
    return Promise.reject(`'Error:' ${res.status}`);
  }
}

export const getItems = () => {
  return fetch("http://localhost:3001/items/").then((res) => renderResult(res));
};

export const addItems = (data) => {
  return fetch("http://localhost:3001/items/", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      name: data.name,
      imageUrl: data.imageUrl,
      weather: data.weather,
    }),
  });
};

//   deleteCard(data) {
//     return this._request(`${this._baseUrl}/cards/${data}`, {
//       method: "DELETE",
//       headers: this._headers,
//     });
//   }
