import { useEffect, useRef, useState } from "react";
import Input from "../common/Input";
import axios from "axios";

const SearchCityInput = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const isSelectingRef = useRef(false);

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }

    // ❌ skip API call if selection triggered the change
    if (isSelectingRef.current) {
      isSelectingRef.current = false;
      return;
    }

    const timer = setTimeout(() => {
      fetchCities(query);
    }, 600);

    return () => clearTimeout(timer);
  }, [query]);

  const fetchCities = async (query) => {
    try {
      setLoading(true);

      const res = await axios.get(`https://api.aviationstack.com/v1/cities`, {
        params: {
          access_key: "7e4ede7d8eb7cffe4c6c23e8febc0815",
          city_name: query,
        },
      });

      setResults(res.data?.data || []);
    } catch (err) {
      console.error(err);
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSelect = (city) => {
    isSelectingRef.current = true;
    setQuery(`${city.city_name} - (${city.iata_code})`);
    setResults([]);
  };

  return (
    <div className="relative">
      <label className="text-sm font-medium">City</label>

      <Input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />

      {loading && (
        <p className="absolute top-20 p-2 w-full bg-white shadow">
          Searching...
        </p>
      )}

      {!loading && results.length === 0 && !isSelectingRef && (
        <p className="absolute top-20 p-2 w-full bg-white shadow">
          No airport found
        </p>
      )}

      {results.length > 0 && (
        <ul className="absolute top-20 w-full bg-white shadow rounded">
          {results.map((a) => (
            <li
              key={a.iata_code}
              className="p-2 hover:bg-gray-100 cursor-pointer"
              onClick={() => handleSelect(a)}
            >
              {a.city_name} ({a.iata_code})
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchCityInput;
