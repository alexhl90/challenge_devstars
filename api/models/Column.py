from typing import Optional
from pydantic import BaseModel
from datetime import datetime

class Column(BaseModel):
    id: str
    title: str
    order: int
    board_id: str
    created_at: datetime

class CreateColumn(BaseModel):
    title: str
    order: int
    board_id: str

class UpdateColumn(BaseModel):
    id: str
    title: str
    order: int
    board_id: str


class DeleteColumn(BaseModel):
    id: str
    board_id: str