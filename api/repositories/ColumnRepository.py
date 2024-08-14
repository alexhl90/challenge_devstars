from typing import List
from mypy_boto3_dynamodb.service_resource import Table
from factories import TableFactory
from models import Column, CreateColumn, UpdateColumn, DeleteColumn
from boto3.dynamodb.conditions import Key, Attr
from ulid import ULID
from datetime import datetime


class ColumnRepository:
    __table: Table

    def __init__(self, table_factory: TableFactory) -> None:
        self.__table = table_factory.build(
            table_name="columns",
            key_schema=[
                {
                    "AttributeName": "board_id",
                    "KeyType": "HASH",
                },
                {
                    "AttributeName": "id",
                    "KeyType": "RANGE",
                },
            ],
            attribute_definitions=[
                {"AttributeName": "board_id", "AttributeType": "S"},
                {"AttributeName": "id", "AttributeType": "S"},
            ],
        )

    def create(self, column: CreateColumn) -> Column:
        item = {
            "id": str(ULID()),
            "title": column.title,
            "board_id": column.board_id,
            "order": column.order,
            "created_at": str(datetime.now()),
        }
        self.__table.put_item(Item=item)
        return Column.model_validate(item)

    def list_by_board_id(self, board_id: str, order="ASC") -> List[Column]:
        page = self.__table.query(
            KeyConditionExpression=Key("board_id").eq(board_id),
        )

        return sorted(
            [Column.model_validate(item) for item in page["Items"]],
            key=lambda x: x.order,
            reverse=(order == "DESC"),
        )

    def update(self, update_column_info: UpdateColumn) -> Column:
        page = self.__table.update_item(
            Key={
                "board_id": update_column_info.board_id,
                "id": update_column_info.id,
            },
            UpdateExpression="SET #order = :order_value, title=:title_value",
            ExpressionAttributeValues={
                ":order_value": update_column_info.order,
                ":title_value": update_column_info.title,
            },
            ExpressionAttributeNames={"#order": "order"},
            ReturnValues="ALL_NEW",
        )
        return Column.model_validate(page["Attributes"])

    def delete(self, column_info: DeleteColumn) -> None:
        response =self.__table.delete_item(Key={**column_info.model_dump()})
        print(f"Deleted column: {response}")
