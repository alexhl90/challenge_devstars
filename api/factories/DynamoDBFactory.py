from mypy_boto3_dynamodb import DynamoDBServiceResource
from mypy_boto3_dynamodb.type_defs import (
    AttributeDefinitionTypeDef,
    ProvisionedThroughputTypeDef,
    KeySchemaElementTypeDef,
    GlobalSecondaryIndexTypeDef,
)
from mypy_boto3_dynamodb.service_resource import Table
from typing import Sequence, Optional
from logging import getLogger
from botocore.exceptions import ClientError

logger = getLogger(__name__)

default_provisioned_throughput: ProvisionedThroughputTypeDef = {
    "ReadCapacityUnits": 10,
    "WriteCapacityUnits": 10,
}

class TableFactory:
    """
    A factory class for creating and managing DynamoDB tables.
    """

    def __init__(self, resource: DynamoDBServiceResource):
        """
        Initialize the factory with a DynamoDB resource.

        :param resource: A DynamoDB service resource.
        """
        self.resource = resource

    def __create_table(
        self,
        table_name: str,
        key_schema: Sequence[KeySchemaElementTypeDef],
        attribute_definitions: Sequence[AttributeDefinitionTypeDef],
        provisioned_throughput: ProvisionedThroughputTypeDef,
        global_secondary_indexes: Optional[Sequence[GlobalSecondaryIndexTypeDef]] = None,
    ) -> Table:
        """
        Create a DynamoDB table.

        :param table_name: The name of the table to create.
        :param key_schema: The key schema for the table.
        :param attribute_definitions: The attribute definitions for the table.
        :param provisioned_throughput: The provisioned throughput settings.
        :param global_secondary_indexes: Optional secondary indexes for the table.
        :return: The created table resource.
        :raises: ClientError if the table cannot be created.
        """
        try:
            create_params = {
                "TableName": table_name,
                "KeySchema": key_schema,
                "AttributeDefinitions": attribute_definitions,
                "ProvisionedThroughput": provisioned_throughput,
            }

            if global_secondary_indexes:
                create_params["GlobalSecondaryIndexes"] = global_secondary_indexes

            table = self.resource.create_table(**create_params)
            table.wait_until_exists()
            logger.info(f"Table {table_name} created successfully.")
            return table

        except ClientError as err:
            error_code = err.response["Error"]["Code"]
            error_message = err.response["Error"]["Message"]

            logger.error(
                f"Failed to create table {table_name}. Error code: {error_code}, Message: {error_message}"
            )
            raise

    def build(
        self,
        table_name: str,
        key_schema: Sequence[KeySchemaElementTypeDef],
        attribute_definitions: Sequence[AttributeDefinitionTypeDef],
        provisioned_throughput: ProvisionedThroughputTypeDef = default_provisioned_throughput,
        global_secondary_indexes: Optional[Sequence[GlobalSecondaryIndexTypeDef]] = None,
    ) -> Table:
        """
        Build or retrieve a DynamoDB table.

        :param table_name: The name of the table to build or retrieve.
        :param key_schema: The key schema for the table.
        :param attribute_definitions: The attribute definitions for the table.
        :param provisioned_throughput: The provisioned throughput settings.
        :param global_secondary_indexes: Optional secondary indexes for the table.
        :return: The existing or newly created table resource.
        :raises: ClientError if the table cannot be built or retrieved.
        """
        table = self.resource.Table(table_name)
        try:
            table.load()
            logger.info(f"Table {table_name} loaded successfully.")
        except ClientError as err:
            error_code = err.response["Error"]["Code"]

            if error_code == 'ResourceNotFoundException':
                logger.info(f"Table {table_name} not found. Creating a new table.")
                return self.__create_table(
                    table_name=table_name,
                    key_schema=key_schema,
                    attribute_definitions=attribute_definitions,
                    provisioned_throughput=provisioned_throughput,
                    global_secondary_indexes=global_secondary_indexes,
                )
            else:
                logger.error(
                    f"Failed to load table {table_name}. Error code: {error_code}, Message: {err.response['Error']['Message']}"
                )
                raise

        return table
