export interface Profile {

    id: number;
    user_name: string;
    password: string;
    first_name: string;
    last_name: string;
    age: number;
    gender: string;
    preferences: string[] | null;
    liked_by: string[] | null;
}

export interface Match {
    id: number;
    profile_1: Profile;
    profile_2: Profile;
    compatibility: string;
    name: string;
}