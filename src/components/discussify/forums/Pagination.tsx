import React from 'react';
import {Chip} from "@nextui-org/react";

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

const Pagination = ({ currentPage, totalPages, onPageChange }:PaginationProps) => {
    const handlePrevious = () => {
        if (currentPage > 1) {
            onPageChange(currentPage - 1);
        }
    };

    const handleNext = () => {
        if (currentPage < totalPages) {
            onPageChange(currentPage + 1);
        }
    };

    const handleFirst = () => {
        if (currentPage > 1) {
            onPageChange(1);
        }
    };

    const handleLast = () => {
        if (currentPage < totalPages) {
            onPageChange(totalPages);
        }
    };

    return (
        <>
            {totalPages > 10 && (
                <div className="flex items-center justify-center">
                    <button
                        onClick={handlePrevious}
                        disabled={currentPage === 1}
                        className="px-1 mx-1 text-sm font-medium dark:text-white bg-gray-500 rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-600"
                    >
                        Previous
                    </button>

                    <button
                        onClick={handleFirst}
                        disabled={currentPage === 1}
                        className="px-1 text-sm font-medium dark:text-white bg-gray-500 rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-600"
                    >
                        1
                    </button>

                    <Chip color="primary">
                        {`${currentPage} of ${totalPages}`}
                    </Chip>

                    <button
                        onClick={handleLast}
                        disabled={currentPage === totalPages}
                        className="px-1 text-sm font-medium dark:text-white bg-gray-500 rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-600"
                    >
                        {totalPages}
                    </button>

                    <button
                        onClick={handleNext}
                        disabled={currentPage === totalPages}
                        className="px-1 mx-1 text-sm font-medium dark:text-white bg-gray-500 rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-600"
                    >
                        Next
                    </button>
                </div>
            )}
        </>
    );
};

export default Pagination;
