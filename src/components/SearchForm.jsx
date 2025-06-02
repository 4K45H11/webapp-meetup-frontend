import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SearchForm = () => {
  const [inputVal, setInputVal] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!inputVal.trim()) return;
    navigate(`/events?search=${inputVal.toLowerCase()}`);
  };

  const handleChange = (e) => {
    setInputVal(e.target.value);
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className='d-flex' role='search'>
        <input
          onChange={handleChange}
          value={inputVal}
          className='form-control me-2'
          placeholder='Search by title or tag...'
          aria-label='Search'
          type='search'
        />
        <button className='btn btn-outline-success' type='submit'>
          Search
        </button>
      </form>
    </div>
  );
};

export default SearchForm;
