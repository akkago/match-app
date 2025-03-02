import React, { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';
import MatchTable, { IMatch } from './MatchTable';

function App() {
  const [matches, setMatches] = useState<IMatch[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchMatches = async () => {
    try {
      const response = await axios.get('https://app.ftoyd.com/fronttemp-service/fronttemp');
      setMatches(response.data.data.matches);
    } catch (err) {
      setError('Ошибка: не удалось загрузить информацию');
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchMatches();
  }, []);

  if (loading) {
    return <div>Загрузка...</div>;
  }

  return (
    <div className="App">
      <MatchTable matches={matches} fetchData={fetchMatches} error={error}/>
    </div>
  );
}

export default App;
