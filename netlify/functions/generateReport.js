// netlify/functions/generateReport.js
const PDFDocument = require("pdfkit");
const getStream = require("get-stream");

exports.handler = async (event) => {
  try {
    if (event.httpMethod !== "POST") {
      return { statusCode: 405, body: "Method Not Allowed" };
    }

    const { name, birthDate, birthTime, birthPlace } = JSON.parse(event.body || "{}");

    const doc = new PDFDocument({ margin: 40 });
    const stream = doc.pipe(getStream.buffer());

    doc.fontSize(20).text("Sathyadarshana - KP Report", { align: "center" });
    doc.moveDown();

    doc.fontSize(12).text(`Name: ${name || ""}`);
    doc.text(`Birth Date: ${birthDate || ""}`);
    doc.text(`Birth Time: ${birthTime || ""}`);
    doc.text(`Birth Place: ${birthPlace || ""}`);
    doc.moveDown();

    doc.text("This is a demo PDF generated on Netlify Functions.", { align: "left" });
    doc.moveDown();

    // mock positions
    const positions = {
      Sun: "Leo 15°", Moon: "Scorpio 02°", Mercury: "Virgo 21°",
      Venus: "Cancer 09°", Mars: "Gemini 17°", Jupiter: "Taurus 07°",
      Saturn: "Aquarius 28°", Rahu: "Pisces 12°", Ketu: "Virgo 12°"
    };
    doc.text("Planetary Positions:");
    Object.entries(positions).forEach(([k, v]) => doc.text(` • ${k}: ${v}`));

    doc.end();
    const pdfBuffer = await stream;

    return {
      statusCode: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": 'attachment; filename="KP_Report.pdf"'
      },
      body: pdfBuffer.toString("base64"),
      isBase64Encoded: true
    };
  } catch (err) {
    console.error(err);
    return { statusCode: 500, body: "Failed to generate PDF." };
  }
};
