import { useState, useEffect } from 'react';
import { GetServerSideProps } from 'next';
import CharacterCard from '../components/CharacterCard';
import SearchInput from '../components/SearchInput';
import Pagination from '../components/Pagination';
import LoadingScreen from '../components/LoadingScreen';
import { fetchMarvelCharacters } from '../api/marvel';
import { Character } from '../types/marvel';

interface Props {
    initialCharacters: Character[];
    totalCount: number;
}

const ITEMS_PER_PAGE: number = 10;

const Home: React.FC<Props> = ({ initialCharacters, totalCount }) => {
    const [characters, setCharacters] = useState<Character[]>(initialCharacters);
    const [search, setSearch] = useState<string>('');
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            const { data } = await fetchMarvelCharacters(search, currentPage, ITEMS_PER_PAGE);
            setCharacters(data);
            setLoading(false);
        };

        fetchData();
    }, [search, currentPage]);

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
    const { data, totalCount } = await fetchMarvelCharacters('', 1, ITEMS_PER_PAGE);
    return {
        props: {
            initialCharacters: data,
            totalCount,
        },
    };
};

export default Home;