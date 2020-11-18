export const environment = {
  production: true,
  authority: 'http://localhost:5000',
  clientId: 'AngularClient',
  redirectUri: 'http://localhost:4200',
  responseType: 'id_token token',
  scope: 'openid bookservice chapterservice',
  bookservice: 'http://localhost:5002',
  chapterservice: 'http://localhost:5001'
};
