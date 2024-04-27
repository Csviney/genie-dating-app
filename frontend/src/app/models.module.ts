export interface Profile {

    id?: number;
    username: string;
    password: string;
    first_name: string;
    last_name: string;
    age: number | null;
    gender: string;
    preferences: string[] | null;
    liked_by?: string[] | null;
}

export interface Match {
    id: number;
    profile_1: Profile;
    profile_2: Profile;
    compatibility: string;
    name: string;
}