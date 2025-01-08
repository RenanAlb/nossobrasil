const express = require("express");
const router = express.Router();
const multer = require("multer");
const cloudinary = require("cloudinary").v2;

// Models
const Posts = require("../modules/posts");

// Config. Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post(
  "/create-blog/:id/:nome",
  upload.single("file"),
  async (req, res) => {
    try {
      const processContent = (content) => {
        content = content.replace(/\n/g, "<br>");
        content = content
          .split("\n\n")
          .map((paragraph) => `<p>${paragraph}</p>`)
          .join("");

        return content;
      };

      const { id, nome } = req.params;
      const { file } = req;
      const { title, subtitle, content, category } = req.body;
      const processedContent = processContent(content);

      if (!file) {
        return res.status(400).json({
          message: "Nenhum arquivo enviado",
          ok: false,
        });
      }

      cloudinary.uploader
        .upload_stream({ resource_type: "image" }, async (error, result) => {
          if (error) {
            return res.status(500).json({
              message: "Erro ao fazer upload para o Cloudinary",
              details: error,
              ok: false,
            });
          }

          try {
            const createBlog = await Posts.create({
              author: id,
              nomeAuthor: nome,
              title,
              subTitle: subtitle,
              content: processedContent,
              imageUrl: result.secure_url,
              category,
            });

            if (!createBlog) {
              return res
                .status(500)
                .json({ message: "Erro ao criar o blog", ok: false });
            }

            return res.status(200).json({
              message: "Upload da imagem do blog realizado com sucesso!",
              response: createBlog,
              ok: true,
            });
          } catch (error) {
            console.error(error);
            return res.status(500).json({
              message: "Erro ao criar o blog no banco de dados",
              details: error,
              ok: false,
            });
          }
        })
        .end(req.file.buffer);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: error, ok: false });
    }
  }
);

router.get("/get-all-blogs", async (req, res) => {
  try {
    const getBlogs = await Posts.find().sort({ data: -1 });

    res.status(200).json({
      message: "Blogs buscados com sucesso!",
      ok: true,
      response: getBlogs,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error, ok: false });
  }
});

router.get("/get-blogs/:category", async (req, res) => {
  try {
    const { category } = req.params;

    const getBlogs = await Posts.find({ category }).sort({ data: -1 });

    res.status(200).json({
      message: "Blogs buscados com sucesso!",
      ok: true,
      response: getBlogs || [],
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error, ok: false });
  }
});

module.exports = router;
