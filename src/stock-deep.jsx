import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import AvailabilityTrendChart from "./AvailabilityTrendChart";

function StockDeep() {
  const location = useLocation();
  const stockId = location.state?.stock_id; // 👈 from handleSelect
  console.log("stockId:", stockId);
  const [trendData, setTrendData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
  if (!stockId) return;

  axios.get(`http://localhost:8000/stock/${stockId}/predict`)
    .then(response => {
      setTrendData(response.data.usage_trend);
      setLoading(false);
    })
    .catch(error => {
      console.error("Error fetching trend data:", error);
      setLoading(false);
    });
}, [stockId]);


  return (
    <div>
      <h2>Stock Availability Trend</h2>
      {loading ? <p>Loading chart...</p> : <AvailabilityTrendChart data={trendData} />}
    </div>
  );
}

export default StockDeep;
