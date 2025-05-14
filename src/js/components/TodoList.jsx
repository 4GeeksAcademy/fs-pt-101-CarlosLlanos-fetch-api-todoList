import { useState } from 'react';

const TodoList = () => {

    const [task, setTask] = useState('')
    const [data, setData] = useState([])

    const createUser = () => {
        fetch('https://playground.4geeks.com/todo/users/cllanos', {
            method: "POST",
            headers: {
                'content-Type': 'application/json'
            }
        })
            .then(resp => {
                if (!resp.ok) throw new Error(`error status code: ${resp.status}`)
                return resp.json()
            })
            .then(data => console.log(data))
            .catch(err => console.log(err))
    }

    const getUserTodos = () => {
        fetch('https://playground.4geeks.com/todo/users/cllanos')
            .then(response => {
                console.log(response)
                if (!response.ok) throw new Error(`error code: ${response.status}`)
                return response.json()
            })
            .then(parsedJson => {
                console.log(parsedJson); // <-- aquí
                setData(parsedJson.todos);
            })
            .catch(err => console.log(err))
    }

    const createTask = () => {
        fetch('https://playground.4geeks.com/todo/todos/cllanos', {
            method: "POST",
            headers: {
                'content-Type': 'application/json'
            },
            body: JSON.stringify({ label: task, is_done: false })
        })
            .then(resp => {
                if (!resp.ok) throw new Error(`error code: ${resp.status}`)
                return resp.json()
            })
            .then(data => {
                console.log(data);
                getUserTodos(); // ✅ aquí se actualiza la lista
            })
            .catch(err => console.log(err))
    }

    const deleteTask = (id) => {
        fetch(`https://playground.4geeks.com/todo/todos/${id}`, {
            method: "DELETE"
        })
            .then(resp => {
                if (!resp.ok) throw new Error(`error code: ${resp.status}`);

                getUserTodos();
            })
            .then(data => {
                console.log("Tarea eliminada:", data);
                getUserTodos(); // actualiza la lista tras eliminar
            })
            .catch(err => console.log(err));
    };

    const handleSubmit = e => {
        e.preventDefault()
        createTask()
        setTask('')
    }

    return (
        <div>
            <div className='text-center'>
                <h1>Guarda y elimina tus tareas</h1>
                <form onSubmit={handleSubmit}>
                    <input type="text" value={task} onChange={e => setTask(e.target.value)} />
                    <input type="submit" hidden />
                    <button className="create-task-btn" type="submit">Create task</button>
                </form>
                <div>
                    <ul>
                        {data.map((el, i) =>
                            <li key={i} className="task-item">
                                <span className="task-label">{el.label}</span>
                                <button className="delete-task-btn" onClick={() => deleteTask(el.id)}>🗑</button>
                            </li>)}
                    </ul>
                </div>
            </div>
        </div>

    );
};

export default TodoList;