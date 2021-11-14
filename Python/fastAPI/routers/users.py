from typing import List, Optional

from datetime import time

from fastapi import APIRouter, Path, Query, Body
from pydantic import BaseModel, Field, HttpUrl
from starlette.applications import Starlette
from starlette.staticfiles import StaticFiles
from starlette.templating import Jinja2Templates


router = APIRouter(
        prefix="/users",
        tags=["users"]
)


class UserBase(BaseModel):
    username: str
    password: str
    full_name: Optional[str] = None


class UserIn(UserBase):
    password: str


class UserOut(UserBase):
    pass


@router.post("/", response_model=UserOut)
async def create_user(user: UserIn):
    return user

