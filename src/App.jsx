import { useState, useEffect } from "react";
import axios from "axios";
import { api_link } from "./module/setting.json";
import count from "./module/countNum";
import {
  Bar,
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
} from "recharts";

function App() {
  const [data, setData] = useState(null);
  const [AllPlayer, setAllplayer] = useState(0);
  const [barColor , setBarColor] = useState('#ffffff')
  useEffect(() => {
    randomColor()
    axios.get(api_link).then((res) => {
      res.data.shift();
      const data_count = count(res.data);
      setAllplayer(data_count.All);
      setData(
        Object.keys(data_count).map((key) => {
          return { Name: key, player: data_count[key] };
        })
      );
    });
  }, []);

  function randomColor(){
    const color = ['#4f48e2' , '#ffa97e' , '#9a463d' , '#c5d165']
    const random = Math.floor(Math.random() * (color.length ))
    setBarColor(color[random])
  }
  return (
    <div style={
      {
        flexDirection:'row',
        alignContent:'center',
        textAlign:'center',
        margin:20
      }
    }
      >
        <h1>My Data Chart</h1>
      {data != null ? (
        <BarChart width={1000} height={500} data={data} >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="Name" />
          <YAxis />
          <Tooltip/>
          <Bar dataKey="player" fill={barColor}/>
        </BarChart>
      ) : (
        <h1 style={{fontStyle:'italic'}}>Waiting.....</h1>
      )}
      <br/>
      <button onClick={randomColor}>Change Color</button><br/><br/>
      <button onClick={e => window.location.reload()} >ReFresh</button>
    </div>
  );
}

export default App;
