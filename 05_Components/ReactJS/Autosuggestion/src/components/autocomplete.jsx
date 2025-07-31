import React, { useState, useEffect } from 'react';
import SuggestionList from './SuggestionList';

const STATE = {
  LOADING: 'LOADING',
  ERROR: 'ERROR',
  SUCCESS: 'SUCCESS',
}

function Autocomplete() {

  const [input, setInput] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [focused, setFocused] = useState(false);
  const [cache, setCache] = useState({});
  const [status, setStatus] = useState(STATE.LOADING);

  const fetchSuggestions = async () => {
    try {
      setStatus(STATE.LOADING);

      if (cache[input]) {
        setSuggestions(cache[input]);
        return;
      }

      const response = await fetch(`https://dummyjson.com/recipes/search?q=${input}`);
      const data = await response.json();
      setStatus(STATE.SUCCESS);
      setSuggestions(data?.recipes);
      setCache((prev) => ({ ...prev, [input]: data?.recipes }));
    } catch (error) {
      setStatus(STATE.ERROR);
    }
  };

  useEffect(() => {
    const timer = setTimeout(fetchSuggestions, 500);
    return () => {
      clearTimeout(timer);
    };
  }, [input]);


  const handleSuggestionClick = (suggestionName) => {
    setInput(suggestionName);
    setFocused(false);
  };


  const handleBlur = () => {
    setTimeout(() => {
      if (!focused) {
        setSuggestions([]);
      }
      setFocused(false);
    }, 200);
  };

  return (
    <div>
      <input
        type="text"
        placeholder='Search recipe...'
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={handleBlur}
      />
      {status === STATE.LOADING && <div>Loading...</div>}
      {status === STATE.ERROR && <div>Error: Something went wrong</div>}
      {focused && status === STATE.SUCCESS && (
        <SuggestionList
          suggestions={suggestions}
          onClick={handleSuggestionClick}
        />
      )}
    </div>
  );
}

export default Autocomplete;
