import { useEffect, useState } from "react";

function KPChart() {
  const [planets, setPlanets] = useState([]);

  useEffect(() => {
    async function getPlanetData() {
      const date = "2025-08-23";
      const time = "12:00:00";
      const lat = "6.9271";
      const lon = "79.8612";
      const url = `http://localhost:3000/api/planets?date=${date}&time=${time}&lat=${lat}&lon=${lon}`;
      try {
        const response = await fetch(url);
        const data = await response.json();
        setPlanets(data);
      } catch (error) {
        console.error('Error fetching planet data:', error);
      }
    }
    getPlanetData();
  }, []);

  return (
    <table>
      <thead>
        <tr>
          <th>Planet</th>
          <th>Degree</th>
        </tr>
      </thead>
      <tbody>
        {planets.map(planet => (
          <tr key={planet.name}>
            <td>{planet.name}</td>
            <td>{planet.degree.toFixed(4)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default KPChart;
