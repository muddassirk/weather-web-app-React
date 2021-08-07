import React, { useState, useRef, useEffect } from 'react'
import './App.css';

function App() {

  const [searchText, setSearchText] = useState('')
  const textValue = useRef()

  
  // useEffect(() => {

    const callApi = async () => {
      let response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${searchText}&APPID=87e794f41494a00278a7066a3e7e4d87&units=metric`
        // `https://api.openweathermap.org/data/2.5/weather?q=karachi&APPID=87e794f41494a00278a7066a3e7e4d87&units=metric`
      );
      const responseData = await response.json();
      console.log(responseData);
    };
  // }, [searchText])

  const handleSearchBtn = (e) => {
    e.preventDefault()
    // console.log(textValue.current.value, 'useRef');
    setSearchText(textValue.current.value.toLowerCase())
    callApi()
  }

  console.log(searchText, 'dumy state value');


  return (
    <div className="App">
      {/* Hello world
      <button onClick={callApi}>Press</button> */}

      <div className="a container-md">
        <h1 className='text-center'>
          Weather App
        </h1>
        <div className="container-fluid a">
          <form onSubmit={(e) => { handleSearchBtn(e) }}>
            <div className="input-group my-3">
              <input
                className="form-control"
                list="datalistOptions"
                id="cityName"
                placeholder="Enter city name..."
                ref={textValue}
              />
              <button
                type="submit"
                className="btn btn-outline-primary"
                style={{ border: "1px solid white" }}
              // onClick={handleSearchBtn}
              >
                <i className="fa fa-search" ></i>
              </button>

              <datalist id="datalistOptions">
                <option value="Karachi" />
                <option value="Islamabad" />
                <option value="San Francisco" />
                <option value="New York" />
                <option value="Seattle" />
                <option value="Los Angeles" />
                <option value="Chicago" />
              </datalist>
            </div>
          </form>


          <div className="w-100 py-4">
            <h1>
              Karachi, PK
            </h1>
            <h5>Saturday, August 7, 2021</h5>

          </div>
          <div className="sectionContainer row a">

            <div className="w-100"></div>

            <div className="col-lg-6">
              <div className='d-flex flex-row w-100 text-center my-3'>
                {/* <div className=' my-3'> */}
                <div className="w-50 py-4 a">
                  <i className='fas fa-cloud-sun'></i>
                </div>
                <div className="w-50 py-3  a">
                  <h1 className="temHeading">21&#8451;</h1>
                  <h3 style={{ fontWeight: '300' }} className='temHeading2'>Mostly sunny</h3>
                </div>
              </div>
              {/* </div> */}
            </div>

            <div className="col-lg-6 a">
              <div className="col my-4 a">
                <div className="row my-1 a">
                  <div className="col-sm-4 py-2 text-center a"><h5>a</h5> <span>High</span></div>
                  <div className="col-sm-4 py-2 text-center a"><h5>a</h5> <span>Wind</span></div>
                  <div className="col-sm-4 py-2 text-center a"><h5>a</h5> <span>Sunrise</span></div>
                </div>
              </div>
              <div className="col my-3 a">
                <div className="row my-1 a">
                  <div className="col-sm-4 py-2 text-center a"><h5>a</h5> <span>Low</span></div>
                  <div className="col-sm-4 py-2 text-center a"><h5>a</h5> <span>Rain</span></div>
                  <div className="col-sm-4 py-2 text-center a"><h5>a</h5> <span>Sunset</span></div>
                </div>
              </div>
            </div>


          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
