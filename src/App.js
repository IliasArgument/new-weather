import React from 'react';
import './App.css';
import Info from './component/info';
import Form from './component/form';
import Weather from './component/weather';
import 'bootstrap/dist/css/bootstrap.min.css';

const API_KEY = '435227c2b39af8320175955725603d6f';

class App extends React.Component{
  state ={
    temp: undefined,
    city: undefined,
    coutry: undefined,
    pressure: undefined,
    sunset: undefined,
    error: undefined,
  }

gettingWeather = async (event) => {
  event.preventDefault();
  const city = event.target.elements.city.value;


if(city) {
  const api_url = await 
  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city},ua&appid=${API_KEY}&units=metric`);
  const data = await api_url.json();

  let sunset = data.sys.sunset;
  let date = new Date();
  date.setTime(sunset);
  let sunset_data = date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();


  this.setState({
    temp: data.main.temp,
    city: data.name,
    country: data.sys.country,
    pressure: data.main.pressure,
    sunset: sunset_data,
    error: undefined
 });
} else {
this.setState({
  temp: undefined,
  city: undefined,
  coutry: undefined,
  pressure: undefined,
  sunset: undefined,
  error: 'Введите название города!!!',
});
      }

  }

render(){
    return(
      <div className="wrapper">
        <div className="main">
        <div className="container">
  <div className="row">
  <div className="col-sm-5 info">
    <Info/>
  </div>
  <div className="col-sm-7 form">
    <Form weatherMethod={this.gettingWeather} />
     <Weather
     temp={this.state.temp}
     city={this.state.city}
     country={this.state.country}
     pressure={this.state.pressure}
     sunset={this.state.sunset}
     error={this.state.error}
     />
     </div>
     </div>
 </div>
        </div>
     
      </div>
    );
  }
}

export default App;