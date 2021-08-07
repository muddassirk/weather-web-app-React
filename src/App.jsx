import React, { useState, useRef, useEffect } from 'react'
import axios from 'axios'
import moment from 'moment'
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
  const [pressure, setPressure] = useState('')
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
      //pressure
      setPressure(res.data.main.pressure)
      //feelLike
      setfeelsLike(res.data.main.feels_like)
      //wind
      setwindSpeed(res.data.wind.speed)
      //description
      const capitalizeFirstLetter = ([first, ...rest], locale = navigator.language) =>
        first.toLocaleUpperCase(locale) + rest.join('')

      // console.log(
      //   capitalizeFirstLetter(res.data.weather[0].description), // Foo
      // )
      setweatherDescription(capitalizeFirstLetter(res.data.weather[0].description));
      //sunrise
      let sunriseMiliseconds = res.data.sys.sunrise;
      let sunriseActualTime = new Date(sunriseMiliseconds * 1000);
      let momentSunriseTime = moment(sunriseActualTime.toString()).format('hh:mm')
      // console.log(momentSunriseTime);
      setSunrise(momentSunriseTime);
      //sunset
      let sunsetMiliseconds = res.data.sys.sunset;
      let sunsetActualTime = new Date(sunsetMiliseconds * 1000);
      let momentSunsetTime = moment(sunsetActualTime.toString()).format('hh:mm')
      // console.log(momentSunsetTime);
      setSunset(momentSunsetTime);

      setSearchText(responseData)
    })
  }

  // console.log(searchText, 'dumy state value');


  return (
    <div className="App">
      {/* Hello world
      <button onClick={callApi}>Press</button> */}

      <div className="a container-md">
        <h1 className='text-center py-5'>
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
              <h5>No data</h5>
            }

          </div>
          <div className="sectionContainer row pb-5">

            <div className="col-lg-6">
              <div className='d-flex flex-row w-100 text-center my-3'>
                {/* <div className=' my-3'> */}
                <div className="w-50 py-5 a">
                  <i className='fas fa-cloud-sun'></i>
                </div>
                <div className="w-50 py-5  a">
                  {temperature ?
                    <h1 className="temHeading">{temperature}&#8451;</h1>
                    :
                    "0 "
                  }
                  {weatherDescription ?
                    <h3 style={{ fontWeight: '300' }} className='temHeading2'>{weatherDescription}</h3>
                    :
                    'No data'
                  }
                </div>
              </div>
              {/* </div> */}
            </div>

            <div className="col-lg-6 a">
              <div className="col my-4 a">
                <div className="row my-1 a">
                  <div className="col-sm-4 py-2 text-center a">
                    {feelsLike ?
                      <h5>{feelsLike}&#8451;</h5>
                      :
                      <h5>0</h5>
                    }
                    <span>Feels Like</span>
                  </div>
                  <div className="col-sm-4 py-2 text-center a">
                    {windSpeed ?
                      <h5>{windSpeed}mph</h5>
                      :
                      <h5>0</h5>
                    }
                    <span>Wind speed</span>
                  </div>
                  <div className="col-sm-4 py-2 text-center a">
                    {sunrise ?
                      <h5>{sunrise}am</h5>
                      :
                      <h5>0</h5>
                    }
                    <span>Sunrise</span>
                  </div>
                </div>
              </div>
              <div className="col my-3 a">
                <div className="row my-1 a">
                  <div className="col-sm-4 py-2 text-center a">
                    {humidity ?
                      <h5>{humidity}%</h5>
                      :
                      <h5>0</h5>
                    }
                    <span>Humidity</span>
                  </div>
                  <div className="col-sm-4 py-2 text-center a">
                    {
                      pressure ?
                        <h5>{pressure}mb</h5>
                        :
                        <h5>0</h5>
                    }
                    <span>Pressure</span>
                  </div>
                  <div className="col-sm-4 py-2 text-center a">
                    {
                      sunset ?
                        <h5>{sunset}pm</h5>
                        :
                        <h5>0</h5>
                    }
                    <span>Sunset</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="w-100 pb-4"></div>

          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
