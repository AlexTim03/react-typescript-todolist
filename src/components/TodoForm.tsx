import { useState } from "react"

interface ITodoFormProps {
    onAdd(title: string): void
}

export const TodoForm: React.FC<ITodoFormProps> = ({ onAdd }) => {

    const [title, setTitle] = useState<string>('')

    const changeHadler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(e.target.value)
    }

    const keyPressHandler = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            //console.log(title);
            onAdd(title)
            setTitle('')
        }
    }

    return (
        <div className='input-field mt2'>
            <input
                type='text'
                id='title'
                placeholder='Введите название дела'
                value={title}
                onChange={changeHadler}
                onKeyPress={keyPressHandler}
            />
            <label className='active' htmlFor='title'>
                Введите название дела
            </label>
        </div>
    )
}