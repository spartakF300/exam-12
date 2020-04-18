const express = require('express');
const auth = require('../middleware/auth');
const upload = require('../multer').uploads;
const Photo = require('../models/Photo');
const router = express.Router();

router.get('/', async (req, res) => {
    let params = {};

    if (req.query.id) {
        params = {user: req.query.id};

    }
    try {
        const items = await Photo.find(params).populate('user');
        return res.send(items);
    } catch (e) {
        return res.status(500).send(e);
    }

});
router.get('/:id', async (req, res) => {
    try {
        const items = await Photo.findById(req.params.id);
        res.send(items);
    } catch (e) {
        res.sendStatus(500);
    }
});

router.post('/', [auth, upload.single('image')], async (req, res) => {
    const photoData = {
        title: req.body.title,
        user: req.user._id
    };
    if (req.file) {
        photoData.image = req.file.filename;
    }

    try {
        const photo = new Photo(photoData);

        await photo.save();

        return res.send({id: photo._id});
    } catch (e) {
        return res.status(400).send(e);

    }
});


router.delete('/', auth, async (req, res) => {
    try {
        await Photo.deleteOne({_id: req.query.id});
        return res.status(200).send({message: 'delete'});

    } catch (error) {
        return res.status(500).send({message: 'error'});
    }
});
module.exports = router;