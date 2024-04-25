from fastapi import FastAPI, HTTPException
from db import db, profiles, matches
from profile import create, get, delete, update
from match import create_match, get_match, delete_match, update_match

app = FastAPI()

@app.get("/profiles")
def get_profiles():
    return profiles.all()

@app.post("/profiles")
def create_profile(data: dict):
    profile = create(data)
    return profile

@app.get("/profiles/{id}")
def get_profile(id: int):
    profile = get(id)
    if profile:
        return profile
    else:
        raise HTTPException(status_code=404, detail="Profile not found")
    
@app.delete("/profiles/{id}")
def delete_profile(id: int):
    profile = delete(id)
    if profile:
        return profile
    else:
        raise HTTPException(status_code=404, detail="Profile not found")
    
@app.put("/profiles/{id}")
def update_profile(id: int, data: dict):
    profile = update(id, data)
    if profile:
        return profile
    else:
        raise HTTPException(status_code=404, detail="Profile not found")
    
@app.post("/matches")
def create_match_endpoint(data: dict):
    match = create_match(data)
    return match

@app.get("/matches/{id}")
def get_match_endpoing(id: int):
    match = get_match(id)
    if match:
        return match
    else:
        raise HTTPException(status_code=404, detail="Match not found")
    
@app.delete("/matches/{id}")
def delete_match_endpoint(id: int):
    match = delete_match(id)
    if match:
        return match
    else:
        raise HTTPException(status_code=404, detail="Match not found")
    
@app.put("/matches/{id}")
def update_match_endpoint(id: int, data: dict):
    match = update_match(id, data)
    if match:
        return match
    else:
        raise HTTPException(status_code=404, detail="Match not found")
    