// Tipos das importações do vite-imagetools com &as=metadata
type ImageVersion = { src: string; width: number; height: number; format: string };

declare module '*&as=metadata' {
  const versions: ImageVersion[];
  export default versions;
}

declare module '*&quality=78' {
  const src: string;
  export default src;
}
