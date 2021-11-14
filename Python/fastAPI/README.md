Install
```bash
$ pip install fastapi starlette gunicorn uvicorn requests
```

Run
- Run below commands and visit http://127.0.0.1:8000/docs. 
```bash
$ uvicorn main:app --reload
# or
$ gunicorn -k uvicorn.workers.UvicornWorker --access-logfile ./gunicorn-access.log main:app --bind 0.0.0.0:8000 --workers 2 --daemon
```

Run Tests
```bash
$ pip install pytest
$ pytest
```

