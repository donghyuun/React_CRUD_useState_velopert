## Running React on Repl.it

href: https://velog.io/@hyunn/%EB%B0%B0%EC%97%B4%EC%97%90-%ED%95%AD%EB%AA%A9-%EC%B6%94%EA%B0%80%ED%95%98%EA%B8%B0
[React]

(https://reactjs.org/) is a popular JavaScript library for building user interfaces.

[Vite](https://vitejs.dev/) is a blazing fast frontend build tool that includes features like Hot Module Reloading (HMR), optimized builds, and TypeScript support out of the box.

Using the two in conjunction is one of the fastest ways to build a web app.

### Getting Started
- Hit run
- Edit [App.jsx](#src/App.jsx) and watch it live update!

By default, Replit runs the `dev` script, but you can configure it by changing the `run` field in the `.replit` file.

import React, {useState, useEffect, useRef} from 'react';
import useNetwork from "./hooks/useNetwork.jsx";

const useScroll = () => {
  const [state, setState] = useState({
    x: 0,
    y: 0
  });
  const onScroll = (event) => {
    setState({y: window.scrollY, x: window.scrollX});
    console.log(state);
  }
  useEffect(()=> {
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, [])
  return state;
}

const App = () => {
  const { x, y } = useScroll();
  return(
    <div className="App" style={{width:"1000vh", height: "1000vh"}}>
     <h1 style={{ position: "fixed", color: y > 100 && x > 500 ? "red" : "blue"}}>Hi</h1>
    </div>
  )
}

export default App;

import React, {useState, useEffect, useRef} from 'react';
import useNetwork from "./hooks/useNetwork.jsx";

const countSetTest = (initialNumber) => {
  const [count, setCount] = useState(initialNumber);
  const onClick = () => {
    setCount(count + 1);
    console.log(count);
  }
  return { count, onClick };
}

const App = () => {
  const {count, onClick} = countSetTest(0);
  return(
    <div>
      <h1>{count}</h1>
      <button onClick={onClick}>button</button>
    </div>
  )
}

export default App;
