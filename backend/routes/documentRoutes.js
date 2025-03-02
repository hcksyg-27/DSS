const express = require('express');
const multer = require('multer');
const Document = require('../models/document');
const authMiddleware = require('../midleware/authMiddleware');

const router = express.Router();

//upload document route
router.post('/upload', authMiddleware, upload.single('file'), async(req, res) => {
    try{
        if(!req.file)
            return res.status(400).json({error: "No file uploaded."});

        const newDoc = new Document({
            user: req.user.id,
            filename: req.file.filename,
            originalname: req.file.originalname
        });
        await newDoc.save();
        res.status(200).json({message: "File uploaded successfully.", filename: req.file.filename});        
    }catch(err){
        res.status(500).json({error: "Server Error"});
    }
});
// Serve uploaded files
router.get('/files/:filename', authMiddleware, (req, res) => {
    const filePath = path.join(__dirname, '../uploads', req.params.filename);
    if (fs.existsSync(filePath)) {
        res.sendFile(filePath);
    } else {
        res.status(404).json({ error: "File not found" });
    }
});

module.exports = router;