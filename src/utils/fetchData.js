export const fetchData = async dirId => {
    try {

        const url = `http://164.90.161.80:3000/api/content${dirId === 0 ? '' : `?dirId=${dirId}`}`
        const response = await fetch(url)
        const result = await response.json()
        return result

    } catch (error) {
        console.error('fetch error:', error)
    }

}