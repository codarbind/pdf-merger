const express = require('express');
const multer = require('multer');
const { PDFDocument } = require('pdf-lib');
const fs = require('fs');
const path = require('path');

const app = express();
const upload = multer({ dest: 'uploads/' });

app.post('/merge', upload.fields([{ name: 'pdf1', maxCount: 1 }, { name: 'pdf2', maxCount: 1 }]), async (req, res) => {
    try {
        

let files = Object.values(req.files).map((fil)=> fil[0])
    
  

    files = files.sort((a, b) => {
    if (a.fieldname < b.fieldname) return -1;
    if (a.fieldname > b.fieldname) return 1;
    return 0;
});


    if (files?.length !== 2) {
       
        return res.status(400).send('Please upload exactly 2 PDF files.');
    }

    const pdf1Path = files[0].path;
    const pdf2Path = files[1].path;

    const pdf1Buffer = fs.readFileSync(pdf1Path);
    const pdf2Buffer = fs.readFileSync(pdf2Path);

    const pdf1Doc = await PDFDocument.load(pdf1Buffer);
    const pdf2Doc = await PDFDocument.load(pdf2Buffer);
    const mergedPdfDoc = await PDFDocument.create();

    const copiedPages1 = await mergedPdfDoc.copyPages(pdf1Doc, pdf1Doc.getPageIndices());
    copiedPages1.forEach(page => mergedPdfDoc.addPage(page));

    const copiedPages2 = await mergedPdfDoc.copyPages(pdf2Doc, pdf2Doc.getPageIndices());
    copiedPages2.forEach(page => mergedPdfDoc.addPage(page));

    const mergedPdfBytes = await mergedPdfDoc.save();

    const mergedPdfPath = path.join(__dirname, 'uploads', 'merged.pdf');
    fs.writeFileSync(mergedPdfPath, mergedPdfBytes);

    return res.download(mergedPdfPath, 'merged.pdf', (err) => {
        if (err) {
            console.error(err);
        }

        // Clean up temporary files
        fs.unlinkSync(pdf1Path);
        fs.unlinkSync(pdf2Path);
        fs.unlinkSync(mergedPdfPath);
    });    } catch (error) {
        console.error(error);
        return res.sendStatus(500)
    }
});

app.use((err, _, res, __) => {
  
    res.status(err.status || 500);

    res.json({
        error: {
            message:'something went wrong - check all inputs',
        },
    });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
