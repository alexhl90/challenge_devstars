from typing import List
from mypy_boto3_dynamodb.service_resource import Table
from factories.DynamoDBFactory import TableFactory
from models import Board, Pagination, default_page, UpdateBoard
from datetime import datetime
from ulid import ULID

class BoardRepository:
    __table: Table

    def __init__(self, table_factory: TableFactory) -> None:
        self.__table = table_factory.build(
            table_name="boards",
            key_schema=[{"AttributeName": "id", "KeyType": "HASH"}],
            attribute_definitions=[{"AttributeName": "id", "AttributeType": "S"}],
        )

    def create(self, board_name) -> Board:
        uuid = str(ULID())
        item = {"id": uuid, "name": board_name, "created_at": str(datetime.now())}
        self.__table.put_item(Item=item)
        return Board.model_validate(item)
    
    def list(self, page: Pagination = default_page) -> List[Board]:
        page = (
            self.__table.scan(Limit=page.size)
            if not page.last_key
            else self.__table.scan(
                Limit=page.size, ExclusiveStartKey={"id": page.last_key}
            )
        )
        return [Board.model_validate(item) for item in page["Items"]]
    def update(self, update_board_info: UpdateBoard) -> Board:
        page = self.__table.update_item(
            Key={
                "id": update_board_info.id,
            },
            UpdateExpression="SET #name = :name_value",
            ExpressionAttributeValues={
                ":name_value": update_board_info.name,
            },
            ExpressionAttributeNames={"#name": "name"},
            ReturnValues="ALL_NEW",
        )
        return Board.model_validate(page["Attributes"])

    def get_by_id(self, board_id: str) -> Board:
        response = self.__table.get_item(Key={"id": board_id})
        return Board.model_validate(response["Item"])

    def delete_board(self, board_id: str) -> None:
        self.__table.delete_item(Key={"id": board_id})
