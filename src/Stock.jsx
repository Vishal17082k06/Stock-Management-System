import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Stock() {
  const navigate = useNavigate();
  const [materials, setMaterials] = useState([]);
  const [searchId, setSearchId] = useState("");

  // 🔄 Fetch materials from backend
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:8000/stock");
        setMaterials(response.data);
      } catch (error) {
        console.error("❌ Failed to fetch materials:", error);
        alert("Error loading materials from database");
      }
    };

    fetchData();
  }, []);

  // 🔍 Filter based on user input
  const filteredMaterials = materials.filter((item) =>
    item.id.toString().includes(searchId)
  );

  const handleSelect = (material) => {
    navigate("/stock-deep", { state: { stockId: material.id } });
  };

  return (
    <div>
      <div>
        <p>STOCKS</p>

        <input
          placeholder="Search by Id"
          value={searchId}
          onChange={(e) => setSearchId(e.target.value)}
        />

        {filteredMaterials.length === 0 ? (
          <p>No matching materials</p>
        ) : (
          filteredMaterials.map((item, index) => (
            <div key={index}>
              <div
                onClick={() => handleSelect(item)}
                style={{ cursor: "pointer" }}
              >
                <p><strong>ID:</strong> {item.id}</p>
                <p><strong>Name:</strong> {item.name || item.casting_type}</p>
                <p><strong>Quantity:</strong> {item.quantity}</p>
                <p><strong>Threshold:</strong> {item.threshold}</p>
                
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Stock;
