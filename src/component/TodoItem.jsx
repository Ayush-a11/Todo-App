import React,{useState} from 'react'
import { useTodo } from './TodoContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCarTunnel, faCartShopping, faCreditCard, faPencil, faSave, faTrash } from '@fortawesome/free-solid-svg-icons'

function TodoItem({item}) {
	const [todomsg, setTodomsg] = useState(item.todo);
	const [editable, setEditable] = useState(false)
	const {updateTodo,deleteTodo} = useTodo();


	const updateMsg =()=>{
		// console.log('trig',editable,'todomsg=',todomsg,'c=',item.todo);

		if(editable===false) {
			setEditable(true);
			return;
		}
		else
		if(todomsg!=item.todo){
		// console.log('trig');
		updateTodo(item.id,{...item,todo:todomsg});
		}
		setEditable(false);
	}

	const deletehandler = ()=>{

		deleteTodo(item.id);
	}

  return (
	<div display="flex justify-center content:center space-x-2 my-2">

		<input className={`w-5/12 h-12 rounded-lg border-purple-800 drop-shadow-2xl text-center
							${!editable?'bg-white border-0':'border-2'}
						`}
			 type="text" 
		
			value={todomsg} onChange={(e) =>setTodomsg(e.target.value)}

			readOnly={!editable}
		/>
		<button className="rounded-xl bg-purple-800 border-2 border-white text-white font-bold mx-6 p-3 shadow-2xl
          hover:border-2 hover:border-purple-800 hover:bg-white hover:text-purple-800 
		  " 
		  
		  onClick= {updateMsg}>{!editable? <FontAwesomeIcon icon={faPencil} /> :<FontAwesomeIcon icon={faSave} />}</button>
		<button className="rounded-xl bg-purple-800 border-2 border-white text-white font-bold mx-5 p-3 shadow-2xl
          hover:border-2 hover:border-purple-800 hover:bg-white hover:text-purple-800
      " onClick={deletehandler}><FontAwesomeIcon icon={faTrash} /></button>
	  
	</div>
  )
}

export default TodoItem