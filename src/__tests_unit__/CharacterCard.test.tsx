import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { useRouter } from 'next/router';
import CharacterCard from '../components/CharacterCard';
import { describe, it, expect, vi } from 'vitest';

vi.mock('next/router', () => ({
  useRouter: vi.fn(),
}));

describe('CharacterCard Component', () => {
  // Mock
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

  // Verificação de geração de imagem e titulo com base no character
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
    (useRouter as any).mockReturnValue({ push });

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
