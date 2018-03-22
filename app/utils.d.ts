declare module '*.css' {
  const content: string | any;
  export default content;
}

declare module '*!raw' {
  const content: string | any;
  export default content;
}

declare module '*.jpg' {
  const content: any;
  export default content;
}