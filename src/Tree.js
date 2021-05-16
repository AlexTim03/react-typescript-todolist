import { useEffect, useState } from 'react'
import { fetchData } from './utils/fetchData'
import { copy, findBranch } from './utils/treeUtils'

import { ReactComponent as Folder } from './icons/folder.svg'
import { ReactComponent as File } from './icons/file.svg'
import { ReactComponent as Triangle } from './icons/triangle.svg'

export const Tree = () => {

    const [tree, setTree] = useState({})
    const [loading, setLoading] = useState(false)
    //console.log(tree, typeof tree);

    useEffect(() => {

        setLoading(true)

        const fetchDataAsync = async () => {
            const result = await fetchData(0)
            result.children.forEach(child => child.isOpen = false)
            setTree(result)
            setLoading(false)
        }

        fetchDataAsync()

    }, [])


    const handleClickBranch = async id => {
        //Копирование дерева
        const newTree = copy(tree)

        //Поиск ветки
        const currentBranch = findBranch(newTree, id)
        if (currentBranch === undefined) {
            alert(`Не найден объект с id ${id}`)
            return
        }
        currentBranch.isOpen = !currentBranch.isOpen

        //Ленивая загрузка
        if (currentBranch.children.length === 0) {
            const result = await fetchData(currentBranch.id)
            result.children.forEach(child => {
                child.isOpen = false
                currentBranch.children.push({ ...child })
            })
        }

        setTree(newTree)
    }

    const renderTree = (branch, level) => {
        if (loading) {
            return null
        }

        const arr = []
        let childrenArr = []

        if (branch.children) {

            if (branch.isOpen) {
                arr.push(<Triangle onClick={() => handleClickBranch(branch.id)} />)
                //Рекурсивный вызов на уровень ниже
                childrenArr = branch.children.map(child => renderTree(child, level + 1))
            } else {
                arr.push(<Triangle className='triangle-rotate' onClick={() => handleClickBranch(branch.id)} />)
            }
            arr.push(<Folder />)

        } else {
            arr.push(<File />)
        }

        arr.push(branch.title)

        const branchComponent = (
            <div key={branch.id} className='branch' style={{ marginLeft: `${level * 20}px` }}>
                {arr.map((item, index) => <span key={index}>{item}</span>)}
            </div>
        )
        return [branchComponent, ...childrenArr]
    }

    const renderRoot = () => {
        if (!tree.children) return null
        return tree.children.map(child => renderTree(child, 0))
    }

    if (loading) {
        return <div>Загрузка...</div>
    }

    return (
        <div>
            {renderRoot()}
        </div>
    )

}