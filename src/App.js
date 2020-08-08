import React from "react";
import "antd/dist/antd.css";
import { Provider } from "react-redux";
import Diagrams from "./component/Diagrams";
import store from "./redux/store";

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <Diagrams />
      </div>
    </Provider>
  );
}

export default App;
