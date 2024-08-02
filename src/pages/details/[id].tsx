import { useState, useEffect } from 'react';
// import Image from 'next/image';
import { GetServerSideProps } from 'next';
import {
    fetchMarvelCharacterById,
    fetchComicsByCharacterId,
    fetchEventsByCharacterId,
    fetchSeriesByCharacterId
} from '../../api/marvel';
import { Character, MarvelItem, MarvelApiDetails } from '../../types/marvel';
import CatalogList from '../../components/CatalogList';
import LoadingScreen from '../../components/LoadingScreen';
import { generateHash } from '../../utils/hash';

type CharacterDetailsProps = {
    initialCharacter: Character;
    initialComics: MarvelApiDetails<MarvelItem>;
    initialEvents: MarvelApiDetails<MarvelItem>;
    initialSeries: MarvelApiDetails<MarvelItem>;
    // Dados de requisição (gerados no servidor para proteger a PRIVATE_KEY)
    serverTs: string;
    serverApiKey: string;
    serverHash: string;
};

export const getServerSideProps: GetServerSideProps = async (context) => {
    const serverTs = Date.now().toString();
    const API_KEY = process.env.API_KEY!;
    const PRIVATE_KEY = process.env.PRIVATE_KEY!;

    if (!API_KEY || !PRIVATE_KEY) {
        throw new Error('API_KEY and PRIVATE_KEY must be defined in .env file');
    }

    const serverHash = generateHash(serverTs, PRIVATE_KEY, API_KEY);

    const { id } = context.params!;
    if (!id || isNaN(Number(id))) {
        return {
            notFound: true,
        };
    }

    try {
        const character = await fetchMarvelCharacterById(Number(id), serverTs, API_KEY, serverHash);
        const comics = await fetchComicsByCharacterId(Number(id), serverTs, API_KEY, serverHash);
        const events = await fetchEventsByCharacterId(Number(id), serverTs, API_KEY, serverHash);
        const series = await fetchSeriesByCharacterId(Number(id), serverTs, API_KEY, serverHash);

        if (!character) {
            return {
                notFound: true,
            };
        }

        return {
            props: {
                initialCharacter: character || null,
                initialComics: comics || null,
                initialEvents: events || null,
                initialSeries: series || null,
                serverTs: serverTs,
                serverApiKey: API_KEY,
                serverHash: serverHash
            },
        };
    } catch (error) {
        return {
            notFound: true,
        };
    }
};

const CharacterDetailsPage: React.FC<CharacterDetailsProps> = ({
    initialCharacter,
    initialComics,
    initialEvents,
    initialSeries,
    serverTs,
    serverApiKey,
    serverHash
}) => {
    const [loading, setLoading] = useState<boolean>(false);
    const [character, setCharacter] = useState<Character>(initialCharacter);
    const [comics, setComics] = useState<MarvelApiDetails<MarvelItem>>(initialComics);
    const [events, setEvents] = useState<MarvelApiDetails<MarvelItem>>(initialEvents);
    const [series, setSeries] = useState<MarvelApiDetails<MarvelItem>>(initialSeries);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);

            try {
                const character = await fetchMarvelCharacterById(Number(initialCharacter.id), serverTs, serverApiKey, serverHash);
                const comics = await fetchComicsByCharacterId(Number(initialCharacter.id), serverTs, serverApiKey, serverHash);
                const events = await fetchEventsByCharacterId(Number(initialCharacter.id), serverTs, serverApiKey, serverHash);
                const series = await fetchSeriesByCharacterId(Number(initialCharacter.id), serverTs, serverApiKey, serverHash);

                setCharacter(character);
                setComics(comics);
                setEvents(events);
                setSeries(series);
            } catch (error) {
                console.error('Failed to fetch character details:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [initialCharacter.id, serverTs, serverApiKey, serverHash]);

    return (
        <div className="mb-8">
            {loading && <LoadingScreen />}
            <div className="bg-slate-900 flex flex-col items-center md:flex-row md:space-x-4">
                <img
                    src={`${character.thumbnail.path}.${character.thumbnail.extension}`}
                    alt={character.name}
                    className="w-full md:w-96 md:h-96 object-cover mb-4 md:mb-0"
                />
                <div className="flex flex-col px-10">
                    <h1 className="text-3xl font-bold mb-2">{character.name}</h1>
                    <p className="text-base mb-4 md:mb-0">{character.description || 'No description available'}</p>
                </div>
            </div>

            <CatalogList
                title="Histórias em Quadrinhos"
                items={comics}
                emptyMessage="No comics available for this character."
            />

            <CatalogList
                title="Eventos"
                items={events}
                emptyMessage="No events available for this character."
            />

            <CatalogList
                title="Séries"
                items={series}
                emptyMessage="No series available for this character."
            />
        </div>
    );
};

export default CharacterDetailsPage;
