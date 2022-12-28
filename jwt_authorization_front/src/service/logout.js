export default function removeAccess() {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");
  localStorage.removeItem("loggedIn");
  window.location.href = "/login";
}
