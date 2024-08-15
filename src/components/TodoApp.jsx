import React, { useState } from 'react';
import "./TodoApp.css";

function TodoApp() {
    const [input, setInput] = useState("");
    const [items, setItems] = useState([]);
    const [validationMessage, setValidationMessage] = useState("");
    const [editingIndex, setEditingIndex] = useState(null);

    const handleChange = (event) => {
        setInput(event.target.value);
        setValidationMessage(""); 
    };

    const storeItems = (event) => {
        event.preventDefault();
        if (input.trim() === "") return;

        const lowerCaseInput = input.toLowerCase();
        const itemExists = items.some(item => item.text.toLowerCase() === lowerCaseInput);

        if (!itemExists) {
          if (editingIndex !== null) {
              const updatedItems = items.map((item, index) =>
                  index === editingIndex ? { ...item, text: input } : item
              );
              setItems(updatedItems);
              setEditingIndex(null); 
          } else {
              setItems([...items, { text: input, completed: false }]);
          }
          setInput(""); 
      } else {
          setValidationMessage("Item already exists!"); 
      }
  };


    const deleteItem = (key) => {
        const allItems = [...items];
        allItems.splice(key, 1);
        setItems(allItems);
    };

    const toggleCompletion = (key) => {
        const allItems = items.map((item, index) =>
            index === key ? { ...item, completed: !item.completed } : item
        );
        setItems(allItems);
    };
    const editItem = (key) => {
      setInput(items[key].text);
      setEditingIndex(key);
  };

    return (
        <div className="todo-container">
            <div>
                <form className="input-section" onSubmit={storeItems}>
                    <h1>TO DO APP</h1>
                    <h5>Organize Your Day, Your Way</h5>
                    <input 
                        type='text' 
                        value={input} 
                        onChange={handleChange} 
                        placeholder='Enter items...'
                    />
                    {validationMessage && (
                        <p style={{ color: 'red' }}>{validationMessage}</p>
                    )}
                </form>
                <ul>
                    {items.map((item, index) => (
                        <li 
                            key={index} 
                            className={item.completed ? "completed" : ""}
                        >
                            <input 
                                type="checkbox" 
                                checked={item.completed} 
                                onChange={() => toggleCompletion(index)}
                            />
                            <span style={{ textDecoration: item.completed ? "line-through" : "none" ,  color: item.completed ? "gray" : "black"}}>
                                {item.text}
                            </span>
                            <i 
                                className="fas fa-edit" 
                                onClick={() => editItem(index)}
                        
                            ></i>
                            <i 
                                className="fa-solid fa-trash-can" 
                                onClick={() => deleteItem(index)}
                            ></i>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default TodoApp;
