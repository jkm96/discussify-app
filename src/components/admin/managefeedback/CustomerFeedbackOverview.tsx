import {toast} from 'react-toastify';
import React, {useEffect, useState} from 'react';
import {CircularProgress, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow} from '@nextui-org/react';
import {formatDateWithTime} from '@/helpers/dateHelpers';
import Link from 'next/link';
import {NAVIGATION_LINKS} from '@/boundary/configs/navigationConfig';
import Breadcrumb from '@/components/shared/breadcrumbs/Breadcrumb';
import {fetchCustomerFeedbackAsync} from '@/lib/services/admin/manageFeedbackService';
import {UserFeedbackResponse} from '@/boundary/interfaces/feedback';

export function CustomerFeedbackOverview() {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [siteContent,setSiteContent] = useState([]);

  const fetchCustomerFeedback = async () => {
    setIsLoading(true)
    await fetchCustomerFeedbackAsync()
      .then((response) => {
        if (response.statusCode === 200) {
          const content = response.data;
          setSiteContent(content)
        }else{
          toast.error(response.message)
        }
      })
      .catch((error) => {
        toast.error(`Error fetching customer feedback: ${error}`);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    fetchCustomerFeedback();
  }, []);

  return (
    <>
      <Breadcrumb pageName='Customer Feedback' />

      {isLoading ? (
        <div className={'grid place-items-center'}>
          <CircularProgress color={'primary'} className={'p-4'}
                            label='Loading customer feedback ...' />
        </div>
      ) : (
        <>
          <Table aria-label="customer-feedback">
            <TableHeader>
              <TableColumn>Email</TableColumn>
              <TableColumn>Feedback</TableColumn>
              <TableColumn>Rating</TableColumn>
              <TableColumn className='hidden md:table-cell lg:table-cell'>Created On</TableColumn>
              <TableColumn>Action</TableColumn>
            </TableHeader>
            <TableBody
              emptyContent={!isLoading && siteContent.length === 0 ? 'No data to display.' : null}
            >
              {siteContent.map((content:UserFeedbackResponse) => (
                <TableRow key={content.id}>
                  <TableCell>
                    <Link href={`${NAVIGATION_LINKS.ADMIN_MANAGE_CUSTOMER_FEEDBACK}/${content.id}`}>{content.email}</Link>
                  </TableCell>
                  <TableCell>{content.feedback}</TableCell>
                  <TableCell>{content.rating}</TableCell>
                  <TableCell className='hidden md:table-cell lg:table-cell'>{formatDateWithTime(content.createdAt)}</TableCell>
                  <TableCell>
                    <Link href={NAVIGATION_LINKS.ADMIN_MANAGE_CUSTOMER_FEEDBACK}>View</Link>
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