import './App.css';
import axios from 'axios';
import { Input, Card } from 'antd';
import { useEffect, useRef, useState } from 'react';

function App() {
  const [countries, setCountries] = useState([]);
  const [countryMatch, setCountryMatch,] = useState([]);

const ref = useRef(null)

  useEffect(() => {
    ref.current.focus();
    const loadCountries = async () => {
      const { data } = await axios.get('https://restcountries.com/v2/all');
      setCountries(data);
    };
    loadCountries();
  }, []);

  const handleSearchCountries = (text) => {
    if (!text) {
      setCountryMatch([]);
    } else {
      let matches = countries.filter((country) => {
        const regex = new RegExp(`${text}`, 'gi');
        return country.name?.match(regex) || country.capital?.match(regex);
      });
      setCountryMatch(matches);
    }
  };

  return (
    <div className='App'>
      <h2>Country Search</h2>
      <Input
        style={{ width: '40%', marginTop: '10px' }}
        placeholder='Enter country or capital name'
        onChange={(e) => handleSearchCountries(e.target.value)}
        ref={ref}
      />

      {countryMatch &&
        countryMatch.map((item, index) => (
          <div key={index} style={{ marginLeft: '35%', marginTop: '5px' }}>
            <Card style={{ width: '50%' }} title={`Country: ${item.name}`}>
              Capital: {item.capital}
            </Card>
          </div>
        ))}
    </div>
  );
}

export default App;
