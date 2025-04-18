'use client';

import {Button, Input} from "@nextui-org/react";
import React, {useState} from "react";
import {CreatePostRequest} from "@/boundary/interfaces/post";
import {toast} from "react-toastify";
import Spinner from "@/components/shared/icons/Spinner";
import {validateCreatePostFormInputErrors} from "@/helpers/validationHelpers";
import {createPostAsync} from "@/lib/services/discussify/postService";
import dynamic from "next/dynamic";
import {NAVIGATION_LINKS} from "@/boundary/configs/navigationConfig";
import {useRouter} from "next/navigation";


const CustomEditor = dynamic(() => {
    return import( '@/components/ckeditor5/custom-editor' );
}, {ssr: false});

export const initialPostFormState: CreatePostRequest = {
    forumSlug: '', description: '', tags: '', title: ''
};

export default function CreateForumPost({slug}: { slug: string }) {
    const router = useRouter();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [createPostRequest, setCreatePostRequest] = useState(initialPostFormState);
    const [inputErrors, setInputErrors] = useState({
        forumSlug: '', description: '', tags: '', title: ''
    });
    const handleChange = (e: any) => {
        const {name, value} = e.target;
        setCreatePostRequest({...createPostRequest, [name]: value});
    };

    const handleEditorChange = (data: string) => {
        setInputErrors({...inputErrors, description: ''});
        setCreatePostRequest({...createPostRequest, description: data});
    };

    const handleCreatePost = async (e: any) => {
        e.preventDefault();
        setIsSubmitting(true);
        createPostRequest.forumSlug = slug;

        const inputErrors = validateCreatePostFormInputErrors(createPostRequest);

        if (inputErrors && Object.keys(inputErrors).length > 0) {
            setInputErrors(inputErrors);
            setIsSubmitting(false);
            return;
        }

        const response = await createPostAsync(createPostRequest);
        if (response.statusCode === 200) {
            toast.success(response.message);
            setIsSubmitting(false);
            router.push(NAVIGATION_LINKS.HOME)
        } else {
            setIsSubmitting(false);
            toast.error(response.message ?? 'Unknown error occurred');
        }
    };

    return (
        <div className="h-screen w-full mt-10">
            <h1>Create Thread</h1>
            <form>
                <Input type='text'
                       onChange={handleChange}
                       value={createPostRequest.title}
                       label='Thread Title'
                       radius={'sm'}
                       labelPlacement={'outside'}
                       name='title'
                       variant={'bordered'}
                       placeholder='Enter thread title'
                       onInput={() => {
                           setInputErrors({...inputErrors, title: ''});
                       }}
                       isInvalid={inputErrors.title !== ''}
                       errorMessage={inputErrors.title}/>
            </form>

            <div className='grid md:grid-cols-1 md:gap-6 mt-2 mb-2'>
                <h3>Thread message</h3>
                <CustomEditor
                    initialData={createPostRequest.description}
                    onChange={handleEditorChange}
                />
                <Input
                    label='Tags'
                    labelPlacement={'outside'}
                    name='tags'
                    onChange={handleChange}
                    value={createPostRequest.tags}
                    variant='bordered'
                    description={'More than one tags should be separated by comma'}
                    placeholder={'Enter thread tags'}
                    isInvalid={inputErrors.tags !== ''}
                    errorMessage={inputErrors.tags}/>
            </div>

            <Button color='primary'
                    type='submit'
                    isLoading={isSubmitting}
                    spinner={<Spinner/>}
                    onClick={handleCreatePost}>
                {isSubmitting ? 'Submitting...' : 'Submit Thread'}
            </Button>
        </div>
    )
}