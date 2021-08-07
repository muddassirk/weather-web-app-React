import React, { useState, useRef, useEffect } from 'react'
import axios from 'axios'
import './App.css';


function App() {

  const [searchText, setSearchText] = useState('')
  const [temperature, setTemperature] = useState('')
  const [cityName, setCityName] = useState('')
  const [countryName, setCountryName] = useState('')
  const [dateAndTime, setDateAndTime] = useState('')
  const [sunrise, setSunrise] = useState('')
  const [sunset, setSunset] = useState('')
  const [humidity, setHumidity] = useState('')
  const [feelsLike, setfeelsLike] = useState('')
  const [windSpeed, setwindSpeed] = useState('')
  const [weatherDescription, setweatherDescription] = useState('')
  const textValue = useRef()

  // const callApi = async () => {
  //   const response = await fetch(
  //     `https://api.openweathermap.org/data/2.5/weather?q=${searchText}&APPID=87e794f41494a00278a7066a3e7e4d87&units=metric`
  //     // `https://api.openweathermap.org/data/2.5/weather?q=karachi&APPID=87e794f41494a00278a7066a3e7e4d87&units=metric`
  //   );
  //   const responseData = await response.json();
  //   console.log(responseData);
  //   // console.log(responseData.sys.country);
  //   // console.log(responseData.sys.sunrise);
  //   // var sunrise = responseData.sys.sunrise / 60 / 60 / 24 ;
  //   // console.log(sunrise);
  // };
  // callApi()


  useEffect(() => {

  }, [searchText])

  const handleSearchBtn = (e) => {
    e.preventDefault()
    // console.log(textValue.current.value, 'useRef');

    axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${textValue.current.value.toLowerCase()}&APPID=87e794f41494a00278a7066a3e7e4d87&units=metric`
    ).then(res => {
      // console.log(res);
      console.log(res.data);
      const responseData = res.data
      // console.log(res.data.timezone);
      //Data and Time
      let timeZone = new Date(res.data.dt * 1000)
      // console.log(timeZone);
      setDateAndTime(timeZone.toString());
      //temperature
      setTemperature(res.data.main.temp)
      //countryName
      setCountryName(res.data.sys.country);
      //cityName
      setCityName(res.data.name);
      //humidity
      setHumidity(res.data.main.humidity)
      //feelLike
      setfeelsLike(res.data.main.feels_like)
      //wind
      setwindSpeed(res.data.wind.speed)
      //description
      // setweatherDescription(res.data.weather[0].desciption)
      // console.log(res.data.weather);
      // console.log(res.data.weather[0]);
      setweatherDescription(res.data.weather[0].description);
      //sunrise
      let sunriseMiliseconds = res.data.sys.sunrise;
      let sunriseActualTime = new Date(sunriseMiliseconds * 1000);
      setSunrise(sunriseActualTime.toString());
      //sunset
      let sunsetMiliseconds = res.data.sys.sunset;
      let sunsetActualTime = new Date(sunsetMiliseconds * 1000);
      setSunset(sunsetActualTime.toString());

      setSearchText(responseData)
    })
  }

  // console.log(searchText, 'dumy state value');


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
            {cityName ?
              <h1>
                {cityName},{countryName}
              </h1> :
              ''
            }
            {dateAndTime ?
              <h5>{dateAndTime}</h5>
              :
              <h5>Saturday, August 7, 2021</h5>
            }

          </div>
          <div className="sectionContainer row a">

            <div className="w-100"></div>

            <div className="col-lg-6">
              <div className='d-flex flex-row w-100 text-center my-3'>
                {/* <div className=' my-3'> */}
                <div className="w-50 py-5 a">
                  <i className='fas fa-cloud-sun'></i>
                </div>
                <div className="w-50 py-5  a">
                  <h1 className="temHeading">{temperature}&#8451;</h1>
                  <h3 style={{ fontWeight: '300' }} className='temHeading2'>{weatherDescription}</h3>
                </div>
              </div>
              {/* </div> */}
            </div>

            <div className="col-lg-6 a">
              <div className="col my-4 a">
                <div className="row my-1 a">
                  <div className="col-sm-4 py-2 text-center a"><h5>{feelsLike}</h5> <span>Feels Like</span></div>
                  <div className="col-sm-4 py-2 text-center a"><h5>{windSpeed}</h5> <span>Wind</span></div>
                  <div className="col-sm-4 py-2 text-center a"><h5>{sunrise}</h5> <span>Sunrise</span></div>
                  {/* <div className="col-sm-4 py-2 text-center a"><h5>a</h5> <span>Sunrise</span></div> */}
                </div>
              </div>
              <div className="col my-3 a">
                <div className="row my-1 a">
                  <div className="col-sm-4 py-2 text-center a"><h5>{humidity}</h5> <span>Humidity</span></div>
                  <div className="col-sm-4 py-2 text-center a"><h5>a</h5> <span>Rain</span></div>
                  <div className="col-sm-4 py-2 text-center a"><h5>{sunset}</h5> <span>Sunset</span></div>
                  {/* <div className="col-sm-4 py-2 text-center a"><h5>a</h5> <span>Sunset</span></div> */}
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
