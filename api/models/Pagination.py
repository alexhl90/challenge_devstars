from typing import Optional
from pydantic import BaseModel


class Pagination(BaseModel):
    last_key: Optional[str]
    size: int


default_page = Pagination(size=20, last_key=None)