<!DOCTYPE html>
<html>
<head>
  <title>KP Chart Data</title>
</head>
<body>
  <h1>KP Chart Data</h1>
  <table id="kp-table" border="1">
    <tr>
      <th>Planet</th>
      <th>Degree</th>
    </tr>
  </table>
  <script>
    async function getPlanetData() {
      const date = "2025-08-23";
      const time = "12:00:00";
      const lat = "6.9271";
      const lon = "79.8612";
      const url = `http://localhost:3000/api/planets?date=${date}&time=${time}&lat=${lat}&lon=${lon}`;

      try {
        const response = await fetch(url);
        const data = await response.json();
        const table = document.getElementById('kp-table');
        data.forEach(p => {
          const row = table.insertRow();
          row.insertCell(0).innerText = p.name;
          row.insertCell(1).innerText = p.degree.toFixed(4);
        });
      } catch (error) {
        console.error('Error fetching planet data:', error);
      }
    }

    getPlanetData();
  </script>
</body>
</html>
