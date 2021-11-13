from typing import List, Optional

from fastapi import FastAPI, Path, Query
from pydantic import BaseModel, Field, HttpUrl
from starlette.applications import Starlette
from starlette.staticfiles import StaticFiles
from starlette.templating import Jinja2Templates


templates = Jinja2Templates(directory='templates')


app = FastAPI()


app.mount('/static', StaticFiles(directory='statics'), name='static')


class Image(BaseModel):
    url: HttpUrl
    name: str


class Item(BaseModel):
    name: str
    price: float = Field(..., gt=0)
    tax: Optional[float] = None
    is_offer: Optional[bool] = None
    description: Optional[str] = Field(None, title="desc", max_length=300)
    tags: List[str] = []
    images: Optional[List[Image]] = None


@app.get("/")
def read_root():
    return {"Hello": "World"}


@app.get("/items/")
async def read_items(q: Optional[str] = Query(None, min_length=3, max_length=50, regex="^fixedquery$"), qs: List[str] = Query([], alias="item-queries")):
    results = {"items": [{"item_id": "1"}, {"item_id": "2"}]}
    if q:
        results.update({"q": q})
    if qs:
        results.update({"qs": qs})
    return results


@app.get("/items/{item_id}")
def read_item(
        item_id: int = Path(..., ge=1, le=1000),
        q: Optional[str] = None,
        short: bool = False
):
    item = {"item_id": item_id}

    if q:
        item.update({"q": q})
    if not short:
        item.update({"description": "This is an amazing item"})
    return item


@app.put("/items/{item_id}")
def update_item(item_id: int, item: Item):

    return {"item_name": item.name, "item_id": item_id, "is_offer": item.is_offer}


@app.post("/items/")
async def create_item(item: Item):
    item_dict = item.dict()
    if item.tax:
        price_with_tax = item.price + item.tax
        item_dict.update({"price_with_tax": price_with_tax})
    return item_dict


@app.get("/files/{file_path:path}")
async def read_file(file_path: str):
    return {"file_path": file_path}


@app.route("/error")
async def error(request):
    raise RuntimeError("Oh no")


@app.exception_handler(404)
async def not_found(request, exc):
    template = "404.html"
    context = {"request": request}
    return templates.TemplateResponse(template, context, status_code=404)


@app.exception_handler(500)
async def server_error(request, exc):
    template = "500.html"
    context = {"request": request}
    return templates.TemplateResponse(template, context, status_code=500)

