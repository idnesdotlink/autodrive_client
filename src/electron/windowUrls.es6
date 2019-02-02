const urlBase = `http://localhost:9080`;
const fileBase = `file://${__dirname}/index.html`;
const dev = process.env.NODE_ENV === 'development';
const toUrl = function (path) {
  if (path === '/') path = '';
  let value = dev ? urlBase + path : fileBase + path;
  return value;
}
const mainUrl = toUrl('/');
const introUrl = toUrl('#/intro');
const installUrl = toUrl('#/install');

export default {
  introUrl,
  mainUrl,
  installUrl,
}
