import { createContext,useContext } from "react";


const TodoContext= createContext({
					todos : [{
						id:1,
						todo:"hi",
						editable:false
					}],
					addTodo :(todo) =>{},
					updateTodo :(id,todo) =>{},
					deleteTodo :(id)=>{}
				}
	);


export const TodoContextProvider =TodoContext.Provider;


export const useTodo =() => {

	return useContext(TodoContext);
}
