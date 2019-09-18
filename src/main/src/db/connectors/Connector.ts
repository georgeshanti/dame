export default interface Connector{
    executeQuery(statement: string);
    getTables();
}