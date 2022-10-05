
const express = require("express");
const router = express.Router();
const Editais = require("../../models/Edital");

//======== GET =============
router.get("/", async (req, res) => {
  try {
    const editais = await Editais.find();
    if (!editais) throw Error("Algo deu errado ao procurar o post!");
    res.status(200).json(editais);
  } catch (err) {
    res.status(400).json({
      msg: err,
    });
  }
});

//======== GET =============
router.get("/lastFivePosts", async (req, res) => {
  try {
    const lastFivePosts = await Editais.find().sort("-date").limit(5);
    if (!lastFivePosts) throw Error("Algo deu errado ao procurar o edital!");
    res.status(200).json(lastFivePosts);
  } catch (err) {
    res.status(400).json({
      msg: err,
    });
  }
});

//======== GET =============
router.get("/lastfiveEnsino", async (req, res) => {
  try {
    const lastFivePosts = await Editais.find({ label: "Ensino" })
      .sort("-date")
      .limit(5);
    if (!lastFivePosts) throw Error("Algo deu errado ao procurar o edital!");
    res.status(200).json(lastFivePosts);
  } catch (err) {
    res.status(400).json({
      msg: err,
    });
  }
});

//======== GET =============
router.get("/lastfiveExtensao", async (req, res) => {
  try {
    const lastFivePosts = await Editais.find({ label: "Extensão" })
      .sort("-date")
      .limit(5);
    if (!lastFivePosts) throw Error("Algo deu errado ao procurar o edital!");
    res.status(200).json(lastFivePosts);
  } catch (err) {
    res.status(400).json({
      msg: err,
    });
  }
});
//======== GET BY ID =============
router.get("/:id", async (req, res) => {
  try {
    const edital = await Editais.findById(req.params.id);
    if (!edital) throw Error("Algo deu errado ao procurar o edital!");
    res.status(200).json(edital);
  } catch (err) {
    res.status(400).json({
      msg: err,
    });
  }
});
//======== POST =============
router.post("/", async (req, res) => {
  const newEdital = new Editais(req.body);
  try {
    const edital = await newEdital.save();
    console.log("Adicionado post novo!");
    if (!edital) throw Error("Algo deu errado ao salvar o post!");
    res.status(200).json(edital);
  } catch (err) {
    res.status(400).json({
      msg: err,
    });
  }
});
//======== DELETE =============
router.delete("/:id", async (req, res) => {
  try {
    const edital = await Editais.findByIdAndDelete(req.params.id);
    console.log("Edital deletado com sucesso!");
    if (!edital) throw Error("Algo deu errado ao deletar o edital!");
    res.status(200).json({ success: true });
  } catch (err) {
    res.status(400).json({
      msg: err,
    });
  }
});
//======== PUT =============
router.patch("/:id", async (req, res) => {
  try {
    const edital = await Editais.findByIdAndUpdate(req.params.id, req.body);
    if (!edital) throw Error("Algo deu errado ao atualizar o edital!");
    res.status(200).json(post);
  } catch (err) {
    res.status(400).json({
      msg: err,
    });
  }
});

module.exports = router;
