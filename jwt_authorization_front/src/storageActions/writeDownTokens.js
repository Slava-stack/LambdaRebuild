export default function writeDownTokens(access, refresh) {
  localStorage.setItem("accessToken", access);
  localStorage.setItem("refreshToken", refresh);
}
