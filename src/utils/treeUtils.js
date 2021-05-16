import {cloneDeep} from 'lodash'

export const copy = tree => cloneDeep(tree)

export const findBranch = (obj, id) => {

    if (obj.id === id) {
        return obj
    }

    if (obj.children) {

        let findItem
        
        for (let i = 0; i < obj.children.length; i++) {
            const item = obj.children[i]
            const result = findBranch(item, id)
            if (result !== undefined) {
                findItem = result
                break   
            }
        }

        return findItem
        
    }

    return undefined

}