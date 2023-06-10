import esbuild from "esbuild";
import serve, { error, log } from "@btwiuse/serve";

const isDevServer = process.argv.includes("--dev");

esbuild
  .build({
    entryPoints: ["src/index.tsx"],
    bundle: true,
    outfile: "www/dist/bundle.js",
    loader: {
      ".svg": "dataurl",
    },
    minify: !isDevServer,
    sourcemap: true,
    target: ["chrome58", "firefox57", "safari11", "edge18"],
    define: {
      "process.env.NODE_ENV": isDevServer ? '"development"' : '"production"',
    },
  })
  .catch(() => process.exit(1));

if (isDevServer) {
  serve.start({
    port: 5000,
    root: "./www",
    live: true,
  });
}
