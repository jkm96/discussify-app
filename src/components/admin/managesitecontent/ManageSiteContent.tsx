import dynamic from 'next/dynamic';
import {validateSiteContentFormInputErrors} from '@/helpers/validationHelpers';
import {fetchSiteContentByIdAsync, updateSiteContentAsync} from '@/lib/services/sitecontent/siteContentService';
import {toast} from 'react-toastify';
import React, {useEffect, useState} from 'react';
import {CreateSiteContentRequest, SiteContentResponse} from '@/boundary/interfaces/siteContent';
import {Button, CircularProgress, Input, Select, SelectItem} from '@nextui-org/react';
import Spinner from '@/components/shared/icons/Spinner';
import {contentTypes} from '@/components/admin/managesitecontent/modals/CreateSiteContentModal';

const CustomEditor = dynamic( () => {
  return import( '@/components/ckeditor5/custom-editor' );
}, { ssr: false } );

export function ManageSiteContent({contentId}:{contentId:number}) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [updateContentRequest, setUpdateContentRequest] = useState({} as CreateSiteContentRequest);
  const [inputErrors, setInputErrors] = useState({
    content: '', type: '', title: '',
  });
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const fetchContent = async () => {
    setIsLoading(true);
    await fetchSiteContentByIdAsync(contentId)
      .then((response) => {
        if (response.statusCode === 200) {
          const content: SiteContentResponse = response.data;
          setUpdateContentRequest(content);
        }
      })
      .catch((error) => {
        toast.error(`Error fetching content: ${error}`);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    fetchContent();
  }, [contentId]);

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setUpdateContentRequest({ ...updateContentRequest, [name]: value });
  };

  const handleEditorChange = (data: string) => {
    setUpdateContentRequest({ ...updateContentRequest, content: data });
  };

  const handleSiteContentUpdate = async (e: any) => {
    e.preventDefault();
    setIsSubmitting(true);

    const inputErrors = validateSiteContentFormInputErrors(updateContentRequest);

    if (inputErrors && Object.keys(inputErrors).length > 0) {
      setInputErrors(inputErrors);
      setIsSubmitting(false);
      return;
    }

    const response = await updateSiteContentAsync(updateContentRequest,contentId);
    if (response.statusCode === 200) {
      toast.success(response.message);
      setIsSubmitting(false);
    } else {
      setIsSubmitting(false);
      toast.error(response.message ?? 'Unknown error occurred');
    }
  };

  return(
    <>
      {isLoading ? (
        <>
          <div className={'grid place-items-center'}>
            <CircularProgress color={'primary'} className={'p-4'}
                              label='Fetching privacy policy ...' />
          </div>
        </>
      ):(
        <>
          <form>
            <div className='grid md:grid-cols-2 md:gap-6'>
              <Input type='text'
                     onChange={handleChange}
                     value={updateContentRequest.title}
                     label='Title'
                     radius={'sm'}
                     labelPlacement={'outside'}
                     name='title'
                     variant={'bordered'}
                     placeholder='Enter title'
                     onInput={() => {
                       setInputErrors({ ...inputErrors, title: '' });
                     }}
                     isInvalid={inputErrors.title !== ''}
                     errorMessage={inputErrors.title} />

              <Select
                items={contentTypes}
                label='Type'
                labelPlacement={'outside'}
                variant='bordered'
                name='type'
                value={updateContentRequest.type}
                defaultSelectedKeys={[updateContentRequest.type]}
                placeholder='Select type'
                onChange={handleChange}
                onSelectionChange={() => {
                  setInputErrors({ ...inputErrors, type: '' });
                }}
                isInvalid={inputErrors.type !== ''}
                errorMessage={inputErrors.type}
              >
                {(type) =>
                  <SelectItem key={type.value}>
                    {type.label}
                  </SelectItem>
                }
              </Select>
            </div>
          </form>

          <div className='grid md:grid-cols-1 md:gap-6 mt-2 mb-2'>
            <CustomEditor
              initialData={updateContentRequest.content}
              onChange={handleEditorChange}
            />
          </div>

          <Button color='primary'
                  type='submit'
                  isLoading={isSubmitting}
                  spinner={<Spinner />}
                  onClick={handleSiteContentUpdate}>
            {isSubmitting ? 'Submitting...' : 'Update Content'}
          </Button>
        </>
      )}
    </>
  )
}