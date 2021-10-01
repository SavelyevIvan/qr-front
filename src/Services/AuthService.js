import ApiService from "./ApiService";
import tokenService from "./TokenService";

const AuthService = {
  login(values) {
    ApiService.post("/auth/login", values, false).then(({ token }) => {
      tokenService.setToken(token);
    });
  },

  register(values) {
    return ApiService.post("/auth/register", values, false);
  },

  refresh(oldAccessToken) {
    return ApiService.post("/auth/session/update", { oldAccessToken }, false);
  },

  logout() {
    tokenService.setToken();
  },
};
export default AuthService;
