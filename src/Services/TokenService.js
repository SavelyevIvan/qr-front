import { notification } from "antd";
import AuthService from "./AuthService";

const TOKEN = "__TOKEN__";

class TokenService {
  constructor() {
    this._token = JSON.parse(localStorage.getItem(TOKEN) || null) || null;
    this.observers = [];
  }

  getExpirationDate(token) {
    if (!token) {
      return null;
    }

    const jwt = JSON.parse(atob(token.split(".")[1]));

    return (jwt && jwt.exp && jwt.exp * 1000) || null;
  }

  get isLogged() {
    return !!this._token;
  }

  isExpired(exp) {
    if (!exp) {
      return false;
    }
    return Date.now() > exp;
  }

  setToken(token) {
    if (token) {
      localStorage.setItem(TOKEN, JSON.stringify(token));
    } else {
      localStorage.removeItem(TOKEN);
    }
    this._token = token;
    this.notify();
  }

  async getToken() {
    if (!this._token) {
      return null;
    }

    if (this.isExpired(this.getExpirationDate(this._token.accessToken))) {
      try {
        const refreshedToken = await AuthService.refresh(
          this._token.accessToken
        );
        this.setToken(refreshedToken.token);
      } catch (error) {
        notification.open({ message: error.message });
      }
    }
    return this._token.accessToken;
  }

  subscribe(observer) {
    this.observers.push(observer);
  }

  unsubscribe(observer) {
    this.observers = this.observers.filter(
      (_observer) => _observer !== observer
    );
  }

  notify() {
    this.observers.forEach((observer) => observer(this.isLogged));
  }
}

const tokenService = new TokenService();

export default tokenService;
