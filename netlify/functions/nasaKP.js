exports.handler = async (event) => {
  return {
    statusCode: 200,
    body: JSON.stringify({
      Sun: "Leo 15°",
      Moon: "Cancer 2°",
      Mars: "Virgo 10°",
      Timestamp: new Date().toISOString()
    })
  };
};
