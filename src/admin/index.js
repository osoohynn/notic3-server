const express = require('express');
const database = require('../db');
const router = express.Router();

router.post('/', async (req, res) => {
    const { title, content, date, category, key } = req.body;

    if (key != "m1y2secrekeydlqslek") {
        res.status(400).send({ message: "님 권한 없음" })
        return;
    }
    
    // title, content가 있는지 체크
    if (!title || !content) {
        res.status(400).send({ message: 'Title, content는 필수 입력 사항입니다.' });
        return;
    }

    // 글 추가
    const result = await create({ title, content, date, category });
    if (!result) {
        res.status(400).send({ message: '글 등록에 실패했습니다.' });
        return;
    }

    res.send({ message: '글을 등록했습니다.' });
});

router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { title, content, date, category, key } = req.body;

    if (!id || (!title && !content && !date && !category)) {
        res.status(400).send({ message: 'ID와 최소 하나의 업데이트할 데이터가 필요합니다.' });
        return;
    }

    if (key != "m1y2secrekeydlqslek") {
        res.status(400).send({ message: "님 권한 없음" })
        return;
    }

    const result = await update({ id, title, content, date, category });
    if (!result) {
        res.status(400).send({ message: '글 수정에 실패했습니다.' });
        return;
    }

    res.send({ message: '글을 수정했습니다.' });
});

router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    const { key } = req.body;

    if (key != "m1y2secrekeydlqslek") {
        res.status(400).send({ message: "님 권한 없음" })
        return;
    }

    if (!id) {
        res.status(400).send({ message: 'ID가 필요합니다.' });
        return;
    }

    const result = await remove({ id });
    if (!result) {
        res.status(400).send({ message: '글 삭제에 실패했습니다.' });
        return;
    }

    res.send({ message: '글을 삭제했습니다.' });
});

async function create({ title, content, date, category}) {
    try {
        await database.query(`
        insert into notices(title, content, date, category) values('${title}',
        '${content}', '${date}', '${category}')
        `)
        return true;
    } catch (error) {
        console.log('Error creating post:', error.message);
        return null;
    }
}

async function update({ id, title, content, date, category }) {
    try {
        // 수정할 필드만 업데이트
        const updates = [];
        if (title) updates.push(`title = '${title}'`);
        if (content) updates.push(`content = '${content}'`);
        if (date) updates.push(`date = '${date}'`);
        if (category) updates.push(`category = '${category}'`);

        const sql = `
            UPDATE notices
            SET ${updates.join(', ')}
            WHERE id = ${id}
        `;
        await database.query(sql);
        return true;
    } catch (error) {
        console.log('Error updating post:', error.message);
        return null;
    }
}

async function remove({ id }) {
    try {
        const sql = `
            DELETE FROM notices
            WHERE id = ${id}
        `;
        await database.query(sql);
        return true;
    } catch (error) {
        console.log('Error deleting post:', error.message);
        return null;
    }
}

module.exports = router;