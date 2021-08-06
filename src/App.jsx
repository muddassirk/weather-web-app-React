import React from 'react'
import './App.css';

function App() {
  // const callApi = async () => {
  //   let response = await fetch(
  //     // `https://api.openweathermap.org/data/2.5/weather?q=${search}&APPID=87e794f41494a00278a7066a3e7e4d87&units=metric`
  //     // `https://api.openweathermap.org/data/2.5/weather?q=karachi&APPID=87e794f41494a00278a7066a3e7e4d87&units=metric`
  //   );
  //    responseData = await response.json();
  //     console.log(responseData);
  // };

  return (
    <div className="App">
      {/* Hello world
      <button onClick={callApi}>Press</button> */}

      <div className="a container-md">
        <h1 className='text-center'>
          Weather App
        </h1>
        <div className="container-fluid a">
          <label forhtml="cityName" className="form-label">Enter city name</label>
          <input className="form-control" list="datalistOptions" id="cityName" placeholder="Enter city name..." />
          <datalist id="datalistOptions">
            <option value="Karachi" />
            <option value="Islamabad" />
            <option value="San Francisco" />
            <option value="New York" />
            <option value="Seattle" />
            <option value="Los Angeles" />
            <option value="Chicago" />
          </datalist>
          <div className="w-100 py-4">
            <h1>
              Karachi, PK
            </h1>
            <h5>Saturday, August 7, 2021</h5>

          </div>
          <div className="sectionContainer row">

            <div className="w-100"></div>

            <div className="col-sm-6">
              <h1>21 degree</h1>
            </div>
            
            <div className="col-sm-6">
              <div className="col">
                <div className="row">
                  <div className="col-sm-4">High</div>
                  <div className="col-sm-4">Wind</div>
                  <div className="col-sm-4">Sunrise</div>
                </div>
              </div>
              <div className="col">
                <div className="row">
                  <div className="col-sm-4">Low</div>
                  <div className="col-sm-4">Rain</div>
                  <div className="col-sm-4">Sunset</div>
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
