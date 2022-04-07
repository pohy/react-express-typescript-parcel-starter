import Bundler from "parcel-bundler";
import path from "path";
import express, { Express } from "express";

const app = express();

app.get("/api/health", (req, res) => res.json({ status: "ok" }));

bootstrapClientApp(app);

app.listen(3000, () => console.log("http://localhost:3000"));

function bootstrapClientApp(app: Express) {
  if (process.env.NODE_ENV === "production") {
    app.use(express.static("dist/client"));
  } else {
    const indexHtmlPath = path.resolve(__dirname, "..", "client", "index.html");
    const bundler = new Bundler(indexHtmlPath, {
      outDir: "dist/client",
      autoInstall: true,
    });
    app.use(bundler.middleware());
  }
}
