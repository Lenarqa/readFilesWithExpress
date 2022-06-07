import React, { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [data, setData] = useState({
    path: "",
    files: [],
  });

  const [parent, setParent] = useState("");

  useEffect(() => {
    fetch("http://localhost:8000/")
      .then((res) => res.json())
      .then(
        (res) => {
          setData(res);
          setParent("");
        },
        (error) => {
          console.log(error);
        }
      );
  }, []);

  const openFolderHandler = (e) => {
    e.preventDefault();
    console.log(e.target.attributes.href.value);
    fetch(`http://localhost:8000/?path=${e.target.attributes.href.value}`)
      .then((res) => res.json())
      .then((res) => {
        let linkArr = res.path.split("/");
        linkArr.pop();
        setParent(linkArr.join("/"));
        setData(res);
      });
  };

  return (
    <div className="App">
      <a href={parent} onClick={openFolderHandler}>
        back
      </a>
      <div className="current">
        current: {data.path === "" ? "/" : data.path}
      </div>
      <ul className="list">
        {data.files.map((item) => {
          if (item.dir) {
            return (
              <li key={item.name} className="folder">
                <a
                  href={data.path + "/" + item.name}
                  onClick={openFolderHandler}
                >
                  Папка -{item.name.toUpperCase()}
                </a>
              </li>
            );
          } else {
            return (
              <li key={item.name} className="files">
                Файл - {item.name}
              </li>
            );
          }
        })}
      </ul>
    </div>
  );
}

export default App;
