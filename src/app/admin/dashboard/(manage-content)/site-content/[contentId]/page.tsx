'use client';

import {ManageSiteContent} from '@/components/admin/managesitecontent/ManageSiteContent';

function ManageSiteContentPage({ params }: { params: { contentId: number } }) {
  return (
    <>
      <ManageSiteContent contentId={params.contentId} />
    </>
  );
}

export default ManageSiteContentPage;