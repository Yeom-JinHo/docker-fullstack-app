import { useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import axios from "axios";

function App() {
  const [lists, setLists] = useState([]);
  const [value, setValue] = useState("");

  useEffect(() => {
    axios.get("/api/values").then((res) => {
      console.log("response", res.data);
      setLists(res.data);
    });
  }, []);

  const changeHandler = (e) => {
    setValue(e.currentTarget.value);
  };

  const submitHandler = (e) => {
    e.preventDefault();

    axios.post("/api/value", { value }).then((res) => {
      if (res.data.success) {
        console.log("response", res);
        setLists([...lists, res.data]);
        setValue("");
      } else {
        alert("값을 DB에 넣을 수 없습니다!");
      }
    });
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <div className="container">
          {lists && lists.map((item, ind) => <li key={ind}>{item.value}</li>)}
          <form onSubmit={submitHandler} className="example">
            <input
              type="text"
              placeholder="입력해주세요..."
              onChange={changeHandler}
              value={value}
            />
            <button type="submit">확인</button>
          </form>
        </div>
      </header>
    </div>
  );
}

export default App;
