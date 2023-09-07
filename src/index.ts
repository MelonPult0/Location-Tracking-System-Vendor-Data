import { 
  dynamodbCreateTable,
  dynamodbDescribeTable,
  dynamodbDeleteTable
 } from './aws';

const init = async () => {
  const TABLE_NAME_CONST = 'vendors';
  
  // 1 - create table
    // dynamodbCreateTable(TABLE_NAME_CONST);
  
  // 2 - describe table
    // dynamodbDescribeTable(TABLE_NAME_CONST);
  
  // 3 - delete table
    dynamodbDeleteTable(TABLE_NAME_CONST);
} 

init();
