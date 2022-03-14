const express = require('express');
const router = express.Router();
const Posts = require('../../models/Posts');

//======== GET =============
router.get('/', async (req, res) => {
    try {
        const posts = await Posts.find();
        if(!posts) throw Error('Algo deu errado ao procurar o post!');
        res.status(200).json(posts);
    } catch(err) {
        res.status(400).json({
            msg: err
        })
    }
});
//======== GET BY ID =============
router.get('/:id', async (req, res) => {
    try {
        const post = await Posts.findById(req.params.id);
        if(!post) throw Error('Algo deu errado ao procurar o post!');
        res.status(200).json(post);
    } catch(err) {
        res.status(400).json({
            msg: err
        })
    }
});
//======== POST =============
router.post('/', async (req, res) => {
    const newPost = new Posts(req.body)
    try {
        const post = await newPost.save();
        if(!post) throw Error('Algo deu errado ao salvar o post!');
        res.status(200).json(post);
    } catch(err) {
        res.status(400).json({
            msg: err
        })
    }
});
//======== DELETE =============
router.delete('/:id', async (req, res) => {
    try {
        const post = await Posts.findByIdAndDelete(req.params.id);
        if(!post) throw Error('Algo deu errado ao deletar o post!');
        res.status(200).json({ success: true });
    } catch(err) {
        res.status(400).json({
            msg: err
        })
    }
});
//======== PUT =============
router.patch('/:id', async (req, res) => {
    try {
        const post = await Posts.findByIdAndUpdate(req.params.id, req.body);
        if(!post) throw Error('Algo deu errado ao atualizar o post!');
        res.status(200).json(post);
    } catch(err) {
        res.status(400).json({
            msg: err
        })
    }
});

module.exports = router;