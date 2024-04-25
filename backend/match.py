from pydantic import BaseModel
from db import profiles, matches
from tinydb import TinyDB, Query

class Match():
    id: int
    profile_1: int
    profile_2: int
    compatibility: int

    def __init__(self, profile_1: int, profile_2: int, compatibility: int):
        self.id = (matches.all()[-1]['id'] if matches.all() else 0) + 1
        self.profile_1 = profile_1
        self.profile_2 = profile_2
        self.compatibility = compatibility

    def to_dict(self):
        return {"id": self.id, "profile_1": self.profile_1, "profile_2": self.profile_2, "compatibility": self.compatibility}

def create_match(data):
    match = Match(data.get("profile_1"), data.get("profile_2"), data.get("compatibility"))
    matches.insert(match.to_dict())
    return match.to_dict()

def get_match(id):
    match = matches.get(doc_id=id)
    if match:
        return match
    return None

def delete_match(id):
    match = matches.get(doc_id=id)
    if match:
        matches.remove(doc_ids=[id])
        return match
    return None

# def update(id, data):
#     profile = profiles.get(doc_id=id)
#     profile_id = Query()
#     if profile:
#         profiles.update(data, profile_id.id == id)
#         profile = profiles.get(doc_id=id)
#         return profile
#     return None