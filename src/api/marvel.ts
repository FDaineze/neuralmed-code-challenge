import axios from 'axios';
import { Character, MarvelApiResponse, MarvelApiDetails, MarvelItem } from '../types/marvel';
import { MarvelApiParams } from '../types/api';

const API_URL = 'https://gateway.marvel.com/v1/public/characters';

export const fetchMarvelCharacters = async (
    name: string, 
    page: number, 
    itemsPerPage: number, 
    serverTs: string,
    serverApiKey: string, 
    serverHash: string 
): Promise<{
    data: Character[];
    totalCount: number;
}> => {
    const offset = (page - 1) * itemsPerPage;

    const params: MarvelApiParams = {
        ts: serverTs,
        apikey: serverApiKey,
        hash: serverHash,
        limit: itemsPerPage,
        offset,
    };

    if (name.trim()) {
        params.nameStartsWith = name;
    }

    try {
        const response = await axios.get<MarvelApiResponse>(API_URL, {
            params,
            headers: {
                'Accept': 'application/json',
            },
        });

        return {
            data: response.data.data.results as Character[],
            totalCount: response.data.data.total,
        };
    } catch (error) {
        console.error('%c'+error,'background:red; color:white;');
        throw new Error('Failed to fetch characters.');
    }
};

export const fetchMarvelCharacterById = async (
    id: number, 
    serverTs: string,
    serverApiKey:string, 
    serverHash:string
): Promise<Character> => {
    
    try {
        const response = await axios.get(`${API_URL}/${id}`, {
            params: {
                ts: serverTs,
                apikey: serverApiKey,
                hash: serverHash,
            },
            headers: {
                'Accept': 'application/json',
            },
        });

        return response.data.data.results[0];
    } catch (error) {
        console.error('%c'+error,'background:red; color:white;');
        throw new Error('Failed to fetch character.');
    }
};

export const fetchMarvelItems = async (
    id: number, 
    endpoint: string,
    serverTs: string,
    serverApiKey: string,
    serverHash: string
): Promise<MarvelApiDetails<MarvelItem>> => {
    
    try {
        const response = await axios.get(`${API_URL}/${id}/${endpoint}`, {
            params: {
                ts: serverTs,
                apikey: serverApiKey,
                hash: serverHash,
            },
            headers: {
                'Accept': 'application/json',
            },
        });

        return {
            total: response.data.data.total,
            results: response.data.data.results as MarvelItem[],
        };
    } catch (error) {
        console.error('%c'+error,'background:red; color:white;');
        throw new Error(`Failed to fetch ${endpoint}.`);
    }
};

export const fetchComicsByCharacterId = async (id: number, serverTs: string, serverApiKey: string, serverHash: string) => fetchMarvelItems(id, 'comics', serverTs, serverApiKey, serverHash);
export const fetchEventsByCharacterId = async (id: number, serverTs: string, serverApiKey: string, serverHash: string) => fetchMarvelItems(id, 'events', serverTs, serverApiKey, serverHash);
export const fetchSeriesByCharacterId = async (id: number, serverTs: string, serverApiKey: string, serverHash: string) => fetchMarvelItems(id, 'series', serverTs, serverApiKey, serverHash);