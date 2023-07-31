import React from 'react';
import './index.scss';
import Collection from './components/Collection';

function App() {

  const cats = [
    { "name": "All" },
    { "name": "Aesthetic" },
    { "name": "Mountains" },
    { "name": "Sunset" },
    { "name" : "Flowers"},
    { "name" : "Food"}
  ];

  const [categoryId, setCategoryId] = React.useState(0);
  const [collections, setCollections] = React.useState([]);
  const [searchValue, setSearchValue] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(true);
  const [page, setPage] = React.useState(1);

  React.useEffect(() => {
    setIsLoading(true);
    const categoryParam = categoryId !== 0 ? "category=" + categoryId : "";
    fetch(
      `https://64c7bddca1fe0128fbd53cd5.mockapi.io/photos_collection?page=${page}&limit=4&${categoryParam}`
    )
    .then(res => res.json())
    .then(data => {
      setCollections(data);
    })
    .catch((err) => console.warn(err))
    .finally(() => setIsLoading(false))
  }, [categoryId, page]);

  const onChangeSearchValue = (e) => {
    setSearchValue(e.target.value);
  }

  return (
    <div className="App">
      <h1>A selection of beautiful photos</h1>
      <h3></h3>
      <div className="top">
        <ul className="tags">
          {
            cats.map((el, index) => {
              return (
                <li 
                  onClick={() => setCategoryId(index)}
                  className={categoryId === index ? "active" : "" } 
                  key={index}
                >
                  {el.name}
                </li>
              )
            })
          }
        </ul>
        <input onChange={onChangeSearchValue} className="search-input" placeholder="Search..." />
      </div>
      <div className="content">
        {
        isLoading ? (
          <h2>Loading...</h2>
        ) : (
          collections
            .filter(obj => obj.name.toLowerCase().includes(searchValue.toLowerCase()))
            .map((el, index) => {
              return <Collection name={el.name} images={el.photos} key={index} />;
          })
        )}
      </div>
      <ul className="pagination">
        {
          [...Array(3)].map((el, i) => {
            return (
              <li 
                onClick={() => setPage(i + 1)}
                className={page === i + 1 ? "active" : ""} 
                key={i}>{i + 1}
              </li>
            )
          })
        }
      </ul>
      <p className="par">made with love :з</p>
    </div>
  );
}

export default App;
