from repositories.BoardRepository import BoardRepository
from repositories.ColumnRepository import ColumnRepository
from repositories.CardRepository import CardRepository
from mypy_boto3_dynamodb import DynamoDBServiceResource
from factories import TableFactory


class Database:

    def __init__(self, dynamo: DynamoDBServiceResource) -> None:
        factory = TableFactory(resource=dynamo)
        self.board_repository = BoardRepository(table_factory=factory)
        self.columnRepository = ColumnRepository(table_factory=factory)
        self.card_repository = CardRepository(table_factory=factory)
