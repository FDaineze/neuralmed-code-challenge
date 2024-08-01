import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import CatalogList from '../components/CatalogList';
import { MarvelApiDetails, MarvelItem } from '../types/marvel';

const mockItems: MarvelApiDetails<MarvelItem> = {
  total: 1,
  results: [
    {
      id: 1,
      title: 'Mock Comic',
      description: 'A description of the mock comic',
      thumbnail: { path: 'path/to/image', extension: 'jpg' },
    }
  ],
};

describe('CatalogList Component', () => {
  it('renders title and items', () => {
    render(<CatalogList title="Comics" items={mockItems} emptyMessage="No items available." />);
    expect(screen.getByText('Comics')).toBeInTheDocument();
    expect(screen.getByText('Mock Comic')).toBeInTheDocument();
  });

  it('renders empty message if no items', () => {
    render(<CatalogList title="Comics" items={null} emptyMessage="No items available." />);
    expect(screen.getByText('No items available.')).toBeInTheDocument();
  });
});
