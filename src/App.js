import React , { useState }from "react";
import DisplayWeather from "./DisplayWeather";
import './App.css';

function App() {


    const APIKEY ="5a5cb8a81aa02c74cb19d3ba25a586eb";

    const [form, setForm] = useState({
      city:"",

    });

    const [weather, setWeather] = useState([])

    async function weatherdata(e){
      e.preventDefault();
      if (form.city==""){
        alert("Add City");
      }
      else{
        const data = await fetch( `https://api.openweathermap.org/data/2.5/weather?q=${form.city}&APPID=${APIKEY}`)
        .then(res=>res.json()
        .then((data)=>data));

        setWeather({data : data});
      }
    }


  const handelChange=(e)=>{
    let name=e.target.name;
    let value=e.target.value;

      if (name == "city"){
        setForm({...form, city:value});
      }
      console.log(form.city);

  };

  return (
    <div className="App">
      <h1>Weather App</h1>
      <form>
        <input type="text" placeholder="City" name="city" className="input" onChange={(e)=>handelChange(e)}/>
        <br/>
        <br/>
        <button className="submit" onClick={(e)=>weatherdata(e)}>Get Details</button>
      </form>

      {weather.data != undefined ? (
        <div>
          <DisplayWeather data={weather.data} />
        </div>
      ) : null}



    </div>
  );
}

export default App;
