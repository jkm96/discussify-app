import {SiteContentQueryParameters} from '@/boundary/parameters/contentQueryParameters';
import {fetchSiteContentAsync} from '@/lib/services/sitecontent/siteContentService';
import {toast} from 'react-toastify';
import React, {useEffect, useState} from 'react';
import {SiteContentResponse} from '@/boundary/interfaces/siteContent';
import {
    Button,
    CircularProgress,
    Table,
    TableBody,
    TableCell,
    TableColumn,
    TableHeader,
    TableRow,
} from '@nextui-org/react';
import {formatDateWithTime} from '@/helpers/dateHelpers';
import Link from 'next/link';
import {NAVIGATION_LINKS} from '@/boundary/configs/navigationConfig';
import Breadcrumb from '@/components/shared/breadcrumbs/Breadcrumb';
import {SearchIcon} from '@/components/shared/icons/SearchIcon';
import {PlusIcon} from '@/components/shared/icons/PlusIcon';
import CreateSiteContentModal from '@/components/admin/managesitecontent/modals/CreateSiteContentModal';

export function SiteContentOverview() {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [siteContent,setSiteContent] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [wasModalOpened, setWasModalOpened] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
    setWasModalOpened(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    if (wasModalOpened) {
      fetchContent();
      setWasModalOpened(false);
    }
  };

  const fetchContent = async () => {
    const param = new SiteContentQueryParameters();
    param.type = 'all';
    setIsLoading(true)
    await fetchSiteContentAsync(param)
      .then((response) => {
        if (response.statusCode === 200) {
          const content = response.data;
          setSiteContent(content)
        }else{
          toast.error(response.message)
        }
      })
      .catch((error) => {
        toast.error(`Error fetching site content: ${error}`);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    fetchContent();
  }, []);

  return (
    <>
      <Breadcrumb pageName='Site Content' />

      <div className='flex flex-col gap-4 m-2'>
        <div className='flex justify-between gap-3 items-end'>
          <div className='w-full sm:max-w-[44%]'>
            <div className='relative flex flex-1 flex-shrink-0'>
              <label htmlFor='search' className='sr-only'>
                Search
              </label>
              <input
                className='peer block w-full rounded-md border border-gray-200
                                py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500'
                placeholder='Search for journal entries'
                // onChange={handleSearch}
                // defaultValue={searchTerm}
              />
              <SearchIcon
                className='absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900' />
            </div>
          </div>
          <div className='gap-3 hidden lg:block'>
            <Button onPress={handleOpenModal}
                    startContent={<PlusIcon />}
                    color='primary'
                    variant='shadow'>
              Add Content
            </Button>
            <CreateSiteContentModal isOpen={isModalOpen} onClose={handleCloseModal} />
          </div>
        </div>
      </div>

      {isLoading ? (
        <div className={'grid place-items-center'}>
          <CircularProgress color={'primary'} className={'p-4'}
                            label='Loading site content ...' />
        </div>
      ) : (
        <>
          <Table aria-label="site-content">
            <TableHeader>
              <TableColumn>Title</TableColumn>
              <TableColumn>Type</TableColumn>
              <TableColumn className='hidden md:table-cell lg:table-cell'>Created On</TableColumn>
              <TableColumn>Action</TableColumn>
            </TableHeader>
            <TableBody
              emptyContent={!isLoading && siteContent.length === 0 ? 'No data to display.' : null}
            >
              {siteContent.map((content:SiteContentResponse) => (
                <TableRow key={content.id}>
                  <TableCell>
                    <Link href={`${NAVIGATION_LINKS.ADMIN_MANAGE_SITE_CONTENT}/${content.id}`}>{content.title}</Link>
                  </TableCell>
                  <TableCell>{content.type}</TableCell>
                  <TableCell className='hidden md:table-cell lg:table-cell'>{formatDateWithTime(content.createdAt)}</TableCell>
                  <TableCell>
                    <Link href={NAVIGATION_LINKS.ADMIN_MANAGE_SITE_CONTENT}>View</Link>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </>
      )}
    </>
  )
}