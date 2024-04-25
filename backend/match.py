from pydantic import BaseModel
from db import profiles, matches
from tinydb import TinyDB, Query
import requests


class Match():
    id: int
    profile_1: int
    profile_2: int
    compatibility: str
    name: str

    def __init__(self, profile_1: int, profile_2: int):
        self.id = (matches.all()[-1]['id'] if matches.all() else 0) + 1
        self.profile_1 = profile_1
        self.profile_2 = profile_2
        query = Query()
        first_name = ""
        second_name = ""
        first = profiles.search(query.id==profile_1)
        if first:
            for x in first:
                first_name = x.get("first_name")
        second = profiles.search(query.id==profile_2)
        if second:
            for x in second:
                second_name = x.get("first_name")
        self.name = first_name + " + " + second_name
        url = 'https://love-calculator.p.rapidapi.com/getPercentage'
        params = {'fname': first_name, 'sname': second_name}
        headers = {
            'X-RapidAPI-Key': '4e45cbfde1msh7e2c0876405a69bp129010jsn3b6de73e5266',
            'X-RapidAPI-Host': 'love-calculator.p.rapidapi.com'
        }
            
        response = requests.get(url, headers=headers, params=params)
        if response.status_code == 200:
            result = response.json()
            self.compatibility = result.get('percentage') + "%"
        else:
            self.compatibility = "Error fetching compatibility"

    def to_dict(self):
        return {"id": self.id, "profile_1": self.profile_1, "profile_2": self.profile_2, "compatibility": self.compatibility, "name": self.name}
    

def create_match(data):
    match = Match(data.get("profile_1"), data.get("profile_2"))
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

def update_match(id, data):
    match = matches.get(doc_id=id)
    match_id = Query()
    if match:
        matches.update(data, match_id.id == id)
        match = matches.get(doc_id=id)
        return match
    return None