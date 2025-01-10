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

  const [loading, setLoading] = React.useState(false);
const [lecSchedulePayload, setLecSchedulePayload] = useState([]); // Initialize as an empty array
const [coursePayload, setcoursePayload] = useState(''); 


  // Toggle the navigation menu
  const toggleMenu = () => setIsMenuOpen((prev) => !prev);


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
  
    setLoading(true); // Show the loading modal

    // Make a POST request to the backend
    let corseCode = inputValue.replace(' ','-') ;
    axios
      .post('http://localhost:8080/payload', {input:corseCode} )
      .then((response) => {
        setLoading(false); // Hide the loading modal

        let lecSchecduleJSON=JSON.stringify(response.data);
        let lecSchecdulePayload=JSON.parse(lecSchecduleJSON);
        let lecSchedulePayload=lecSchecdulePayload.x;
        let coursePayload=lecSchecdulePayload.y;
        
        let lecOpenOrClosed = lecSchedulePayload.map((line, index) => {
        return {
          course: line,
          isClosed: line.includes('Closed'), // Check if the line contains 'Closed'
        };
      });

      setLecSchedulePayload(lecOpenOrClosed);
      setcoursePayload("  "+coursePayload);


      })
      .catch((error) => {
        setLoading(false); // Hide the loading modal
        console.error('Error making API call:', error);
      });
  };


  // Render the navigation bar
  const renderNavBar = () => (
    <nav className='sticky-top navbar-light bg-light'>
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
                placeholder="E.G. SFWRENG 3DX4"
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

      <div class="card" style={{  marginTop:"15px",  boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
    width: "42%",
    display: "flex",
    justifyContent: "center",
    margin: "0 auto",  // This centers the card horizontally
}}>
        <div class="card-header">
         <b>My Course(s)</b>
        </div>
      
      <div className="card-body" style={{ padding: "10px" }}>
        <h5 className="card-title" style={{ fontSize: "1.2rem" }}> {coursePayload}</h5>
        
        {/* Table inside card-text */}
        <div className="card-text" >
          <table className="table table-hover" style={{ fontSize: '0.875rem' }}>
            <tbody>
              {lecSchedulePayload.length > 0 ? (
                lecSchedulePayload.map((lec, index) => (
                  <tr key={index} >
                    <td className={lec.isClosed ? 'table-danger' : 'table-success'}>
                    {lec.course}  
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="2">No courses available.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <a href="#" className="card-link">Cancel</a>
        <a href="#" className="card-link">Continue</a>
      </div>
    </div>
);



  const loadingModal = () => (
    <>
      <style>
        {`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}
      </style>
      <div
        id="loading-modal"
        style={{
          display: loading ? 'block' : 'none',
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          textAlign: 'center',
          fontWeight: 'bold',
          color: 'white',
          zIndex: 9999,
          padding: '10px',
          display: loading ? 'flex' : 'none',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <span
          className="spinner"
          style={{
            border: '4px solid #f3f3f3',
            borderTop: '4px solid #3498db',
            borderRadius: '50%',
            width: '40px',
            height: '40px',
            animation: 'spin 1s linear infinite', // The keyframes animation here
            marginRight: '10px',
          }}
        ></span>
        Waiting for API response...
      </div>
    </>
  );






  return (
    <>
      {renderNavBar()}
      {renderSearchForm()}
      {renderCourseDisplay()}
      {loadingModal()}
    </>
  );
}

export default App;
