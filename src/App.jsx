import { useEffect, useLayoutEffect, useState } from 'react'
import './App.css'
import { TodoContextProvider, useTodo } from './component/TodoContext';
import TodoItem from './component/TodoItem';


function App() {
  const [newTodo,setNewTodo]=useState('');

  const [todos, settodo] = useState([]);  
  const year=new Date()
  // console.log(todos)
  const addTodo =(todo) => {
    if(todo.todo){
    settodo((prev)=>[{id:Date.now(),...todo},...prev])
    setNewTodo('')
    }
  }

  const updateTodo = (id, updatedTodo) => {
    settodo((prev) =>
      prev.map((item) => (item.id === id ? { ...item, todo: updatedTodo.todo } : item))
    );
  };

  const deleteTodo = (id)=>{
    settodo((prev) =>(
      prev.filter((item) => item.id != id)
    ))
  }
  

  useEffect(() => {
    const todos=JSON.parse(localStorage.getItem("todo"));
    if(todos && todos.length > 0 )
      settodo(todos);
  }, [])

  useEffect(()=>{
    console.log(todos);
    localStorage.setItem("todo", JSON.stringify(todos));
  },[todos])



  return (
    
    <TodoContextProvider value={{todos,addTodo,updateTodo,deleteTodo}}>
      <h1 className="font-bold text-3xl text-purple-800 mb-52"> Welcome to {year.getFullYear()} Todo List..</h1>
      
      <input className='w-1/2 h-12 border-2 rounded-lg border-purple-800 shadow-lg text-center' type='text' value={newTodo} 
      onChange={(e)=>setNewTodo(e.target.value)}/> 
      <button className="rounded-xl bg-purple-800 border-2 border-white text-white font-bold mx-5 p-4 shadow-2xl
          hover:border-2 hover:border-purple-800 hover:bg-white hover:text-purple-800
      " onClick={()=>{ 
        console.log('Onclick',newTodo)
        addTodo({todo:newTodo,editable:false})
      }}>Add Todo</button>
      <button className="rounded-xl bg-purple-800 border-2 border-white text-white font-bold mx-5 p-4 shadow-2xl
          hover:border-2 hover:border-purple-800 hover:bg-white hover:text-purple-800
      " onClick={()=>{ 
        settodo([])
      }}>Delete All</button>
      <div className='h-auto p-10 mt-10 bg-zinc-700 bg-opacity-5 rounded-2xl shadow-xl'>
      { 
      // console.log('itemcard',todos)
        todos.map((item) => (
          <div key={item.id}>
            
          <TodoItem item={item}/>
          </div>
        ))
      }
      </div>
      
    </TodoContextProvider>
  )
}

export default App
