export const environment = {
  production: true,
  authority: 'http://bc60f599-5d67-4bee-b809-4724fbf6b594.k8s.civo.com/',
  clientId: 'AngularClient',
  redirectUri: 'http://bc60f599-5d67-4bee-b809-4724fbf6b594.k8s.civo.com:31112/function/kitchen-web.openfaas-fn',
  responseType: 'id_token token',
  scope: 'openid bookservice chapterservice',
  bookService: 'http://bc60f599-5d67-4bee-b809-4724fbf6b594.k8s.civo.com:31112/function/kitchen-book-api.openfaas-fn',
  chapterService: 'http://bc60f599-5d67-4bee-b809-4724fbf6b594.k8s.civo.com:31112/function/kitchen-chapter-api.openfaas-fn'
};
