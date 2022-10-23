/// <reference types="vite/client" />

declare module '*.css';

interface ImportMeta {
  env: {
    API_HOST: 'localhost:3030';
  };
}
