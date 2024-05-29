import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [author, setAuthor] = useState("");
  const [content, setContent] = useState("");
  const [response, setResponse] = useState(null);
  const [data, setData] = useState([]);

  //"http://{location.host}:8080/api/v1/boards"

  const fetchBoards = async () => {
    const req = await axios.get("http://34.134.111.131:8080/api/v1/boards");
    setData(req.data);
  };

  const handleSubmit = async () => {
    const data = { author, content };

    try {
      const res = await axios.post(
        "http://34.134.111.131:8080/api/v1/boards",
        data
      );

      if (res.status === 200) {
        setResponse(res.data);
      } else {
        console.error("Failed to submit data:", res.data);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    fetchBoards(); // Call fetchBoards as a function
  }, []); // Run only once on component mount

  return (
    <>
      <div>
        <div>
          <input
            placeholder="name"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
          />
          <input
            placeholder="text"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </div>
        <button onClick={handleSubmit}>submit</button>
      </div>
      <div>
        <div>
          {data.map((el, id) => (
            <div key={id}>
              <h3>Name: {el.author}</h3>
              <p>Text: {el.content}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default App;
