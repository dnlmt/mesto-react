class Api {
  constructor({ url, headers }) {
    this._url = url;
    this._headers = headers;
  }

  _safeResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  _request(url, options) {
    return fetch(url, options).then(this._safeResponse);
  }

  getUserInfo() {
    return this._request(`${this._url}/users/me`, {
      method: "GET",
      headers: this._headers,
    });
  }

  setUserInfo(info) {
    return this._request(`${this._url}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name: info.name,
        about: info.about,
      }),
    });
  }

  getInitialCards() {
    return this._request(`${this._url}/cards`, {
      method: "GET",
      headers: this._headers,
    });
  }

  addCard(card) {
    return this._request(`${this._url}/cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify(card),
    });
  }

  deleteCard(id) {
    return this._request(`${this._url}/cards/${id}`, {
      method: "DELETE",
      headers: this._headers,
    });
  }

  setAvatar(data) {
    return this._request(`${this._url}/users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify(data),
    });
  }

  like(id) {
    return this._request(`${this._url}/cards/${id}/likes`, {
      method: "PUT",
      headers: this._headers,
    });
  }

  unlike(id) {
    return this._request(`${this._url}/cards/${id}/likes`, {
      method: "DELETE",
      headers: this._headers,
    });
  }

  changeLikeCardStatus(id, isLiked) {
    if (isLiked) {
      return this.like(id);
    } else {
      return this.unlike(id);
    }
  }
}

const api = new Api({
  url: "https://mesto.nomoreparties.co/v1/cohort-75",
  headers: {
    authorization: "c4e6ca55-829f-4091-982f-7d20c0c115fd",
    "Content-Type": "application/json",
  },
});

export default api;
