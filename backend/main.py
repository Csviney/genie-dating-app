from fastapi import FastAPI, HTTPException
from db import db, profiles, matches
from profile import create, get, delete, update, get_by_username, check_existing_username, update_by_username
from match import create_match, get_match, delete_match, update_match
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

origins=["*"]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

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
    
@app.get("/profiles/username/{username}")
def get_profile_by_username(username: str):
    profile = get_by_username(username)
    if profile:
        return profile
    else:
        raise HTTPException(status_code=404, detail="Profile not found")

@app.get("/check-username/{username}")
def existing_username(username: str):
    profile = profiles.all()
    return check_existing_username(username, profile)

@app.delete("/profiles/{id}")
def delete_profile(id: int):
    profile = delete(id)
    if profile:
        return profile
    else:
        raise HTTPException(status_code=404, detail="Profile not found")

@app.put("/profiles/username/{username}")
def update_profile(username: str, data: dict):
    profile = update_by_username(username, data)
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
def get_match_endpoint(id: int):
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
    