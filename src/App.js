import React, { useState, useEffect } from 'react';
import axios from 'axios';
import $ from 'jquery';
import './App.css';

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [data, setData] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [suggestions] = useState([
    'SFWRENG 3DB3',
    'SFWRENG 3XA3',
    'ELECENG 2FH3',
    'MECHENG 4OP3',
    'CIVENG 1ZZ5',
  ]);

  // Toggle the navigation menu
  const toggleMenu = () => setIsMenuOpen((prev) => !prev);

  // Make an API call and handle the result
  const apiCall = () => {
    axios
      .get('http://localhost:8080')
      .then((response) => {
        console.log(response.data);
        setData(Array.isArray(response.data) ? response.data : [response.data]);
      })
      .catch((error) => {
        console.error('Error making API call:', error);
        setData(['Error fetching data']);
      });
  };

  // Initialize autocomplete functionality
  const initAutocomplete = () => {
    $('#searchInput').on('input', function () {
      const query = $(this).val().toLowerCase();
      $('#suggestionList').empty().hide();

      if (query) {
        const filteredSuggestions = suggestions.filter((item) =>
          item.toLowerCase().includes(query)
        );

        filteredSuggestions.forEach((item) => {
          $('#suggestionList').append(
            `<li class="list-group-item">${item}</li>`
          );
        });

        if (filteredSuggestions.length > 0) {
          $('#suggestionList').show();
        }
      }
    });

    $('#suggestionList').on('click', 'li', function () {
      $('#searchInput').val($(this).text());
      $('#suggestionList').empty().hide();
      setInputValue($(this).text());
    });

    return () => {
      $('#searchInput').off('input');
      $('#suggestionList').off('click');
    };
  };

  useEffect(initAutocomplete, [suggestions]);

  //submit form fucntion
const submitForm = (e) => {
    e.preventDefault();
    // Make a POST request to the backend
    axios
      .post('http://localhost:8080/payload', { inputValue })
      .then((response) => {
        console.log(response.data);
        // setResponseMessage(`Server response: ${response.data.message}, Received: ${response.data.receivedInput}`);
      })
      .catch((error) => {
        console.error('Error making API call:', error);
      });
      console.log(inputValue);
  };


  // Render the navigation bar
  const renderNavBar = () => (
    <nav>
      <div className="container">
        <a href="#" className="brand">
          CourseHawk - McMaster University
        </a>
        <button
          className="toggle-button"
          aria-label="Toggle navigation"
          onClick={toggleMenu}
        >
          <span className="toggle-icon"></span>
          <span className="toggle-icon"></span>
          <span className="toggle-icon"></span>
        </button>
        <div className={`menu ${isMenuOpen ? 'active' : ''}`}>
          <ul className="nav-links">
            <li>
              <a href="#">Home</a>
            </li>
            <li>
              <a href="#">Watchlist</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );



//--------------------------------------------
  // Render the search form
  const renderSearchForm = () => (
    <div
      className="container-fluid"
      style={{ backgroundColor: '#d1e1e1', padding: '55px' }}
    >
      <h2 className="text-center" style={{ fontSize: '1.25rem', color: '#343a40' }}>
        Search Course
      </h2>
      <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '5px' }}>
        <form
          className="search-form"
          style={{ maxWidth: '250px', width: '200%' }}
          onSubmit={submitForm}
        >
          <div className="row">
            <div className="col-12 mb-2">
              <input
                type="search"
                id="searchInput"
                placeholder="E.G. SFWRENG 3DB3"
                aria-label="Search"
                className="form-control"
                style={{ fontSize: '0.875rem', color: '#6c757d' }}
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
              />
              <ul
                id="suggestionList"
                className="list-group"
                style={{
                  display: 'none',
                  zIndex: 1000,
                  width: '100%',
                  maxHeight: '150px',
                  overflowY: 'auto',
                  marginTop: '2px',
                }}
              ></ul>
            </div>
            <div className="col-12">
              <button type="submit" className="btn btn-primary w-100" style={{ padding: '0.15rem' }}>
                Add Course
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );

  // Render the course display
  const renderCourseDisplay = () => (
    <div className="container my-4 text-center">
      <button className="btn btn-primary"  style={{ whiteSpace: 'nowrap', textAlign: 'center' }}>
        My Course(s) {inputValue}
      </button>

      <div className="container my-4" >
        <div className="row" >
          {data.map((item, index) => (
            <div key={index} className="col-md-4 mb-4" >
              <div className="card" >
                <div className="card-body">
                  <p className="card-text">{item} </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <>
      {renderNavBar()}
      {renderSearchForm()}
      {renderCourseDisplay()}
    </>
  );
}

export default App;
