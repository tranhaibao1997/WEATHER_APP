import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Loading from "./Loading";
import CityArea from "./CityArea";
import WeatherByDay from "./WeatherByDay";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null,
      city: "Ho",
      data5days: null,
    };
  }

  getDataFromAPI = async (lat, lon) => {
    let APIKey = process.env.REACT_APP_APIKEY;
    console.log(APIKey);
    let res = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${APIKey}&units=imperial`
    );
    let data = await res.json();
    this.setState({
      data: data,
    });
    console.log(data, "this is weather data");
  };
  componentDidMount() {
    this.getLocation();
  }

  showLocation = (position) => {
    var latitude = position.coords.latitude;
    var longitude = position.coords.longitude;

    this.getDataFromAPI(latitude, longitude);
  };

  errorHandler = (err) => {
    if (err.code == 1) {
      alert("Error: Access is denied!");
    } else if (err.code == 2) {
      alert("Error: Position is unavailable!");
    }
  };

  getLocation = () => {
    if (navigator.geolocation) {
      // timeout at 60000 milliseconds (60 seconds)
      var options = { timeout: 60000 };
      navigator.geolocation.getCurrentPosition(
        this.showLocation,
        this.errorHandler,
        options
      );
    } else {
      alert("Sorry, browser does not support geolocation!");
    }
  };
  getCityData = (data, data1) => {
    this.setState({
      data: data,
      city: data.name,
      data5days: data1,
    });
  };

  convertToC = (F) => {
    return ((F - 32) * 5) / 9;
  };

  //split array function
  splitUp = (arr, n) => {
    var rest = arr.length % n, // how much to divide
      restUsed = rest, // to keep track of the division over the elements
      partLength = Math.floor(arr.length / n),
      result = [];

    for (var i = 0; i < arr.length; i += partLength) {
      var end = partLength + i,
        add = false;

      if (rest !== 0 && restUsed) {
        // should add one element for the division
        end++;
        restUsed--; // we've used one division element now
        add = true;
      }

      result.push(arr.slice(i, end)); // part of the array

      if (add) {
        i++; // also increment i in the case we added an extra element for division
      }
    }

    return result;
  };

  render() {
    console.log(this.state.data5days);
    if(this.state.data5days!==null)
    {
      console.log(this.splitUp(this.state.data5days.list,5))
    }
    
    if (this.state.data === null) {
      return <Loading type="spin" color="white"></Loading>;
    }
    return (
      <div className="container-fluid text-white my-auto">
        <div className={`container my-4 py-4 ${this.state.city} bao-bg`}>
          <div className="row justify-contentcenter text-center bao-text">
            <h1 className="col-12 display-4 my-2 py-3 text-success ">
              Awesome Weather App
            </h1>
            <h2 className="col-12">{this.state.data.name}</h2>
            <h3 className="col-12 text-danger">
              <h5>Temperature(F):{this.state.data.main.temp}</h5>
              <h5>
                Temperature(C):
                {Math.floor(this.convertToC(this.state.data.main.temp))}
              </h5>
            </h3>
            <h3 className="col-12">
              Weather Description:{this.state.data.weather[0].description}
            </h3>
          </div>
        </div>
        <CityArea showCityWeather={this.getCityData}></CityArea>
        <div class="weatherByDay-section">
        {
          this.state.data5days!==null ?this.splitUp(this.state.data5days.list,5).map(elm =>
            {
              return(
                
                <ul class="weatherByDay">
                   <WeatherByDay elm={elm} city={this.state.city} ></WeatherByDay> 
                </ul>   
                 
               
               
              )
            
          }) :<h1></h1>
        }
         </div>
      </div>
    );
  }
}

export default App;
