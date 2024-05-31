import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

const initialState = {
  author: "",
  content: "",
};

function App() {
  const [state, setState] = useState({ ...initialState });
  const [boards, setBoards] = useState([]);

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setState({ ...state, [name]: value });
  };

  const onSubmitHandler = async () => {
    try {
      const res = await axios.post("/api/v1/boards", state);
      if (res.status === 201) {
        getAllBoards();
        setState({ ...initialState });
      }
    } catch (error) {
      console.error("Error submitting:", error);
    }
  };

  const getAllBoards = async () => {
    try {
      const res = await axios.get("/api/v1/boards");
      if (res.data) setBoards(res.data);
    } catch (error) {
      console.error("Error getting boards:", error);
    }
  };

  useEffect(() => {
    getAllBoards();
  }, []);

  return (
    <>
      <div>
        <input
          placeholder="author"
          name="author"
          value={state.author}
          onChange={onChangeHandler}
        />
        <input
          placeholder="content"
          name="content"
          value={state.content}
          onChange={onChangeHandler}
        />
        <br />
        <button onClick={onSubmitHandler}>submit</button>
      </div>
      <div>
        {boards.map((data) => (
          <div key={data.id}>
            <b>{data.author}</b>: {data.content}
          </div>
        ))}
      </div>
    </>
  );
}

export default App;
