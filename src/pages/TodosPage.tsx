import { useState, useEffect } from "react"

import { TodoForm } from "../components/TodoForm"
import { TodoList } from "../components/TodoList"

import { ITodo } from '../interfaces'

declare var confirm: (q: string) => boolean

export const TodosPage: React.FC = () => {

    const [todos, setTodos] = useState<ITodo[]>([])

    useEffect(() => {
        const saved = JSON.parse(localStorage.getItem('todos') || '[]') as ITodo[]
        setTodos(saved)
    }, [])

    useEffect(() => {
        localStorage.setItem('todos', JSON.stringify(todos))
    }, [todos])

    const addHandler = (title: string) => {
        const newTodo: ITodo = {
            title,
            id: Date.now(),
            completed: false
        }
        //setTodos([newTodo, ...todos])
        setTodos(prev => [newTodo, ...prev])
    }

    const toggleHandler = (id: number) => {
        //Но лучше работать с предыдущим состоянием
        const newTodos = todos.map(todo => {
            if (todo.id === id) {
                todo.completed = !todo.completed
            }
            return todo
        })
        setTodos(newTodos)
    }

    const removeHandler = (id: number) => {
        //1 вариант - окно window
        //const shouldRemove = window.confirm('Вы уверены, что хотите удалить элемент?')

        //2 вариант - описание переменной
        const shouldRemove = confirm('Вы уверены, что хотите удалить элемент?')
        if (shouldRemove) {
            setTodos(prev => prev.filter(todo => todo.id !== id))
        }
    }

    return (
        <>
            <TodoForm onAdd={addHandler} />
            <TodoList todos={todos} onToggle={toggleHandler} onRemove={removeHandler} />
        </>
    )
}