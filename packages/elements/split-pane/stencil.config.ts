import { Config } from "@stencil/core";

export const config: Config = {
  globalStyle: "src/global.css",
  namespace: "split-pane",
  outputTargets: [
    {
      esmLoaderPath: "../loader",
      type: "dist",
    },
    {
      type: "docs-readme"
    },
    {
      serviceWorker: null, // disable service workers
      type: "www",
    }
  ]
};
