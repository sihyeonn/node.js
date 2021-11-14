from fastapi import FastAPI
from pydantic import BaseModel
from starlette.applications import Starlette
from starlette.staticfiles import StaticFiles
from starlette.templating import Jinja2Templates

from routers import items, users


templates = Jinja2Templates(directory='templates')


app = FastAPI()


app.mount('/static', StaticFiles(directory='statics'), name='static')

app.include_router(items.router)
app.include_router(users.router)


@app.get("/")
def read_root():
    return {"Hello": "World"}


@app.get("/files/{file_path:path}", tags=["files"])
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

