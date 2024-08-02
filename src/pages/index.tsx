import { useState, useEffect } from 'react';
import { GetServerSideProps } from 'next';
import CharacterCard from '../components/CharacterCard';
import SearchInput from '../components/SearchInput';
import Pagination from '../components/Pagination';
import LoadingScreen from '../components/LoadingScreen';
import { fetchMarvelCharacters } from '../api/marvel';
import { Character } from '../types/marvel';
import { generateHash } from '../utils/hash';

interface Props {
    initialCharacters: Character[];
    totalCount: number;
    serverTs: string;
    serverApiKey: string;
    serverHash: string;
}

const ITEMS_PER_PAGE: number = 10;

const Home: React.FC<Props> = ({ initialCharacters, totalCount, serverTs, serverApiKey, serverHash }) => {
    const [characters, setCharacters] = useState<Character[]>(initialCharacters);
    const [search, setSearch] = useState<string>('');
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [loading, setLoading] = useState<boolean>(false);
    
    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            const { data } = await fetchMarvelCharacters(search, currentPage, ITEMS_PER_PAGE, serverTs, serverApiKey, serverHash);
            setCharacters(data);
            setLoading(false);
        };

        fetchData();
    }, [search, currentPage, serverTs, serverApiKey, serverHash]);

    const handleSearch = (query: string) => {
        setSearch(query);
        setCurrentPage(1);
    };

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    return (
        <div className="flex flex-col min-h-screen relative">
            <main className="flex-1">
                {loading && <LoadingScreen />}
                <SearchInput onSearch={handleSearch} />
                <div className="px-8">
                    {characters.length > 0 ? (
                        <table className='border-separate border-spacing-y-4 w-full'>
                            <thead>
                                <tr className="text-lg">
                                    <th className="p-2 pl-5 text-left text-slate-400">Personagem</th>
                                    <th className="p-1 text-left text-slate-400 max-sm:hidden">Séries</th>
                                    <th className="p-1 text-left text-slate-400 max-sm:hidden">Eventos</th>
                                </tr>
                            </thead>
                            <tbody>
                                {characters.map(character => (
                                    <CharacterCard key={character.id} character={character} />
                                ))}
                            </tbody>
                        </table>
                    ) : (
                        <p>No characters found.</p>
                    )}
                </div>
            </main>
            <footer>
                <Pagination
                    currentPage={currentPage}
                    totalItems={totalCount}
                    itemsPerPage={ITEMS_PER_PAGE}
                    onPageChange={handlePageChange}
                />
            </footer>
        </div>
    );
};

export const getServerSideProps: GetServerSideProps = async () => {
    const serverTs = Date.now().toString();
    const API_KEY = process.env.API_KEY!;
    const PRIVATE_KEY = process.env.PRIVATE_KEY!;
        
    if (!API_KEY || !PRIVATE_KEY) {
        throw new Error('API_KEY and PRIVATE_KEY must be defined in .env file');
    }

    const serverHash = generateHash(serverTs, PRIVATE_KEY, API_KEY);

    const { data, totalCount } = await fetchMarvelCharacters('', 1, ITEMS_PER_PAGE, serverTs, API_KEY, serverHash);

    return {
        props: {
            initialCharacters: data,
            totalCount,
            serverTs,
            serverApiKey: API_KEY,
            serverHash
        },
    };
};

export default Home;