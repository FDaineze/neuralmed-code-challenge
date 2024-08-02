import { describe, it, expect, vi, Mock } from 'vitest';
import axios from 'axios';
import { fetchMarvelCharacters, fetchMarvelCharacterById, fetchMarvelItems } from '../api/marvel';

vi.mock('axios');

interface MockedAxios {
  get: Mock;
}

const mockedAxios = axios as unknown as MockedAxios;

const ts = Date.now().toString();
const serverApiKey = 'fakeApiKey';
const serverHash = 'fakeHash';

// Verificação de chamadas da API
describe('Marvel API', () => {
  it('fetchMarvelCharacters should return characters data', async () => {
    const mockedResponse = { data: { data: { results: [], total: 0 } } };
    mockedAxios.get.mockResolvedValue(mockedResponse);

    const response = await fetchMarvelCharacters('spider', 1, 10, ts, serverApiKey, serverHash);
    expect(response.data).toEqual([]);
    expect(response.totalCount).toBe(0);
  });

  it('fetchMarvelCharacterById should return a character', async () => {
    const mockedResponse = { data: { data: { results: [{ id: 1 }] } } };
    mockedAxios.get.mockResolvedValue(mockedResponse);

    const response = await fetchMarvelCharacterById(1, ts, serverApiKey, serverHash);
    expect(response.id).toBe(1);
  });

  it('fetchMarvelItems should return items data', async () => {
    const mockedResponse = { data: { data: { results: [], total: 0 } } };
    mockedAxios.get.mockResolvedValue(mockedResponse);

    const response = await fetchMarvelItems(1, 'comics', ts, serverApiKey, serverHash);
    expect(response.results).toEqual([]);
    expect(response.total).toBe(0);
  });

  it('should handle API errors', async () => {
    mockedAxios.get.mockRejectedValue(new Error('Failed to fetch'));

    await expect(fetchMarvelCharacters('spider', 1, 10, ts, serverApiKey, serverHash)).rejects.toThrow('Failed to fetch characters.');
    await expect(fetchMarvelCharacterById(1, ts, serverApiKey, serverHash)).rejects.toThrow('Failed to fetch character.');
    await expect(fetchMarvelItems(1, 'comics', ts, serverApiKey, serverHash)).rejects.toThrow('Failed to fetch comics.');
    await expect(fetchMarvelItems(1, 'series', ts, serverApiKey, serverHash)).rejects.toThrow('Failed to fetch series.');
    await expect(fetchMarvelItems(1, 'events', ts, serverApiKey, serverHash)).rejects.toThrow('Failed to fetch events.');
  });
});
