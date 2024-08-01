import { describe, it, expect, vi } from 'vitest';
import axios from 'axios';
import { fetchMarvelCharacters, fetchMarvelCharacterById, fetchMarvelItems, fetchComicsByCharacterId, fetchEventsByCharacterId, fetchSeriesByCharacterId } from '../api/marvel';
import mockData from '../api/mockCharacters.json';
import mockComics from '../api/mockComics.json';
import mockEvents from '../api/mockEvents.json';
import mockSeries from '../api/mockSeries.json';

// Mock axios
vi.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('Marvel API Functions', () => {
  it('fetchMarvelCharacters returns mocked data if RETURN_MOCK_INFO is true', async () => {
    process.env.NEXT_PUBLIC_RETURN_MOCK_INFO = 'true';
    mockedAxios.get.mockResolvedValue({ data: mockData });

    const result = await fetchMarvelCharacters('Spider', 1, 10);
    expect(result.data).toEqual(mockData.data.results);
    expect(result.totalCount).toBe(mockData.data.total);
  });

  it('fetchMarvelCharacterById returns mocked data if RETURN_MOCK_INFO is true', async () => {
    process.env.NEXT_PUBLIC_RETURN_MOCK_INFO = 'true';
    mockedAxios.get.mockResolvedValue({ data: mockData });

    const result = await fetchMarvelCharacterById(1);
    expect(result).toEqual(mockData.data.results.find(character => character.id === 1));
  });

  it('fetchMarvelItems returns mocked data if RETURN_MOCK_INFO is true for comics', async () => {
    process.env.NEXT_PUBLIC_RETURN_MOCK_INFO = 'true';
    mockedAxios.get.mockResolvedValue({ data: mockComics });

    const result = await fetchMarvelItems(1, 'comics');
    expect(result.results).toEqual(mockComics.data.results);
    expect(result.total).toBe(mockComics.data.total);
  });

  // Similar tests for events and series...

  it('fetchMarvelCharacters handles API errors', async () => {
    process.env.NEXT_PUBLIC_RETURN_MOCK_INFO = 'false';
    mockedAxios.get.mockRejectedValue(new Error('API Error'));

    await expect(fetchMarvelCharacters('Spider', 1, 10)).rejects.toThrow('Failed to fetch characters.');
  });

  // Similar tests for fetchMarvelCharacterById, fetchMarvelItems...
});
