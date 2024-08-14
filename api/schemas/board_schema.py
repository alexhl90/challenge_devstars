from graphene import ObjectType, String, List, Mutation, Field, DateTime
from database import db_session


class BoardType(ObjectType):
    id = String()
    name = String()
    created_at = DateTime()


class BoardQuery(ObjectType):
    board = Field(BoardType, board_id=String())
    boards = List(BoardType)

    def resolve_board(self, info, board_id):
        database = db_session()
        return database.board_repository.get_by_id(board_id)
    
    def resolve_boards(self, info):
        database = db_session()
        return database.board_repository.list()


class CreateBoardAction(Mutation):
    class Arguments:
        name = String()

    id = String()
    name = String()
    created_at = String()

    def mutate(self, info, name):
        database = db_session()
        board = database.board_repository.create(name)
        return CreateBoardAction(**board.model_dump())


class DeleteBoardAction(Mutation):
    class Arguments:
        id = String()

    id = String()

    def mutate(root, info, board_id: str):
        database = db_session()
        database.board_repository.delete_board(board_id)
        return DeleteBoardAction(board_id=id)


class BoardMutations(ObjectType):
    create_board = CreateBoardAction.Field()
    delete_board = DeleteBoardAction.Field()
