// netlify/functions/generateReport.js
const PDFDocument = require("pdfkit");
const getStream = require("get-stream");

exports.handler = async (event) => {
  try {
    const { name, birthDate, birthTime, birthPlace } = JSON.parse(event.body || "{}");

    // Create PDF Document
    const doc = new PDFDocument();
    const stream = doc.pipe(getStream.buffer());

    doc.fontSize(18).text("Sathyadarshana Astrology Report", { align: "center" });
    doc.moveDown();
    doc.fontSize(12).text(`Name: ${name || "N/A"}`);
    doc.text(`Birth Date: ${birthDate || "N/A"}`);
    doc.text(`Birth Time: ${birthTime || "N/A"}`);
    doc.text(`Birth Place: ${birthPlace || "N/A"}`);
    doc.moveDown();

    // Mock KP Planetary Positions (Static Example)
    doc.fontSize(14).text("KP Planetary Positions:", { underline: true });
    const positions = {
      Sun: "Leo 15°",
      Moon: "Cancer 22°",
      Mars: "Virgo 05°",
      Venus: "Libra 10°",
      Jupiter: "Pisces 18°",
      Saturn: "Aquarius 02°"
    };
    for (const [planet, pos] of Object.entries(positions)) {
      doc.text(`${planet}: ${pos}`);
    }

    // Add watermark text
    doc.fontSize(10).fillColor("gray").text("Sathyadarshana.com - Astrology", 50, 750, {
      align: "center",
      opacity: 0.3
    });

    doc.end();

    const pdfBuffer = await stream;
    const pdfBase64 = pdfBuffer.toString("base64");

    return {
      statusCode: 200,
      body: JSON.stringify({
        message: "KP Astrology PDF generated successfully",
        pdfBase64,
        positions
      }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
    };
  }
};
