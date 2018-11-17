const api = {
  googleSignIn: 'https://accounts.google.com/o/oauth2/v2/auth',
  clientId: '415556891643-c82vsbkf8dur3dqf1u9jl622qc6l9bie.apps.googleusercontent.com',
  dnd: /localhost/i.test(window.location.hostname) ? 'http://localhost:8080/api' : '/api',
}

export default api
