declare module '*.json' {
  let value: any;
  export default value;
}
declare module 'json!*' {
  let value: any;
  export default value;
}

declare var env: {
  sw: boolean;
  mode: string;
  api: {
    url: string;
  }
};
