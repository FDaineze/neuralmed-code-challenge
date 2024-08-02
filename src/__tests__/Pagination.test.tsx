import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, Mock } from 'vitest';
import Pagination from '../components/Pagination';

// Verificação de geração de paginação correta e resposta de navegação
describe('Pagination', () => {

    const setup = (currentPage: number, totalItems: number, itemsPerPage: number) => {
        const handlePageChange = vi.fn();
        render(
            <Pagination
                currentPage={currentPage}
                totalItems={totalItems}
                itemsPerPage={itemsPerPage}
                onPageChange={handlePageChange}
            />
        );
        return { handlePageChange };
    };

    it('should render correctly', () => {
        setup(1, 100, 10);
        expect(screen.getByText('1')).toBeInTheDocument();
        expect(screen.getByText('10')).toBeInTheDocument();
    });

    it('should call onPageChange when clicking on a page', () => {
        const { handlePageChange } = setup(1, 100, 10);
        fireEvent.click(screen.getByText('2'));
        expect(handlePageChange).toHaveBeenCalledWith(2);
    });
});