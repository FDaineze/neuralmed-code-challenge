import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { useRouter, NextRouter } from 'next/router'; // Importa NextRouter
import CharacterCard from '../components/CharacterCard';
import { describe, it, expect, vi } from 'vitest';

// Moca o useRouter e define o tipo NextRouter
vi.mock('next/router', () => ({
  useRouter: vi.fn(),
}));

describe('CharacterCard Component', () => {
  // Mock de dados de personagem
  const character = {
    id: 1,
    name: 'Spider-Man',
    description: 'A superhero in New York',
    modified: '2021-01-01T00:00:00-0500',
    thumbnail: { path: 'path/to/image', extension: 'jpg' },
    resourceURI: 'http://gateway.marvel.com/v1/public/characters/1009610',
    comics: {
      available: 0,
      collectionURI: 'http://gateway.marvel.com/v1/public/characters/1009610/comics',
      items: [],
      returned: 0
    },
    series: {
      available: 0,
      collectionURI: 'http://gateway.marvel.com/v1/public/characters/1009610/series',
      items: [],
      returned: 0
    },
    stories: {
      available: 0,
      collectionURI: 'http://gateway.marvel.com/v1/public/characters/1009610/stories',
      items: [],
      returned: 0
    },
    events: {
      available: 0,
      collectionURI: 'http://gateway.marvel.com/v1/public/characters/1009610/events',
      items: [],
      returned: 0
    },
    urls: [
      { type: 'detail', url: 'http://example.com' }
    ]
  };

  // Verificação de renderização do personagem
  it('renders character data', () => {
    render(
      <table>
        <tbody>
          <CharacterCard character={character} />
        </tbody>
      </table>
    );

    expect(screen.getByText('Spider-Man')).toBeInTheDocument();
    expect(screen.getByAltText('Spider-Man')).toBeInTheDocument();
  });

  // Verificação de navegação por clique
  it('navigates to character details on click', () => {
    const push = vi.fn();
    const mockUseRouter = vi.mocked(useRouter); // Tipagem correta do mock
    mockUseRouter.mockReturnValue({ push } as unknown as NextRouter); // Mock do retorno do useRouter

    render(
      <table>
        <tbody>
          <CharacterCard character={character} />
        </tbody>
      </table>
    );
    
    const row = screen.getByRole('row');
    fireEvent.click(row);
    expect(push).toHaveBeenCalledWith('/details/1');
  });

});
