import axios from 'axios';
import { Character, MarvelApiResponse, MarvelApiDetails, MarvelItem } from '../types/marvel';
import { MarvelApiParams } from '../types/api';
import { generateHash } from '../utils/hash';

const API_URL = 'https://gateway.marvel.com/v1/public/characters';
const API_KEY = process.env.NEXT_PUBLIC_API_KEY;
const PRIVATE_KEY = process.env.NEXT_PUBLIC_PRIVATE_KEY;

if (!API_KEY || !PRIVATE_KEY) {
    throw new Error("API_KEY and PRIVATE_KEY must be defined in .env file");
}

export const fetchMarvelCharacters = async (name: string, page: number, itemsPerPage: number): Promise<{
    data: Character[];
    totalCount: number;
}> => {
    const ts = Date.now().toString();
    const hash = generateHash(ts, PRIVATE_KEY, API_KEY);

    const offset = (page - 1) * itemsPerPage;

    const params: MarvelApiParams = {
        apikey: API_KEY,
        ts,
        hash,
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
        throw new Error('Failed to fetch characters.');
    }
};

export const fetchMarvelCharacterById = async (id: number): Promise<Character> => {
    const ts = Date.now().toString();
    const hash = generateHash(ts, PRIVATE_KEY, API_KEY);

    try {
        const response = await axios.get(`${API_URL}/${id}`, {
            params: {
                apikey: API_KEY,
                ts,
                hash,
            },
            headers: {
                'Accept': 'application/json',
            },
        });

        return response.data.data.results[0];
    } catch (error) {
        throw new Error('Failed to fetch character.');
    }
};

export const fetchMarvelItems = async (id: number, endpoint: string): Promise<MarvelApiDetails<MarvelItem>> => {
    const ts = Date.now().toString();
    const hash = generateHash(ts, PRIVATE_KEY, API_KEY);

    try {
        const response = await axios.get(`${API_URL}/${id}/${endpoint}`, {
            params: {
                apikey: API_KEY,
                ts,
                hash,
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
        throw new Error(`Failed to fetch ${endpoint}.`);
    }
};

export const fetchComicsByCharacterId = async (id: number) => fetchMarvelItems(id, 'comics');
export const fetchEventsByCharacterId = async (id: number) => fetchMarvelItems(id, 'events');
export const fetchSeriesByCharacterId = async (id: number) => fetchMarvelItems(id, 'series');