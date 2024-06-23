import {
    Button,
    Input,
    Modal,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalHeader,
    Select,
    SelectItem,
} from '@nextui-org/react';
import Spinner from '@/components/shared/icons/Spinner';
import React, {useState} from 'react';
import {validateSiteContentFormInputErrors} from '@/helpers/validationHelpers';
import {toast} from 'react-toastify';
import dynamic from 'next/dynamic';
import {CreateSiteContentRequest} from "@/boundary/interfaces/siteContent";
import {createSiteContentAsync} from "@/lib/services/sitecontent/siteContentService";

const initialFormState: CreateSiteContentRequest = {
  content: '', type: '', title: '',
};

export const contentTypes = [
  { label: 'Privacy Policy', value: 'privacy', description: 'Privacy Policy' },
  { label: 'Terms and Conditions', value: 'terms', description: 'Terms and Conditions' },
  { label: 'Blog', value: 'blog', description: 'Blog' },
];

const CustomEditor = dynamic( () => {
  return import( '@/components/ckeditor5/custom-editor' );
}, { ssr: false } );

export default function CreateSiteContentModal({ isOpen, onClose }: {
  isOpen: boolean,
  onClose: () => void
}) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [createContentRequest, setCreateContentRequest] = useState(initialFormState);
  const [inputErrors, setInputErrors] = useState(initialFormState);

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setCreateContentRequest({ ...createContentRequest, [name]: value });
  };

  const handleEditorChange = (data: string) => {
    setCreateContentRequest({ ...createContentRequest, content: data });
  };

  const handleSiteContentCreation = async (e: any) => {
    e.preventDefault();
    setIsSubmitting(true);

    const inputErrors = validateSiteContentFormInputErrors(createContentRequest);

    if (inputErrors && Object.keys(inputErrors).length > 0) {
      setInputErrors(inputErrors);
      setIsSubmitting(false);
      return;
    }

    const response = await createSiteContentAsync(createContentRequest);
    if (response.statusCode === 200) {
      toast.success(response.message);
      setIsSubmitting(false);
      onClose()
    } else {
      setIsSubmitting(false);
      toast.error(response.message ?? 'Unknown error occurred');
    }
  };
  const handleCloseModal = () => {

  };

  return (
    <>
      <Modal
        isOpen={isOpen}
        onOpenChange={() => {
          onClose();
          handleCloseModal();
        }}
        onClose={onClose}
        size='5xl'
        placement='center'
        scrollBehavior='inside'
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className='flex flex-col gap-1'>Create site content</ModalHeader>
              <ModalBody>
                <form>
                  <div className='grid md:grid-cols-2 md:gap-6'>
                    <Input type='text'
                           onChange={handleChange}
                           value={createContentRequest.title}
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
                <div className='grid md:grid-cols-1 md:gap-6'>
                  <CustomEditor
                    initialData={createContentRequest.content}
                    onChange={handleEditorChange}
                  />
                </div>
              </ModalBody>
              <ModalFooter>
                <Button color='danger' onPress={onClose}>
                  Close
                </Button>
                <Button color='primary'
                        type='submit'
                        isLoading={isSubmitting}
                        spinner={<Spinner />}
                        onClick={handleSiteContentCreation}>
                  {isSubmitting ? 'Submitting...' : 'Add Content'}
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}