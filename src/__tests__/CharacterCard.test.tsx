import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import CharacterCard from '../components/CharacterCard';
import { Character } from '../types/marvel';
import { useRouter } from 'next/router';

vi.mock('next/router', () => ({
  useRouter: vi.fn(),
}));

const mockCharacter: Character = {
  id: 1,
  name: 'Spider-Man',
  thumbnail: { path: 'path/to/image', extension: 'jpg' },
  series: { items: [{ name: 'Series 1', resourceURI: "http://gateway.marvel.com/v1/public/series/12429" }] },
  events: { items: [{ name: 'Event 1', resourceURI: "http://gateway.marvel.com/v1/public/series/12429" }] },
};

describe('CharacterCard Component', () => {
  it('renders character details', () => {
    render(<CharacterCard character={mockCharacter} />);
    expect(screen.getByText('Spider-Man')).toBeInTheDocument();
  });

  it('navigates to character details on click', () => {
    const push = vi.fn();
    (useRouter as vi.Mock).mockReturnValue({ push });
    
    render(<CharacterCard character={mockCharacter} />);
    fireEvent.click(screen.getByText('Spider-Man'));
    expect(push).toHaveBeenCalledWith('/details/1');
  });
});
