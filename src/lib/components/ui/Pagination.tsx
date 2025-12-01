import React, { useMemo } from 'react';
import { Icon } from './Icon';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  itemsPerPage: number;
  totalItems: number;
  onPageChange: (page: number, startIndex: number) => void;
}

export const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  itemsPerPage,
  totalItems,
  onPageChange,
}) => {
  const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalItems);
  const showPagination = totalPages > 1;

  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages && page !== currentPage) {
      onPageChange(page, (page - 1) * itemsPerPage);
    }
  };

  const nextPage = () => {
    if (currentPage < totalPages) {
      goToPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      goToPage(currentPage - 1);
    }
  };

  const getPageNumbers = (): (number | string)[] => {
    const pages: (number | string)[] = [];
    const maxVisible = 5;

    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 4; i++) {
          pages.push(i);
        }
        pages.push('...');
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1);
        pages.push('...');
        for (let i = totalPages - 3; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        pages.push(1);
        pages.push('...');
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          pages.push(i);
        }
        pages.push('...');
        pages.push(totalPages);
      }
    }

    return pages;
  };

  const pageNumbers = useMemo(() => getPageNumbers(), [currentPage, totalPages]);

  if (!showPagination) return null;

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-6 sm:mt-8 pt-6 border-t border-gray-200">
      {/* Información de items */}
      <div className="text-sm text-gray-600">
        Mostrando <span className="font-medium text-gray-900">{startItem}</span> -{' '}
        <span className="font-medium text-gray-900">{endItem}</span> de{' '}
        <span className="font-medium text-gray-900">{totalItems}</span>
      </div>

      {/* Controles de paginación */}
      <div className="flex items-center gap-2">
        {/* Botón anterior */}
        <button
          onClick={prevPage}
          disabled={currentPage === 1}
          className="px-3 py-2 rounded-lg border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200 flex items-center gap-1"
          aria-label="Página anterior"
        >
          <span className="rotate-180 inline-block">
            <Icon name="ChevronRight" size={16} color="currentColor" />
          </span>
          <span className="hidden sm:inline">Anterior</span>
        </button>

        {/* Números de página */}
        <div className="flex items-center gap-1">
          {pageNumbers.map((page, index) => {
            if (typeof page === 'number') {
              return (
                <button
                  key={index}
                  onClick={() => goToPage(page)}
                  className={`min-w-[40px] px-3 py-2 rounded-lg border transition-all duration-200 ${
                    currentPage === page
                      ? 'border-primary-500 bg-primary-50 text-primary-700 font-semibold'
                      : 'border-gray-300 bg-white text-gray-700 hover:bg-gray-50'
                  }`}
                  aria-label={`Ir a página ${page}`}
                  aria-current={currentPage === page ? 'page' : undefined}
                >
                  {page}
                </button>
              );
            } else {
              return (
                <span key={index} className="px-2 text-gray-400">
                  ...
                </span>
              );
            }
          })}
        </div>

        {/* Botón siguiente */}
        <button
          onClick={nextPage}
          disabled={currentPage === totalPages}
          className="px-3 py-2 rounded-lg border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200 flex items-center gap-1"
          aria-label="Página siguiente"
        >
          <span className="hidden sm:inline">Siguiente</span>
          <Icon name="ChevronRight" size={16} color="currentColor" />
        </button>
      </div>
    </div>
  );
};

