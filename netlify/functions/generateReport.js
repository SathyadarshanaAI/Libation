const PDFDocument = require('pdfkit');
const getStream = require('get-stream');
const fs = require('fs');
const path = require('path');

exports.handler = async (event) => {
  try {
    const { name, birthDate, birthTime, birthPlace } = JSON.parse(event.body);

    const doc = new PDFDocument({ margin: 50 });
    const fontPath = path.join(__dirname, 'NotoSansSinhala-Regular.ttf'); 
    doc.registerFont('Noto', fontPath); 
    doc.font('Noto'); 

    doc.fontSize(22).text('Vedic Astrology Report', { align: 'center' });
    doc.moveDown();
    doc.fontSize(14).text(`Full Name: ${name || 'N/A'}`);
    doc.text(`Date/Time/Place: ${birthDate}, ${birthTime}, ${birthPlace}`);
    doc.moveDown();

    doc.fontSize(16).text('Planetary Positions (Demo)');
    doc.text('Sun: Gemini\nMoon: Cancer\nMars: Leo\n...');

    doc.end();

    const pdfBuffer = await getStream.buffer(doc);
    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': 'attachment; filename="KP_Report.pdf"'
      },
      body: pdfBuffer.toString('base64'),
      isBase64Encoded: true
    };
  } catch (err) {
    return { statusCode: 500, body: 'Error generating PDF' };
  }
};
