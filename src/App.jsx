import React, { useState, useEffect } from 'react'
import axios from 'axios'
import moment from 'moment'
import './App.css';
import Cities from './cities.json'
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'


function App() {

  // console.log(Cities[0]);
  // console.log(Cities[0].name);
  const [suggestions, setSuggestions] = useState([])
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


  const onChangeHandler = (val) => {
    let filteredCities = []
    // console.log(val.target.value)
    if (val.length > 0) {
      filteredCities = Cities.filter(city => {
        const regex = new RegExp(`${val}`, 'gi');
        return city.name.match(regex)
      })
    }
    // console.log("filteredCities", filteredCities);
    setSearchText(val)
    setSuggestions(filteredCities)
  }

  const onSuggestHandler = (value) => {
    setSearchText(value)
    setSuggestions([])
  }

  useEffect(() => {
    if (searchText.length > 0) {
      axios.get(
        // `https://api.openweathermap.org/data/2.5/weather?q=${textValue.current.value.toLowerCase()}&APPID=87e794f41494a00278a7066a3e7e4d87&units=metric`
        `https://api.openweathermap.org/data/2.5/weather?q=${searchText.toLowerCase()}&APPID=87e794f41494a00278a7066a3e7e4d87&units=metric`
      ).then(res => {
        // console.log(res);
        // const responseData = res.data
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
      }).catch(err => {
        // console.log(err);
        // alert("Please input correct city name")
      })
    }


    // if (searchText !== cityName) {
    //   alert("Please input correct city name")
    // }

  }, [searchText])



  return (
    <div className="App">
      {/* <div className="a container-md" style={temperature ? {paddingBottom: '0'} : {paddingBottom: '10%'}} > */}
      <div className="a container-md" style={temperature ? { paddingBottom: '0' } : { paddingBottom: '10%' }} >
        <h1 className='text-center py-5'>
          Weather App
        </h1>
        <div className="container-fluid a">
          {/* <form onSubmit={(e) => { handleSearchBtn(e) }}> */}
          {/* <form> */}
          <div className="input-group my-3">
            <input
              className="form-control"
              list="datalistOptions"
              id="cityName"
              placeholder="Enter city name..."
              value={searchText}
              onChange={(val) => onChangeHandler(val.target.value)}
            />
            <button
              type="submit"
              className="btn btn-outline-primary"
              style={{ border: "1px solid white" }}
              // onBlur={() => {
              //   setTimeout(() => {
              //     setSuggestions([])
              //   }, 100);
              // }}
              onClick={() => onSuggestHandler(searchText)}
            >
              <i className="fa fa-search" ></i>
              {/* <i class="fas fa-search"></i> */}
            </button>
          </div>
          {suggestions && suggestions.map((suggest, index) =>
            <div
              key={index}
              className='suggestion col-md-12 justify-content-md-center px-3 py-1'
              onClick={() => onSuggestHandler(suggest.name)}
            >
              {suggest.name}
            </div>
          )}
          {/* </form> */}


          <div className="w-100 py-4 sm-screen-heading">
            {cityName ?
              <h1>
                {cityName},{countryName}
              </h1> :
              ''
            }
            {dateAndTime ?
              <h5>{dateAndTime}</h5>
              :
              <h5></h5>
            }

          </div>
          <div className="sectionContainer row pb-5">

            <div className="col-lg-6 forBorder">
              <div className='d-flex flex-row w-100 text-center my-3'>
                {/* <div className=' my-3'> */}
                <div className="w-50 py-5 a">
                  {
                    temperature ?
                      // <i className='fas fa-cloud-sun'></i>
                      temperature > '25' ?
                      <i class="fa fa-sun-o" aria-hidden="true"></i>
                      // <FontAwesomeIcon icon={["fal", "coffee"]} />
                       :
                        <i class="fa fa-cloud" aria-hidden="true"></i>
                      :
                      ''
                  }

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
                    ''
                  }
                </div>
              </div>
              {/* </div> */}
            </div>
            {/* <div className="verticalLine mx-0"></div> */}


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

              <div className="col my-3 a sm-screen-border">
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
