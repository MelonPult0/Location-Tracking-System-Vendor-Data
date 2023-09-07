import AWS from 'aws-sdk';
import { AWSRegions } from './types/aws';

AWS.config.update({ region: AWSRegions.US_EAST_1 });

const { DynamoDB } = AWS;

const dynamodb = new DynamoDB();

// 1 -  Create a table
export const dynamodbCreateTable = async (tableName: string) => {
  const vendorsTestTableParams: AWS.DynamoDB.CreateTableInput = {
    TableName: tableName,
    KeySchema: [{ AttributeName: 'twitterId', KeyType: 'HASH' }],
    AttributeDefinitions: [
      { AttributeName: 'twitterId', AttributeType: 'S' },
    ],
    ProvisionedThroughput: {
      ReadCapacityUnits: 10,
      WriteCapacityUnits: 10,
    },
  };
  try {
    const res = await dynamodb.createTable(vendorsTestTableParams).promise();
    console.log('Table created', res);
    return res;
  } catch (error: any) {
    if (error.code === 'ResourceInUseException') {
      console.log('------------------------------------------------------');
      console.log('Table already existed.');
      console.log('------------------------------------------------------');
      dynamodbDescribeTable(tableName);
    } else {
      console.error(error);
      throw new Error('dynamodbCreateTable error');
    }
  }
};



// 2 - Describe a table
export const dynamodbDescribeTable = async (tableName: string) => {
  try {
    const res = await dynamodb
      .describeTable({ TableName: tableName })
      .promise();
    console.log('Table retrieved', res);
    return res;
  } catch (error: any) {
    if (error.code === 'ResourceNotFoundException') {
      console.log('------------------------------------------------------');
      console.log('Table doesn\'t exist. Preparing to create a new table.');
      console.log('------------------------------------------------------');
      dynamodbCreateTable(tableName);
    } else {
      console.error(error);
      throw new Error('dynamodbDescribeTable error');
    }
  }
};

// 3 - Delete a table
export const dynamodbDeleteTable = async (tableName: string) => {
  try {
    const res = await dynamodb
      .deleteTable({ TableName: tableName })
      .promise();
    console.log('Table deleted', res);
    return res;
  } catch (error: any) {
    if (error.code === 'ResourceNotFoundException') {
      console.log('------------------------------------------------------');
      console.log('Table doesn\'t exist.');
      console.log('------------------------------------------------------');
    } else {
      console.error(error);
      throw new Error('dynamodbDeleteTable error');
    }
    
  }
};