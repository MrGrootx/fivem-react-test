import React, { useState } from "react";
import "./App.css";
import { debugData } from "../utils/debugData";
import { fetchNui } from "../utils/fetchNui";

// This will set the NUI to visible if we are
// developing in browser
debugData([
  {
    action: "setVisible",
    data: true,
  },
]);

interface ReturnClientDataCompProps {
  data: any;
}

const ReturnClientDataComp: React.FC<ReturnClientDataCompProps> = ({
  data,
}) => (
  <>
    <h5>Returned Data:</h5>
    <pre>
      <code>{JSON.stringify(data, null)}</code>
    </pre>
  </>
);

interface ReturnData {
  x: number;
  y: number;
  z: number;
  heading: number;
}

const App: React.FC = () => {
  const [coords, setCoords] = useState<ReturnData | null>(null);
  const [input, setInput] = useState<object>({});

  function handleData() {
    fetchNui("groottestnui").then((data) => {
      // console.log(data);
      setCoords(data);
    });
  }

  function handlesubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    fetchNui("formSubmitData", input);
    
  }

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setInput((prevInput) => {
      return {
        ...prevInput,
        [name]: value,
      };
    });
  }

  return (
    <div className="text-center h-full flex justify-center items-center">
      <button className="bg-red-500" onClick={handleData} hidden>
        test
      </button>

      {coords && (
        <div>
          <h5>x:{coords.x}</h5>
          <h5>y:{coords.y}</h5>
          <h5>z:{coords.z}</h5>
          <h5>h:{coords.heading}</h5>
        </div>
      )}

      <form onSubmit={handlesubmit}>
        <input
          type="text"
          name="name"
          placeholder="Enter Name"
          className="w-full outline-none border px-2 py-2"
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="age"
          placeholder="Enter age"
          className="w-full outline-none border px-2 py-2"
          onChange={handleInputChange}
        />
        <button className="bg-teal-500 px-4 py-1 rounded">Submit</button>
      </form>
    </div>
  );
};

export default App;
