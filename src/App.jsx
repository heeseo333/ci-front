import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";
const iState = {
  name: "",
  text: "",
};
function App() {
  const [state, setState] = useState({ ...iState });
  const [boards, setBoards] = useState([]);
  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setState({ ...state, [name]: value });
  };
  const onSubmitHandler = async () => {
    const res = await axios.post(`/api/boards`, state);
    if (res.status === 201) {
      getAllBoards();
      setState({ ...iState });
    }
  };
  const getAllBoards = async () => {
    const res = await axios.get(`/api/boards`);
    if (res.data) setBoards(res.data);
  };
  useEffect(() => {
    getAllBoards();
  }, []);
  return (
    <>
      <div>
        <input
          placeholder="name"
          name="name"
          value={state.name}
          onChange={onChangeHandler}
        />
        <input
          placeholder="text"
          name="text"
          value={state.text}
          onChange={onChangeHandler}
        />
        <br />
        <button onClick={onSubmitHandler}>submit</button>
      </div>
      <div>
        {boards.map((data) => (
          <div key={data.id}>
            <b>{data.name}</b> : {data.text}
          </div>
        ))}
      </div>
    </>
  );
}

export default App;
