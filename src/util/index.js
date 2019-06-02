function authHeader() {
  // return authorization header with jwt token
  let user = JSON.parse(localStorage.getItem('user'));

  if (user && user.accessToken && user.accessToken.jwtToken) {
      return { 'Authorization': user.accessToken.jwtToken };
  } else {
      return {};
  }
}

export default {
  authHeader,
}
