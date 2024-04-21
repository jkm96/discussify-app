'use client';

import {useRouter} from "next/navigation";
import {EditPostRequest, PostResponse} from "@/boundary/interfaces/post";
import React, {useEffect, useState} from "react";
import {toast} from "react-toastify";
import {createPostAsync, editPostAsync, getPostDetails} from "@/lib/services/discussify/postService";
import {Card, CardFooter, CardHeader, CircularProgress, Divider, Link, Image, Avatar, Button} from "@nextui-org/react";
import {CardBody} from "@nextui-org/card";
import {RenderPostTitle} from "@/components/discussify/posts/RenderPostTitle";
import {RenderPostAuthor} from "@/components/discussify/posts/RenderPostAuthor";
import DOMPurify from 'dompurify';
import {EditIcon} from "@nextui-org/shared-icons";
import dynamic from "next/dynamic";
import Spinner from "@/components/shared/icons/Spinner";
import {validateCreatePostFormInputErrors} from "@/helpers/validationHelpers";
import {NAVIGATION_LINKS} from "@/boundary/configs/navigationConfig";

const CustomEditor = dynamic(() => {
    return import( '@/components/ckeditor5/custom-editor' );
}, {ssr: false});

export default function PostOverview({slug}: { slug: string }) {
    const router = useRouter();
    const [postDetails, setPostDetails] = useState<PostResponse>({} as PostResponse);
    const [isLoadingDetails, setIsLoadingDetails] = useState(true);
    const [showEditPost, setShowEditPost] = useState(false);
    const [editPostRequest, setEditPostRequest] = useState({} as EditPostRequest);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const fetchPostDetails = async (postSlug: any) => {
        setIsLoadingDetails(true);
        await getPostDetails(postSlug)
            .then((response) => {
                if (response.statusCode === 200) {
                    const post: PostResponse = response.data;
                    setPostDetails(post);
                    const editRequest: EditPostRequest = {
                        description: post.description,
                        postId: post.id,
                        title: post.title
                    }
                    setEditPostRequest(editRequest)
                }
            })
            .catch((error) => {
                toast.error(`Error fetching post details: ${error}`);
            })
            .finally(() => {
                setIsLoadingDetails(false);
            });
    };

    useEffect(() => {
        fetchPostDetails(slug);
    }, [slug]);

    const handleEditorChange = (data: string) => {
        setEditPostRequest({...editPostRequest, description: data});
    };

    const handleEditPost = async (e: any) => {
        e.preventDefault();
        const response = await editPostAsync(editPostRequest);
        if (response.statusCode === 200) {
            toast.success(response.message);
            setShowEditPost(false)
            setPostDetails({...postDetails, description: editPostRequest.description})
        } else {
            toast.error(response.message ?? 'Unknown error occurred');
        }
    };

    return (
        <>
            <div className="flex w-full mt-10">
                {isLoadingDetails ? (
                    <div className={'grid place-items-center'}>
                        <CircularProgress color={'primary'} className={'p-4'}
                                          label='Loading post details...'/>
                    </div>
                ) : (
                    <>
                        <Card className="w-full"
                              radius='sm'>
                            <CardHeader className="flex gap-3">
                                {/*post header/title section*/}
                                <RenderPostTitle postDetails={postDetails}/>
                            </CardHeader>

                            <Divider className='mt-0'/>

                            <CardBody>
                                {/*<RenderPostAuthor postDetails={postDetails}/>*/}
                                {/*post author details section*/}
                                <Card className="w-full"
                                      shadow={"none"}
                                      radius={"none"}>
                                    <CardHeader className="justify-between">
                                        <div className="flex gap-5">
                                            <Avatar isBordered radius="sm" size="md" name={"T"}/>
                                            <div className="flex flex-col gap-1 items-start justify-center">
                                                <h4 className="text-small font-semibold leading-none text-default-600">
                                                    {postDetails.user.username}
                                                </h4>
                                                <h5 className="text-small tracking-tight text-default-400">
                                                    <span className="mr-1">Joined 2025</span>
                                                    <span className="ml-1">10 posts</span>
                                                </h5>
                                            </div>
                                        </div>
                                        <span onClick={() => setShowEditPost(true)}>
                                            <EditIcon/>
                                        </span>
                                    </CardHeader>
                                </Card>
                                {showEditPost ? (
                                    <>
                                        <CustomEditor
                                            initialData={postDetails.description}
                                            onChange={handleEditorChange}
                                        />

                                        <div className="flex gap-2 mt-2">
                                            <Button color='primary'
                                                    type='submit'
                                                    size={'sm'}
                                                    isLoading={isSubmitting}
                                                    spinner={<Spinner/>}
                                                    onClick={handleEditPost}>
                                                {isSubmitting ? 'Submitting...' : 'Edit Thread'}
                                            </Button>

                                            <Button color='default'
                                                    type='submit'
                                                    size={'sm'}
                                                    spinner={<Spinner/>}
                                                    onClick={() => setShowEditPost(false)}>
                                                Cancel
                                            </Button>
                                        </div>
                                    </>
                                ) : (
                                    <>
                                        <p dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(postDetails.description)}}/>
                                    </>
                                )}
                            </CardBody>

                            <CardFooter className="text-small justify-between">
                                <b>
                                    <div className="flex gap-1">
                                        <p className="font-semibold text-default-400 text-small">97.1K</p>
                                        <p className="text-default-400 text-small">like</p>
                                    </div>
                                </b>
                                <div className="flex justify-end w-1/2">
                                    <span className="flex mr-3">
                                        <p className="font-semibold text-default-400 text-small">Since</p>
                                        <p className="text-default-400 text-small">save</p>
                                    </span>

                                    <span className="flex">
                                        <p className="font-semibold text-default-400 text-small">share</p>
                                        <p className="text-default-400 text-small">share</p>
                                    </span>
                                </div>
                            </CardFooter>
                        </Card>
                    </>
                )}
            </div>
        </>
    )
}