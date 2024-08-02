import React from 'react';
import { render, screen } from '@testing-library/react';
import CatalogList from '../components/CatalogList';
import { describe, it, expect } from 'vitest';

// Verificação de geração de Titulo, descrição e faz o teste de renderização de lista
describe('CatalogList Component', () => {
    it('renders the title', () => {
        render(<CatalogList title="Test Title" items={null} emptyMessage="No items" />);
        expect(screen.getByText('Test Title')).toBeInTheDocument();
    });

    it('renders empty message when no items', () => {
        render(<CatalogList title="Test Title" items={null} emptyMessage="No items" />);
        expect(screen.getByText('No items')).toBeInTheDocument();
    });

    it('renders list of items', () => {
        const items = {
            total: 2,
            results: [
                { id: 1, title: 'Item 1', thumbnail: { path: 'path', extension: 'jpg' }, description: 'Description 1' },
                { id: 2, title: 'Item 2', thumbnail: { path: 'path', extension: 'jpg' }, description: 'Description 2' },
            ],
        };
        render(<CatalogList title="Test Title" items={items} emptyMessage="No items" />);
        expect(screen.getByText('Item 1')).toBeInTheDocument();
        expect(screen.getByText('Item 2')).toBeInTheDocument();
    });
});
