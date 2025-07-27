.// netlify/functions/generateReport.js
const PDFDocument = require('pdfkit');
const getStream = require('get-stream');

exports.handler = async (event, context) => {
  try {
    const { name, birthDate, birthTime, birthPlace } = JSON.parse(event.body || '{}');

    // Create PDF
    const doc = new PDFDocument();
    let buffers = [];
    doc.on('data', buffers.push.bind(buffers));
    doc.on('end', () => {});

    doc.fontSize(20).text('Sathyadarshana KP Astrology Report', { align: 'center' });
    doc.moveDown();
    doc.fontSize(14).text(`Name: ${name || 'N/A'}`);
    doc.text(`Birth Date: ${birthDate || 'N/A'}`);
    doc.text(`Birth Time: ${birthTime || 'N/A'}`);
    doc.text(`Birth Place: ${birthPlace || 'N/A'}`);
    doc.moveDown();
    doc.text('Planetary positions (mock): Sun - Leo, Moon - Taurus, etc.');

    doc.end();
    const pdfBuffer = await getStream.buffer(doc);

    // Direct PDF response
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
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message })
    };
  }
};
