from fastapi import FastAPI, HTTPException
from db import db, profiles, matches

from profile import create, get, delete, update, get_by_username, check_existing_username, update_by_username, delete_by_username
from match import create_match, get_match, delete_match, update_match, get_matches_by_profile

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

# @app.delete("/profiles/{id}")
# def delete_profile(id: int):
#     profile = delete(id)
#     if profile:
#         return profile
#     else:
#         raise HTTPException(status_code=404, detail="Profile not found")
    
@app.delete("/profiles/{username}")
def delete_by_username(username: str):
    profile = get_by_username(username)
    profile = delete(profile.get("id"))
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
    print(match)
    if match:
        return reformat_matches([match])[0]
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
    
@app.get("/matches/profile/{profile_id}")
def get_matches_from_profile_endpoint(profile_id: int):
    matches = get_matches_by_profile(profile_id)
    if matches:
        return reformat_matches(matches)
    else:
        return []
    #     raise HTTPException(status_code=404, detail="Match not found")
    
@app.get("/matches")
def get_matches_endpoint():
    all_matches = matches.all()
    return reformat_matches(all_matches)

def reformat_matches(raw_matches):
    for match in raw_matches:
        match['id'] = match.doc_id
    return raw_matches