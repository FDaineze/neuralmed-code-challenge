import React from 'react';

interface Props {
    currentPage: number;
    totalItems: number;
    itemsPerPage: number;
    onPageChange: (page: number) => void;
}

const Pagination: React.FC<Props> = ({ currentPage, totalItems, itemsPerPage, onPageChange }) => {
    const totalPages = Math.ceil(totalItems / itemsPerPage);

    const getPageNumbers = () => {
        const pages = [];
        const maxVisiblePages = 5;

        const numPagesBefore = Math.min(currentPage - 1, maxVisiblePages - 1);
        const numPagesAfter = Math.min(totalPages - currentPage, maxVisiblePages - 1);

        let startPage = Math.max(1, currentPage - numPagesBefore);
        let endPage = Math.min(totalPages, currentPage + numPagesAfter);

        const beforeDistance = Math.min(currentPage - startPage, 2);
        const afterDistance = Math.max(0, endPage - currentPage - beforeDistance);

        startPage = Math.max(1, currentPage - beforeDistance);
        endPage = (numPagesAfter < 4) ? currentPage + numPagesAfter : currentPage + afterDistance;

        if (startPage > 1) {
            pages.push(1);
            if (startPage > 2) pages.push('...');
        }

        for (let i = startPage; i <= endPage; i++) {
            pages.push(i);
        }

        if (endPage < totalPages) {
            if (endPage < totalPages - 1) pages.push('...');
            pages.push(totalPages);
        }

        return pages;
    };

    const handlePageChange = (page: number) => {
        if (page > 0 && page <= totalPages) {
            onPageChange(page);
            window.scrollTo({ top: 0, behavior: 'instant' });
        }
    };

    return (
        <div className="p-4 px-8 text-center border-t border-slate-700">

            {getPageNumbers().map((page, index) => (
                <button
                    key={index}
                    onClick={() => typeof page === 'number' && handlePageChange(page)}
                    className={`
                        px-4 py-2 mx-1 border-0 rounded-md 
                        ${typeof page === 'number' && page === currentPage ? 'bg-slate-700 text-white' : ''}
                        ${typeof page === 'string' ? '' : 'hover:bg-slate-700'}
                        `}
                    disabled={typeof page === 'string'}
                >
                    {page}
                </button>
            ))}
        </div>
    );
};

export default Pagination;
