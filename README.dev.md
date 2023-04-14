# Developer Readme

> Helpfull stuff for Contributions / Developers

- Chrome V3 Manifest Format: https://developer.chrome.com/docs/extensions/mv3/manifest/
- Chrome Extensions api docs: https://developer.chrome.com/docs/extensions/reference/

## Configuring Rollup in Vite to output multiple entrypoints 

Needed for html entrypoints (for example chromes option.html or popup.html),
together with js entrypoints, specifically background.js service worker entrypoint 

https://github.com/vitejs/vite/discussions/1736

=> rollup config of vite library mode: https://github.com/vitejs/vite/blob/main/packages/vite/src/node/build.ts#L345-L372 
=> Adjust to my own liking - use only rollup options like this: 

```
 rollupOptions: {
      output: {
        entryFileNames: `[name].js`,
        // deactivates hashes in file names
        // chunkFileNames: `[name].js`,
        // assetFileNames: `[name].[ext]`,
      },
      input: {
        background: path.resolve("src/background.ts"),
        options: path.resolve("./src/pages/options.html"),
        popup: path.resolve("./src/pages/popup.html"),
      },
    },

```