import React from "react";

export default function WeatherByDay(props) {
  console.log(props.elm);
  return (
      <>
      <h1 className="day-note">{props.elm[0].dt_txt} to {props.elm[7].dt_txt} in {props.city}</h1>
    <li className="day">
      {props.elm.map((elm) => {
        return (
          <div class="time-of-day">
            <p>Time:{elm.dt_txt}</p>
            <p>Temperature:{elm.main.temp}</p>
            <p>Description:{elm.weather[0].description}</p>
            
          </div>
        );
      })}
    </li>
    </>
  );
}
