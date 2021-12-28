function count(myArr){
    const mycount = {All: 0}
    for (const index in myArr){
        const data = myArr[index].split(',')
        for (const index_data in data) {
            const cur = data[index_data].replaceAll(' ', '')
            mycount['All'] += 1 
            if (cur in mycount){
                mycount[cur] += 1
            }
            else {
                mycount[cur] = 1
            }
        }
    }
    return mycount

}
export default count
