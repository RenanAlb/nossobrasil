const express = require("express");
const router = express.Router();
const bcyptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Models
const Users = require("../modules/users");

const verificarToken = (req, res, next) => {
  const token = req.headers["authorization"]?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Token não fornecido" });
  }

  jwt.verify(token, process.env.JWT_SECRET, (error, decoded) => {
    if (error) {
      return res.status(401).json({ message: "Token inválido" });
    }

    req.user = decoded;
    next();
  });
};

router.post("/create-user", async (req, res) => {
  try {
    const { nome, email, senha } = req.body;

    const verifyUser = await Users.findOne({ email });

    if (verifyUser) {
      return res
        .status(500)
        .json({ message: "Usuário já existente", ok: false });
    }

    const hash = await bcyptjs.hash(senha, 13);

    const addNewUser = await Users.create({ nome, email, senha: hash });

    const token = jwt.sign(
      {
        nome: nome,
        email: email,
        id: addNewUser._id,
      },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    console.log("token criado (cadastro) => ", token);

    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.status(200).json({
      message: "Usuário criado com sucesso!",
      ok: true,
      response: addNewUser,
      token,
    });
  } catch (error) {
    console.error("Erro ao criar o usuário => ".error);
    res.status(500).json({ message: error, ok: false });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, senha } = req.body;

    const validarEmail = await Users.findOne({ email });

    if (!validarEmail) {
      return res
        .status(500)
        .json({ message: "Erro, usuário não encontrado", ok: false });
    }

    const validarHash = await bcyptjs.compare(senha, validarEmail.senha);

    if (!validarHash) {
      return res.status(401).json({ message: "Senha incorreta", ok: false });
    }

    const token = jwt.sign(
      {
        nome: validarEmail.nome,
        email: validarEmail.email,
        id: validarEmail._id,
      },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    console.log("token criado (login) => ", token);

    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.status(200).json({
      message: "Usuário logado com sucesso!",
      ok: true,
      response: validarEmail,
      token,
    });
  } catch (error) {
    console.error("Erro ao criar o usuário => ".error);
    res.status(500).json({ message: error, ok: false });
  }
});

router.get("/dados-user", verificarToken, async (req, res) => {
  console.log("Analisando cookie", req.user);
  try {
    if (req.user) {
      return res.status(200).json({
        message: "Dados do usuário obtidos com sucesso!",
        ok: true,
        response: req.user,
      });
    } else {
      return res
        .status(500)
        .json({ message: "Erro ao obter os dados do usuário", ok: false });
    }
  } catch (error) {
    console.error("Erro ao buscar os dados do usuário! => ".error);
    res.status(500).json({ message: error, ok: false });
  }
});

module.exports = router;
