import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
// for a unique id
import { v4 as uuidv4 } from "uuid";
import { RiEditBoxLine } from "react-icons/ri";
import { MdDeleteOutline } from "react-icons/md";

const App = () => {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const [showfinished, setShowfinished] = useState(true);

  useEffect(() => {
    let todoString = localStorage.getItem("todos");
    if (todoString) {
      let todos = JSON.parse(todoString);
      setTodos(todos);
    }
  }, []);

  const savetoLS = () => {
    localStorage.setItem("todos", JSON.stringify(todos));
  };

  const handleEdit = (e, id) => {
    // console.log(id);
    let t = todos.filter((i) => {
      return i.id === id;
    });
    setTodo(t[0].todo);

    let newTodos = todos.filter((item) => {
      return item.id !== id;
    });
    setTodos(newTodos);
    savetoLS();
  };

  const handleDelete = (e, id) => {
    // console.log(`The id is --> ${id}`);
    todos.findIndex((item) => {
      return item.id == id;
    });
    let newTodos = todos.filter((item) => {
      return item.id !== id;
    });
    setTodos(newTodos);
    savetoLS();
  };

  const handleAdd = () => {
    setTodos([...todos, { todo, isCompleted: false, id: uuidv4() }]);
    setTodo("");
    savetoLS();
  };
  const handleChange = (e) => {
    setTodo(e.target.value);
  };

  const handleCheckbox = (e) => {
    let id = e.target.name;
    // console.log(id);

    let index = todos.findIndex((item) => {
      return item.id == id;
    });
    let newTodos = [...todos];
    newTodos[index].isCompleted = !newTodos[index].isCompleted;
    setTodos(newTodos);
    savetoLS();
  };
  const toggleFinished = (e) => {
    setShowfinished(!showfinished)
  };

  return (
    <>
      <Navbar name={"iTask"} />
      <div className="container mx-auto bg-violet-300 p-5 rounded-xl min-h-[85vh] w-4/5 lg:w-1/2">
        <div className="addTodo mx-0.5">
          <h2 className="text-lg font-bold my-5">Add a Todo</h2>
         <div className="flex gap-4">
         <input
            onChange={handleChange}
            value={todo}
            type="text"
            placeholder="Enter Text..."
            autoFocus
            className="outline-none border-none rounded-md bg-violet-200 w-10/12 px-2 py-1"
          />
          <button
            className="bg-violet-800 px-3 py-1 rounded-md text-white hover:bg-violet-950 border-none outline-none text-sm font-bold tracking-wide focus:ring-2 ring-offset-1 ring-offset-orange-300 focus:ring-orange-500 selection:bg-transparent disabled:bg-violet-500 "
            onClick={handleAdd}
            disabled={todo.length <= 3}
          >
            Save
          </button>
         </div>
        </div>

        <div className="my-3 font-semibold tracking-wide">
          <input onChange={toggleFinished} type="checkbox" checked={showfinished} className="cursor-pointer mx-1 outline-violet-500" /> Show Finished Todo's
        </div>
        <h2 className="text-lg font-bold my-3">Your Todo's</h2>
        <div className="todos flex flex-col gap-4 max-h-[60vh] p-2 overflow-y-scroll">
          {todos.length === 0 && (
            <div className=" border px-4 py-2 rounded-lg tracking-wide font-semibold w-full h-[60vh] flex justify-center items-center text-3xl">
              No Todo's to display
            </div>
          )}

          {todos.map((item) => {
            return (showfinished || !item.isCompleted) && (
              <div
                key={item.id}
                className="todo flex justify-between items-center border px-4 py-2 rounded-lg tracking-wide font-semibold w-full"
              >
                <div className="flex gap-2 items-center">
                  <input
                    name={item.id}
                    onChange={handleCheckbox}
                    type="checkbox"
                    checked={item.isCompleted}
                    className="outline-violet-500 border-none cursor-pointer h-fit"
                  />
                  <div className={item.isCompleted ? "line-through" : ""}>
                    {item.todo}
                  </div>
                </div>
                <div className="buttons flex gap-3 items-center">
                  <button
                    onClick={(e) => handleEdit(e, item.id)}
                    className="text-white  p-1 lg:p-2 rounded-md bg-violet-800 hover:bg-violet-950 border-none text-sm font-bold tracking-wide focus:ring-2 ring-offset-1 ring-offset-orange-300 focus:ring-orange-500 selection:bg-transparent hover:scale-125 transition-all duration-100 ease-in "
                  >
                    <RiEditBoxLine color="#ffff" className="hover:-rotate-12 transition-all duration-100 ease-in" />
                  </button>
                  <button
                    onClick={(e) => {
                      handleDelete(e, item.id);
                    }}
                    className="text-white  p-1 lg:p-2 rounded-md bg-violet-800 hover:bg-violet-950 border-none text-sm font-bold tracking-wide focus:ring-2 ring-offset-1 ring-offset-orange-300 focus:ring-orange-500 selection:bg-transparent hover:scale-125 transition-all duration-100 ease-in"
                  >
                    <MdDeleteOutline color="#ffff" className="hover:rotate-12 transition-all duration-100 ease-in" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default App;
// 1:01:30