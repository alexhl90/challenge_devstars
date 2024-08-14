from graphene import ObjectType, String, List, Mutation, Field, DateTime, Int
from database import db_session
from models import Card, CreateCard, UpdateCard, UpdateCardColumn


class CardType(ObjectType):
    id = String()
    title = String()
    description = String()
    assigned_to = String()
    priority = Int()
    board_id = String()
    column_id = String()
    created_at = DateTime()


class CardQuery(ObjectType):
    card = Field(CardType, id=String(required=True))
    cards_by_column = List(
        CardType, column_id=String(required=True), order=String(default_value="ASC")
    )
    cards_by_board = List(
        CardType, board_id=String(required=True), order=String(default_value="ASC")
    )

    def resolve_card(self, info, id: str):
        database = db_session()
        return database.card_repository.get(id)

    def resolve_cards_by_column(self, info, column_id: str, order: str):
        database = db_session()
        return database.card_repository.list(column_id, order, key="column_id")

    def resolve_cards_by_board(self, info, board_id: str, order: str):
        database = db_session()
        return database.card_repository.list(board_id, order, key="board_id")


class CreateCardM(Mutation):
    class Arguments:
        title = String()
        description = String()
        assigned_to = String()
        priority = Int()
        board_id = String()
        column_id = String()

    id = String()
    title = String()
    description = String()
    assigned_to = String()
    priority = Int()
    board_id = String()
    column_id = String()
    created_at = DateTime()

    def mutate(
        self,
        info,
        title: str,
        description: str,
        assigned_to: str,
        priority: int,
        board_id: str,
        column_id: str,
    ):
        database = db_session()
        card = database.card_repository.create(
            CreateCard(
                title=title,
                description=description,
                assigned_to=assigned_to,
                priority=priority,
                board_id=board_id,
                column_id=column_id,
            )
        )
        return CreateCardM(**card.model_dump())


class UpdateCardM(Mutation):
    class Arguments:
        id = String()
        column_id = String()
        title = String()
        description = String()
        assigned_to = String()
        priority = Int()

    id = String()
    title = String()
    description = String()
    assigned_to = String()
    priority = Int()
    board_id = String()
    column_id = String()
    created_at = DateTime()

    def mutate(
        self,
        info,
        id: str,
        column_id: str,
        title: str,
        description: str,
        assigned_to: str,
        priority: int,
    ) -> Card:
        database = db_session()
        updatedCard = database.card_repository.update(
            UpdateCard(
                id=id,
                column_id=column_id,
                title=title,
                description=description,
                assigned_to=assigned_to,
                priority=priority,
            )
        )
        return UpdateCardM(**updatedCard.model_dump())


class UpdateCardColumnM(Mutation):
    class Arguments:
        id = String()
        column_id = String()
        new_column_id = String()

    id = String()
    column_id = String()

    def mutate(root, info, id: str, column_id: str, new_column_id: str):
        database = db_session()
        database.card_repository.updateColumn(
            UpdateCardColumnM(id=id, column_id=column_id), new_column_id
        )
        return UpdateCardColumnM(id=id, column_id=new_column_id)


class DeleteCardM(Mutation):
    class Arguments:
        id = String()
        column_id = String()

    id = String()
    column_id = String()

    def mutate(root, info, id: str, column_id: str):
        database = db_session()
        database.card_repository.delete(UpdateCardColumn(id=id, column_id=column_id))
        return DeleteCardM(id=id, column_id=column_id)


class CardMutations(ObjectType):
    create_card = CreateCardM.Field()
    update_card = UpdateCardM.Field()
    update_card_column = UpdateCardColumnM.Field()
    delete_card = DeleteCardM.Field()
    
