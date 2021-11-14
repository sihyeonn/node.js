from fastapi.testclient import TestClient

from ..routers.items import router


client = TestClient(router)


def test_read_items():
    response = client.get("/items?item-queries=123")
    assert response.status_code == 200
    assert response.json() == {"items": [{"item_id": "1"}, {"item_id": "2"}], "qs": ["123"]}

