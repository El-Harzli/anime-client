import { Pagination } from '@mui/material';

function CustomPagination({ pagination, setSearchParams, page }) {
  const paginationStyle = {
    '& .MuiPaginationItem-root': {
      backgroundColor: 'rgba(255,255,255,0.05)', // bg-white/5
      color: '#b4b4b4  ',
      '&:hover': {
        color: 'var(--color-secondary)', // hover:text-secondary
        backgroundColor: 'rgba(255,255,255,0.08)', // hover bg-white/8
      },
    },
    '& .MuiPaginationItem-root.Mui-selected': {
      backgroundColor: 'var(--color-secondary)', // bg-secondary
      color: 'black', // text-black
      '&:hover': {
        backgroundColor: 'var(--color-secondary)',
      },
    },
  };

  const handlePageChange = (_, newPage) => {
    setSearchParams({ page: newPage });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="flex justify-center py-6">
      <Pagination
        count={pagination.totalPages}
        page={pagination.currentPage || page}
        showFirstButton
        showLastButton
        onChange={handlePageChange}
        sx={paginationStyle}
      />
    </div>
  );
}

export default CustomPagination;
