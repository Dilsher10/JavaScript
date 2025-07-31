import React from 'react';

function SuggestionList({ suggestions, onClick }) {
  return (
    <ul className="suggestion-list">
      {suggestions.length > 0 ? (
        suggestions.map((suggestion) => (
          <li
            key={suggestion.id}
            onClick={() => onClick(suggestion.name)}
          >
            {suggestion.name}
          </li>
        ))
      ) : (
        <li>No suggestions available</li>
      )}
    </ul>
  );
}

export default SuggestionList;
