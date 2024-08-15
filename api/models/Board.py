from typing import Optional
from pydantic import BaseModel
from ulid import ULID
from datetime import datetime


class Board(BaseModel):
    id: str
    name: str
    created_at: datetime

class UpdateBoard(BaseModel):
    id: str
    name: str