import { Config } from '@stencil/core';

export const config: Config = {
  namespace: 'icons',
  outputTargets: [
    {
      type: 'dist',
      esmLoaderPath: '../loader'
    },
    {
      type: 'docs-readme'
    },
    {
      type: 'www',
      // copy:[
      //   { src: "svg" }
      // ],
      serviceWorker: null // disable service workers
    }
  ]
};
