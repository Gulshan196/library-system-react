import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
function Dashboard() {
  const [query, setQuery] = useState('');

  const [items,setItems] = useState([]);
  const {state} = useLocation();
  const {name} = state || {};
  const getBooks = () =>{
        axios.get('http://localhost:8000/book/getall').then(val=>setItems(val.data));
  }

  const handleBorrow = async(title) => {
  let data = await axios.put("https://library-system-backend.vercel.app/student/ask",{title:title})
alert(data.data);
  }

  useEffect(()=>{
    getBooks();
  },[])

  const filteredItems = items.filter(item =>
    item.title.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="search-list-container">
        <h1>{name}</h1>
      <input
        type="text"
        value={query}
        onChange={e => setQuery(e.target.value)}
        placeholder="Search Books..."
        className="search-input"
      />
       <div className="table">
      <div className="header">
        <div className="cell">Title</div>
        <div className="cell">Author</div>
        <div className="cell">Available</div>
        <div className='cell'>Borrow a Book</div>
      </div>
      
    
        {items && filteredItems.map(item => (
          <div className='row' key={item._id}>
            <div className='cell'>{item.title}</div>
            <div className="cell">{item.author}</div>
          <div className="cell">{item.isAvailable? "yes" :" no"}</div>
          <button className="cell-button" onClick={()=>handleBorrow(item.title)}>Borrow</button>
          </div>
        ))}

</div>
      
    </div>
  );
}

export default Dashboard;
