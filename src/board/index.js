const express = require('express');
const database = require('../db');
const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const posts = await getAllPosts();
        res.status(200).send(posts);
    } catch (error) {
        res.status(500).send({ message: '글을 조회할 수 없습니다.', error: error.message });
    }
});

router.get('/:id', async (req, res) => {
    const post = await getById(req.params.id);

    if (!post) {
        res.status(400).send({ message: '존재하지 않는 글입니다.' });
        return;
    }

    res.send(post);
});

async function getAllPosts() {
    try {
        const { rows } = await database.query(`select title, content, date, category
        from notices`);
        return rows;
    } catch(error) {
        console.log(error.message)
        return null;
    }
}

async function getById(_id) {
    try {
        const { rows } = await database.query(`
        select title, content, date, category
        from notices
        where id = '${_id}'`);
        
        return rows[0];
    } catch (error) {
        console.log(error.message);
        return null;
    }
}

module.exports = router;