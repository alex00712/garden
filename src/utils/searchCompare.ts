function searchCompare(str: string, search: string){
    const _str = str.toLowerCase()
    const _search = search.toLowerCase()
    return _str.startsWith(_search)
}

export default searchCompare