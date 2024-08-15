from typing import List
from mypy_boto3_dynamodb.service_resource import Table
from factories import TableFactory
from models import Card, CardColumn, CreateCard, UpdateCard
from boto3.dynamodb.conditions import Key, Attr, And
from ulid import ULID
from datetime import datetime

GSI_NAME = "board_id_idx"


class CardRepository:
    __table: Table

    def __init__(self, table_factory: TableFactory) -> None:
        self.__table = table_factory.build(
            table_name="cards",
            key_schema=[
                {
                    "AttributeName": "column_id",
                    "KeyType": "HASH",
                },
                {
                    "AttributeName": "id",
                    "KeyType": "RANGE",
                },
            ],
            attribute_definitions=[
                {"AttributeName": "column_id", "AttributeType": "S"},
                {"AttributeName": "id", "AttributeType": "S"},
                {"AttributeName": "board_id", "AttributeType": "S"},
            ],
            global_secondary_indexes=[
                {
                    "IndexName": "board_id_idx",
                    "KeySchema": [{"AttributeName": "board_id", "KeyType": "HASH"}],
                    "Projection": {"ProjectionType": "ALL"},
                    "ProvisionedThroughput": {
                        "ReadCapacityUnits": 5,
                        "WriteCapacityUnits": 5,
                    },
                }
            ],
        )

    def create(self, card: Card) -> Card:
        item = {
            "id": str(ULID()),
            "title": card.title,
            "description": card.description,
            "assigned_to": card.assigned_to,
            "priority": card.priority,
            "column_id": card.column_id,
            "board_id": card.board_id,
            "created_at": str(datetime.now()),
        }
        self.__table.put_item(Item=item)
        return Card.model_validate(item)

    def find_one(self, card_info=CardColumn) -> Card:
        query_expression = {
            "KeyConditionExpression": And(
                Key("column_id").eq(card_info.column_id),
                Key("id").eq(card_info.id),
            ),
        }
        page = self.__table.query(
            **query_expression,
        )
        cards = [Card.model_validate(item) for item in page["Items"]]
        return cards[0] if len(cards) > 0 else None

    def list(self, id: str, order="ASC", key="column_id") -> List[Card]:
        query_expression = {
            "KeyConditionExpression": Key(key).eq(id),
        }
        if key == "board_id":
            query_expression["IndexName"] = "board_id_idx"
        page = self.__table.query(
            **query_expression,
        )

        return sorted(
            [Card.model_validate(item) for item in page["Items"]],
            key=lambda x: x.id,
            reverse=(order == "DESC"),
        )

    def update(self, card_info: UpdateCard) -> Card:
        page = self.__table.update_item(
            Key={"column_id": card_info.column_id, "id": card_info.id},
            UpdateExpression="SET #title = :title_value, description = :description_value, assigned_to =:assigned_to_value, priority = :priority_value",
            ExpressionAttributeValues={
                ":title_value": card_info.title,
                ":description_value": card_info.description,
                ":assigned_to_value": card_info.assigned_to,
                ":priority_value": card_info.priority,
            },
            ExpressionAttributeNames={"#title": "title"},
            ReturnValues="ALL_NEW",
        )
        return Card.model_validate(page["Attributes"])

    def updateColumn(self, card_info: CardColumn, new_column: str) -> Card:
        card = self.find_one(card_info)

        if card:
            card.column_id = new_column
            new_card = self.create(card)
            self.delete(card_info)
            return new_card
        return None

    def delete(self, card_info: CardColumn) -> None:
        response = self.__table.delete_item(
            Key={
                "column_id": card_info.column_id,
                "id": card_info.id,
            }
        )
