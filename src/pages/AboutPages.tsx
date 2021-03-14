import {useHistory} from 'react-router-dom'

export const AboutPages = () => {
    const history = useHistory()
    return (
        <>
            <h1>Страница информации</h1>
            <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Repellat, voluptate nostrum dignissimos adipisci non sunt mollitia pariatur labore temporibus id.</p>
            <button className='btn' onClick={() => history.push('/')} >Обратно к списку дел</button>
        </>
    )
}