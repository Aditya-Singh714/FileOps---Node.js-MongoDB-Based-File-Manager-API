const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();

app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", (req, res) => {
  fs.readdir(`./files`, function (err, files) {
    res.render("index", { files: files });
  });
});

app.get("/files/:filename", function (req, res) {
  const filename = req.params.filename;
  fs.readFile(`./files/${filename}`, "utf-8", function (err, filedata) {
    if (err) {
      return res.status(500).send("Error reading file.");
    }
    res.render("show", { filename: filename, filedata: filedata });
  });
});

app.get("/edit/:filename", function (req, res) {
  const filePath = path.join(__dirname, "files", req.params.filename);

  fs.readFile(filePath, "utf-8", (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).send("File not found");
    }

    res.render("edit", {
      filename: {
        title: req.params.filename,
        content: data,
      },
    });
  });
});

// POST - Save the edited file
app.post("/edit", function (req, res) {
  const { old_title, title, content } = req.body;

  if (!title || !content) {
    return res.status(400).send("Missing title or content");
  }

  const oldPath = path.join(__dirname, "files", old_title);
  const newPath = path.join(__dirname, "files", title);

  fs.writeFile(newPath, content, "utf-8", (err) => {
    if (err) {
      console.error(err);
      return res.status(500).send("Error saving file");
    }

    // If filename changed, delete old file
    if (old_title !== title) {
      fs.unlink(oldPath, (unlinkErr) => {
        if (unlinkErr) {
          console.warn("Failed to delete old file:", unlinkErr);
        }
        res.redirect("/");
      });
    } else {
      res.redirect("/");
    }
  });
});
app.post("/create", (req, res) => {
  const title = req.body.title
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join("_");

  fs.writeFile(`./files/${title}.txt`, req.body.content, function (err) {
    if (err) throw err;
    console.log("File created successfully!");
    res.redirect("/");
  });
});

app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});
