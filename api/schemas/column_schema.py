from graphene import ObjectType, String, List, Mutation, Field, DateTime, Int
from database import db_session
from models import CreateColumn, UpdateColumn, DeleteColumn


class ColumnType(ObjectType):
    id = String()
    title = String()
    order = Int()
    board_id = String()
    created_at = DateTime()


class ColumnQuery(ObjectType):
    columns = List(
        ColumnType, board_id=String(required=True), order=String(default_value="ASC")
    )

    def resolve_columns(self, info, board_id: str, order: str):
        database = db_session()
        return database.columnRepository.list_by_board_id(board_id, order=order)


class CreateColumnM(Mutation):
    class Arguments:
        title = String()
        order = Int()
        board_id = String()

    id = String()
    title = String()
    order = Int()
    board_id = String()
    created_at = String()

    def mutate(self, info, title: str, order: int, board_id: str):
        database = db_session()
        column = database.columnRepository.create(
            CreateColumn(title=title, order=order, board_id=board_id)
        )
        return CreateColumnM(**column.model_dump())


class UpdateColumnM(Mutation):
    class Arguments:
        id = String()
        title = String()
        order = Int()
        board_id = String()

    id = String()
    title = String()
    order = Int()
    board_id = String()
    created_at = String()

    def mutate(self, info, id: str, title: str, order: int, board_id: str):
        database = db_session()
        column = database.columnRepository.update(
            UpdateColumn(id=id, title=title, order=order, board_id=board_id)
        )
        return UpdateColumnM(**column.model_dump())


class DeleteColumnM(Mutation):
    class Arguments:
        id = String()
        board_id = String()

    id = String()
    board_id = String()

    def mutate(root, info, id: str, board_id: str):
        database = db_session()
        database.columnRepository.delete(DeleteColumn(id=id, board_id=board_id))
        return DeleteColumnM(board_id=id)


class ColumnMutations(ObjectType):
    create_column = CreateColumnM.Field()
    update_column = UpdateColumnM.Field()
    delete_column = DeleteColumnM.Field()
