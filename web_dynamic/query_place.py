#!/usr/bin/python3
from models import storage
from models.place import Place

places = storage.all(Place).values()
print(f"Total places in database: {len(list(places))}")
for place in places:
    print(f"Place: {place.id}, {place.name}")
