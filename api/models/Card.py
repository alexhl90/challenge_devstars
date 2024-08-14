from enum import Enum
from pydantic import BaseModel
from datetime import datetime

class Card(BaseModel):
    id: str
    title: str
    description: str
    assigned_to: str
    priority: int
    board_id: str
    column_id: str
    created_at: datetime

class CreateCard(BaseModel):
    title: str
    description: str
    assigned_to: str
    priority: int
    board_id: str
    column_id: str

class UpdateCard(BaseModel):
    id: str
    column_id: str
    title: str
    description: str
    assigned_to: str
    priority: int

class UpdateCardColumn(BaseModel):
    id: str
    column_id: str
