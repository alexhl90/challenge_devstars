from typing import Optional
from pydantic import BaseModel
from ulid import ULID
from datetime import datetime


class Board(BaseModel):
    id: ULID
    name: str
    created_at: datetime