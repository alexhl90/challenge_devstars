
from .board_schema import BoardQuery, BoardMutations
from .column_schema import ColumnQuery, ColumnMutations
from .card_schema import CardQuery, CardMutations

from graphene import Schema


class GlobalQuery(BoardQuery, ColumnQuery, CardQuery):
    pass


class GlobalMutation(BoardMutations, ColumnMutations, CardMutations):
    pass


KB_SCHEMA = Schema(query=GlobalQuery, mutation=GlobalMutation)