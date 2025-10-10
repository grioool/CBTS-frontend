import axios from "axios";

export interface Note {
    id: number;
    content: string;
}


export async function addNewNote(content: string, token: string): Promise<Note> {
    const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/note`,
        {content},
        {headers: {Authorization: `Bearer ${token}`}}
    );
    return response.data;
}

export async function getUserNoteHistory(token: string): Promise<Note[]> {
    const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/note`, {
        headers: {Authorization: `Bearer ${token}`},
    });
    return response.data as Note[];
}
