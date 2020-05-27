import React, { Component } from "react";
import logo from './logo.svg';
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import Loading from './Loading'
import CityArea from './CityArea'



class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      "data": null,
      "city":"Ho"
    }
  }

  getDataFromAPI = async (lat, lon) => {
    let APIKey = process.env.REACT_APP_APIKEY
    console.log(APIKey)
    let res = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${APIKey}`)
    let data = await res.json()
    this.setState({
      data: data,
    })
    console.log(data,"this is weather data")



  }
  componentDidMount() {
    this.getLocation()
  }


  showLocation = (position) => {
    var latitude = position.coords.latitude;
    var longitude = position.coords.longitude;

    this.getDataFromAPI(latitude, longitude)
  }

  errorHandler = (err) => {
    if (err.code == 1) {
      alert("Error: Access is denied!");
    } else if (err.code == 2) {
      alert("Error: Position is unavailable!");
    }
  }

  getLocation = () => {

    if (navigator.geolocation) {

      // timeout at 60000 milliseconds (60 seconds)
      var options = { timeout: 60000 };
      navigator.geolocation.getCurrentPosition(this.showLocation, this.errorHandler, options);
    } else {
      alert("Sorry, browser does not support geolocation!");
    }
  }
  getCityData=(data)=>{
    this.setState({
      data: data,
      city: data.name
    })
  }
  render() {
    if (this.state.data === null) {
      return (<Loading type="spin" color="white"></Loading>)
    }
    return (
      <div className="container-fluid text-white my-auto">
        <div className={`container my-4 py-4 ${this.state.city} bao-bg`}>
          <div className="row justify-contentcenter text-center bao-text">
            <h1 className="col-12 display-4 my-2 py-3 text-success ">
              Awesome Weather App

            </h1>
            <h2 className="col-12">{this.state.data.name}</h2>
    <h3 className="col-12 text-danger">Temperature:{this.state.data.main.temp}</h3>
            <h3 className="col-12">Weather Description:{this.state.data.weather[0].description}</h3>
           
          </div>
        </div>
        <CityArea showCityWeather={this.getCityData}></CityArea>
      </div>
    );
  }
}

export default App;