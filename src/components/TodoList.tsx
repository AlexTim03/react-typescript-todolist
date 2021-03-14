import { ITodo } from "../interfaces"

type TodoListProps = {
    todos: ITodo[],
    //2 варианта синтаксиса
    onToggle(id: number): void,
    onRemove: (id: number) => void
}

export const TodoList: React.FC<TodoListProps> = ({ todos, onToggle, onRemove }) => {

    if (todos.length === 0) {
        return <p className='center'>Пока дел нет!</p>
    }

    const removeHandler = (e: React.MouseEvent, id: number) => {
        e.preventDefault()
        onRemove(id)
    }

    return (
        <ul>
            {todos.map(todo => {
                const classes = ['todo']
                if (todo.completed) {
                    classes.push('completed')
                }

                return (
                    <li className={classes.join(' ')} key={todo.id}>
                        <label>
                            <input type='checkbox' checked={todo.completed} onChange={() => onToggle(todo.id)} />
                            <span>{todo.title}</span>
                            <i className='material-icons red-text' onClick={e => removeHandler(e, todo.id)}>delete</i>
                        </label>
                    </li>
                )
            })}
        </ul>
    )
}