import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import Pagination from '../components/Pagination';

const onPageChange = vi.fn();

describe('Pagination Component', () => {
  it('renders pagination correctly', () => {
    render(<Pagination currentPage={1} totalItems={100} itemsPerPage={10} onPageChange={onPageChange} />);
    expect(screen.getByText('...')).toBeInTheDocument();
    expect(screen.getByText('1')).toBeInTheDocument();
  });

  it('calls onPageChange when a page number is clicked', () => {
    render(<Pagination currentPage={1} totalItems={100} itemsPerPage={10} onPageChange={onPageChange} />);
    fireEvent.click(screen.getByText('2'));
    expect(onPageChange).toHaveBeenCalledWith(2);
  });
});
