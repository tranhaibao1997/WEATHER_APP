import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Button from 'react-bootstrap/Button'

export default function CityArea(props) {

    async function getCityData(cityname)
    {
        let APIkey=process.env.REACT_APP_APIKEY
        let url=`https://api.openweathermap.org/data/2.5/weather?q=${cityname}&appid=${APIkey}`
        let res=await fetch(url)
        let data=await res.json()
        props.showCityWeather(data)

    }

  return (
    <div>
      <ul>
        <li onClick={()=>getCityData("paris")}>
        <Button variant="outline-warning"> Paris</Button></li>
        <li onClick={()=>getCityData("ho chi minh")}>
        <Button variant="outline-danger"> Ho Chi Minh</Button></li>
        <li onClick={()=>getCityData("ha noi")}>
        <Button variant="outline-warning">  Ha Noi</Button></li>
        <li onClick={()=>getCityData("sydney")}>
        <Button variant="outline-warning">  Sydney</Button>
           </li>
        <li onClick={()=>getCityData("tokyo")}>
        <Button variant="outline-warning"> Tokyo</Button>
            </li>
        <li onClick={()=>getCityData("new york")}>
        <Button variant="outline-warning"> New York</Button>
           </li>
      </ul>
    </div>
  );
}
