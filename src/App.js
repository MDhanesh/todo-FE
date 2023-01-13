import Todo from "./components/Todo";
import axios from "axios";
import { useState, useEffect } from "react";

function App() {
  const [toDo, setToDo] = useState([]);

  const getAllToDo = async () => {
    try {
      const res = await axios.get("http://localhost:4000/");
      console.log(res.data);
      setToDo(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getAllToDo();
  }, []);

  //add
  let value = {
    text: "",
  };
  const [post, setPost] = useState(value);

  const save = async () => {
    try {
      const res = await axios.post("http://localhost:4000/save", {
        text: post.text,
      });
      // setToDo([...toDo, res.data]);
      console.log(res.data);
      setPost(post);
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  const deleteToDo = async (id) => {
    try {
      const res = await axios.delete(`http://localhost:4000/delete/${id}`);
      console.log(res);
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="App">
        <div className="container  text-center mt-5">
          <h1>ToDo App</h1>
          <div className="mt-5 d-flex justify-content-center">
            <input
              className="input-line w-50"
              type="text"
              placeholder="Add ToDos..."
              value={post.text}
              onChange={(e) => setPost({ text: e.target.value })}
            />

            <button
              className="add bg-dark text-white px-4  py-1"
              onClick={save}
            >
              Add
            </button>
          </div>
          <div className="list">
            {toDo.map((item, index) => (
              <Todo
                key={index}
                text={item.text}
                // updateMode={() => updateMode(item._id, item.text)}
                deleteToDo={() => deleteToDo(item._id)}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
