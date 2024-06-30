import React, {useEffect, useState} from 'react';
import {
    ChipProps,
    Selection,
    SortDescriptor,
    Spinner,
    Table,
    TableBody,
    TableCell,
    TableColumn,
    TableHeader,
    TableRow,
} from '@nextui-org/react';
import {toast} from 'react-toastify';
import {getUsers} from '@/lib/services/admin/manageUserService';
import {userTableColumns} from '@/lib/utils/tableUtils';
import {UserQueryParameters} from '@/boundary/parameters/userQueryParameters';
import {UserResponse} from '@/boundary/interfaces/user';
import RenderUserCell from '@/components/admin/manageusers/RenderUserCell';
import {SearchIcon} from '@/components/shared/icons/SearchIcon';
import {usePathname, useRouter, useSearchParams} from 'next/navigation';
import {TableVisibleColumns} from "@/components/admin/shared/filter/TableVisibleColumns";
import PaginationComponent from "@/components/admin/shared/pagination/PaginationComponent";

const INITIAL_VISIBLE_COLUMNS = ['username', 'email', 'isActive', 'isSubscribed', 'actions'];

export default function UsersOverviewSection() {
  const [queryParams, setQueryParams] = useState<UserQueryParameters>(new UserQueryParameters());
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [totalPages, setTotalPages] = useState(0);
  const [userList, setUserList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [visibleColumns, setVisibleColumns] = useState<Selection>(new Set(INITIAL_VISIBLE_COLUMNS));
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const [sortDescriptor, setSortDescriptor] = useState<SortDescriptor>({
    column: 'name',
    direction: 'ascending',
  });
  const statusColorMap: Record<string, ChipProps['color']> = {
    active: 'success',
    inactive: 'danger',
    yes: 'success',
    no: 'danger',
    verified: 'success',
    unverified: 'danger',
  };
  const headerColumns = React.useMemo(() => {
    if (visibleColumns === 'all') return userTableColumns;
    return userTableColumns.filter((column) => Array.from(visibleColumns).includes(column.uid));
  }, [visibleColumns]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  /**
   * fetch user data from api
   * @param queryParams
   */
  const fetchUsers = async (queryParams: UserQueryParameters) => {
    setIsLoading(true);
    await getUsers(queryParams)
      .then((response) => {
        if (response.statusCode === 200) {
          const parsedData = response.data;
          const { data, pagingMetaData } = parsedData;
          setCurrentPage(pagingMetaData.currentPage);
          setRowsPerPage(pagingMetaData.pageSize);
          setTotalPages(pagingMetaData.totalPages);
          setUserList(data);
        } else {
          toast.error(`Error fetching users: ${response.message}`);
        }
      })
      .catch((error) => {
        toast.error(`Error fetching users: ${error}`);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    const { search } = window.location;
    const searchParams = new URLSearchParams(search);
    const searchTerm = searchParams.get('searchTerm') ?? '';
    queryParams.pageNumber = currentPage;
    queryParams.searchTerm = searchTerm;
    setSearchTerm(searchTerm);
    fetchUsers(queryParams);
  }, [currentPage]);

  useEffect(() => {
    if (!isInitialLoad) {
      fetchUsers(queryParams);
    } else {
      setIsInitialLoad(false);
    }
  }, [currentPage, queryParams]); // Fetch data only when queryParams change

  const handleSearchUsers = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    const newSearchTerm = event.target.value;
    const params = new URLSearchParams(searchParams);

    if (newSearchTerm) {
      params.set('searchTerm', newSearchTerm);
    } else {
      params.delete('searchTerm');
    }

    replace(`${pathname}?${params.toString()}`);

    if (newSearchTerm.length >= 3 || newSearchTerm === '') {
      setQueryParams((prevParams) => ({ ...prevParams, searchTerm: newSearchTerm }));
    }
  };

  /***
   *sorting data
   **/
  const sortedItems = React.useMemo(() => {
    return [...userList].sort((a: UserResponse, b: UserResponse) => {
      // @ts-ignore
      const first = a[sortDescriptor.column] as number;
      // @ts-ignore
      const second = b[sortDescriptor.column] as number;
      const cmp = first < second ? -1 : first > second ? 1 : 0;

      return sortDescriptor.direction === 'descending' ? -cmp : cmp;
    });
  }, [sortDescriptor, userList]);

  /**
   * user table visible columns e.g. filter
   */
  const getUserVisibleColumns = React.useMemo(() => {
    return <TableVisibleColumns
      visibleColumns={visibleColumns}
      setVisibleColumns={setVisibleColumns}
      tableColumns={userTableColumns}
    />;
  }, [visibleColumns]);

  /**
   * user table pagination
   */
  function getBottomContent() {
    return PaginationComponent(totalPages, currentPage, setCurrentPage);
  }

  /**
   * custom cell rendering
   */
  const renderCell = React.useCallback((user: UserResponse, columnKey: React.Key) => {
    return RenderUserCell(user, columnKey, statusColorMap);
  }, []);

  return (
    <>
      <div className='flex flex-col gap-4 mb-2'>
        <div className='flex justify-between gap-3 items-end'>
          <div className='w-full sm:max-w-[44%]'>
            <div className='relative flex flex-1 flex-shrink-0'>
              <label htmlFor='search' className='sr-only'>
                Search
              </label>
              <input
                className='peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500'
                placeholder='Search for users'
                onChange={handleSearchUsers}
                defaultValue={searchTerm}
              />
              <SearchIcon
                className='absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900' />
            </div>
          </div>
          <div className='flex gap-3'>
            {getUserVisibleColumns}
          </div>
        </div>
      </div>
      <Table
        aria-label='Pagination'
        sortDescriptor={sortDescriptor}
        onSortChange={setSortDescriptor}
        topContentPlacement='outside'
        bottomContent={getBottomContent()}>
        <TableHeader columns={headerColumns}>
          {(column) => (
            <TableColumn
              key={column.uid}
              align={column.uid === 'actions' ? 'center' : 'start'}
              allowsSorting={column.sortable}>
              {column.name}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody
          emptyContent={!isLoading && userList.length === 0 ? 'No data to display.' : null}
          items={sortedItems}
          loadingContent={<Spinner />}
          loadingState={isLoading ? 'loading' : 'idle'}>
          {(user: UserResponse) => (
            <TableRow key={user.id}>
              {(columnKey) =>
                <TableCell>
                  {renderCell(user, columnKey)}
                </TableCell>
              }
            </TableRow>
          )}
        </TableBody>
      </Table>
    </>
  );
}
