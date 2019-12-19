class Row{
    constructor(row: any){
        for(let key in row){
            this[key] = row[key];
        }
    }
}

export { Row };