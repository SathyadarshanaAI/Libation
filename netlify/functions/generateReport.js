const PDFDocument = require('pdfkit');
const fs = require('fs');

exports.handler = async (event) => {
  try {
    const { name, gender, dob, tob, pob, mode } = JSON.parse(event.body);

    // Dummy KP Sub-Lord prediction (Sample – NASA/KP API will replace this)
    const kpSubLord = "Moon in Rohini Nakshatra - Favorable for new beginnings (Sample Data).";

    // Create PDF
    const pdf = new PDFDocument();
    const filePath = `/tmp/${name.replace(/\s+/g, '_')}_KP_Report.pdf`;
    const stream = fs.createWriteStream(filePath);
    pdf.pipe(stream);

    // Watermark
    pdf.fontSize(30).fillColor('#f0f0f0')
       .text("SATHYADARSHANA", 100, 300, { angle: 45, opacity: 0.1 });

    // Title
    pdf.fillColor('#000').fontSize(20)
       .text("Sathyadarshana KP Astrology Report", { align: "center" });
    pdf.moveDown();

    // Personal Info
    pdf.fontSize(14).text(`Name: ${name}`);
    pdf.text(`Gender: ${gender}`);
    pdf.text(`Date of Birth: ${dob}`);
    pdf.text(`Time of Birth: ${tob}`);
    pdf.text(`Place of Birth: ${pob}`);
    pdf.text(`Mode: ${mode}`);
    pdf.moveDown();

    // Planetary Table (Sample Data for now)
    pdf.fontSize(16).text("Planetary Positions & Sub-Lord Table (Sample):");
    pdf.fontSize(12).text(
      "Sun - Aries - Krittika\n" +
      "Moon - Taurus - Rohini\n" +
      "Mars - Gemini - Ardra\n" +
      "(Full NASA/KP data will be added soon)"
    );
    pdf.moveDown();

    // Horoscope Summary
    pdf.fontSize(14).text("Horoscope Summary:");
    pdf.fontSize(12).text(kpSubLord);

    pdf.end();

    // Return PDF as Base64 for Netlify response
    return new Promise((resolve, reject) => {
      stream.on('finish', () => {
        const data = fs.readFileSync(filePath).toString('base64');
        resolve({
          statusCode: 200,
          headers: {
            "Content-Type": "application/pdf",
            "Content-Disposition": `attachment; filename="${name}_KP_Report.pdf"`
          },
          body: data,
          isBase64Encoded: true
        });
      });
      stream.on('error', reject);
    });
  } catch (error) {
    return { statusCode: 500, body: `Error generating report: ${error.message}` };
  }
};
