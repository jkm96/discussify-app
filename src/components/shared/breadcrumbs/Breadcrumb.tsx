import Link from 'next/link';
import {NAVIGATION_LINKS} from '@/boundary/configs/navigationConfig';

interface BreadcrumbProps {
  pageName: string;
}

const Breadcrumb = ({ pageName }: BreadcrumbProps) => {
  return (
    <div className='md:mb-6 mb-4 flex flex-col gap-3 m-2 sm:flex-row sm:items-center sm:justify-between'>
      <h3 className='text-title-md2 font-semibold text-black dark:text-white'>
        {pageName}
      </h3>

      <nav>
        <ol className='flex items-center gap-2'>
          <li>
            <Link className='font-medium' href={NAVIGATION_LINKS.USER_DASHBOARD}>
              Dashboard /
            </Link>
          </li>
          <li className='font-medium text-primary'>{pageName}</li>
        </ol>
      </nav>
    </div>
  );
};

export default Breadcrumb;
