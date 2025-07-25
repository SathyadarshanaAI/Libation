const fetch = require('node-fetch');
const PDFDocument = require('pdfkit');
const fs = require('fs');
const path = require('path');

exports.handler = async (event) => {
  try {
    const { name, dob, tob, place } = JSON.parse(event.body);

    // Placeholder: Fetch NASA planetary positions (dummy endpoint for now)
    const nasaData = await fetch('https://api.le-systeme-solaire.net/rest/bodies/')
      .then(res => res.json());

    const planets = nasaData.bodies
      .filter(b => ['mercury','venus','mars','jupiter','saturn'].includes(b.englishName.toLowerCase()))
      .map(p => ({ name: p.englishName, gravity: p.gravity }));

    // Generate PDF with watermark
    const pdfPath = path.join('/tmp', 'KP_Report.pdf');
    const pdf = new PDFDocument();
    pdf.pipe(fs.createWriteStream(pdfPath));

    pdf.fontSize(20).fillColor('#7dd3fc').text('Sathyadarshana KP Astrology Report', 50, 50);
    pdf.fontSize(14).fillColor('#e0f2fe').text(`Name: ${name}`, 50, 100);
    pdf.text(`DOB: ${dob} ${tob}`, 50, 120);
    pdf.text(`Place: ${place}`, 50, 140);
    pdf.moveDown();

    pdf.fontSize(12).fillColor('#38bdf8').text('Planetary Data (from NASA):');
    planets.forEach((pl, i) => {
      pdf.text(`${i+1}. ${pl.name} - Gravity: ${pl.gravity}`);
    });

    // Watermark
    pdf.fontSize(30).fillColor('#9acd32').opacity(0.1)
      .text('sathyadarshana.com Astrology', 80, 400, { angle: 45 });

    pdf.end();

    return {
      statusCode: 200,
      body: JSON.stringify({
        planets,
        pdfUrl: 'https://your-netlify-site.netlify.app/KP_Report.pdf'
      })
    };
  } catch (err) {
    return { statusCode: 500, body: JSON.stringify({ error: err.message }) };
  }
};