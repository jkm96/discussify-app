'use client';

import {useRouter} from "next/navigation";
import {
    CreatePostRequest,
    EditPostRequest,
    PostReplyRequest,
    PostRepliesResponse,
    PostResponse, EditPostReplyRequest
} from "@/boundary/interfaces/post";
import React, {useEffect, useState} from "react";
import {toast} from "react-toastify";
import {
    createPostAsync,
    editPostAsync, editPostReplyAsync,
    getPostDetailsAsync,
    getPostRepliesAsync,
    postCommentAsync
} from "@/lib/services/discussify/postService";
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
import {useAuth} from "@/hooks/useAuth";
import ShareIcon from "@/components/shared/icons/ShareIcon";
import ReplyIcon from "@/components/shared/icons/ReplyIcon";
import {PostQueryParameters} from "@/boundary/parameters/postQueryParameters";
import {PostRepliesQueryParameters} from "@/boundary/parameters/postRepliesQueryParameters";
import {formatDateWithoutTime, formatDateWithYear} from "@/helpers/dateHelpers";
import TimerIcon from "@/components/shared/icons/TimerIcon";

const CustomEditor = dynamic(() => {
    return import( '@/components/ckeditor5/custom-editor' );
}, {ssr: false});

const initialPostReplyFormState: PostReplyRequest = {
    description: '', postId: 0
};

const initialEditReplyFormState: EditPostReplyRequest = {
    description: '', postId: 0, postReplyId: 0
};

interface EditPostReplyFormState {
    [postId: string]: {
        isVisible: boolean;
    };
}

export default function PostOverview({slug}: { slug: string }) {
    const {user} = useAuth();
    const [postDetails, setPostDetails] = useState<PostResponse>({} as PostResponse);
    const [isLoadingDetails, setIsLoadingDetails] = useState(true);

    const [postReplies, setPostReplies] = useState<PostRepliesResponse[]>([]);
    const [queryParams, setQueryParams] = useState<PostRepliesQueryParameters>(new PostRepliesQueryParameters());
    const [isLoadingReplies, setIsLoadingReplies] = useState(true);

    const [showEditPost, setShowEditPost] = useState(false);
    const [showCommentForm, setShowCommentForm] = useState(false);
    const [editPostRequest, setEditPostRequest] = useState({} as EditPostRequest);
    const [postReplyRequest, setPostReplyRequest] = useState(initialPostReplyFormState);
    const [editPostReplyRequest, setEditPostReplyRequest] = useState(initialEditReplyFormState);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const [editPostReplyFormState, setEditPostReplyFormState] = useState<EditPostReplyFormState>({});
    const toggleEditFormVisibility = (postId: number): void => {
        setEditPostReplyFormState((prevState) => ({
            ...prevState,
            [postId]: {
                isVisible: !prevState[postId]?.isVisible || true
            }
        }));
    };
    const fetchPostDetails = async (postSlug: any) => {
        setIsLoadingDetails(true);
        await getPostDetailsAsync(postSlug)
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

    const handlePostEditorChange = (data: string) => {
        setEditPostRequest({...editPostRequest, description: data});
    };

    const handleCommentEditorChange = (data: string) => {
        setPostReplyRequest({...postReplyRequest, description: data});
    };

    const handlePostReplyEditorChange = (data: string) => {
        setEditPostReplyRequest({...editPostReplyRequest, description: data});
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

    const handlePostComment = async (e: any) => {
        e.preventDefault();
        if (postReplyRequest.description.trim() === '') {
            toast.error("Please enter a valid comment")
            setIsSubmitting(false);
            return;
        }
        postReplyRequest.postId = postDetails.id;
        const response = await postCommentAsync(postReplyRequest);
        if (response.statusCode === 200) {
            toast.success(response.message);
            setShowCommentForm(false)
            setPostReplyRequest(initialPostReplyFormState)

            const updatedReplies = [response.data,...postReplies];
            setPostReplies(updatedReplies);
        } else {
            toast.error(response.message ?? 'Unknown error occurred');
        }
    };

    const handleEditPostReply = async (postReplyId: number, e: any) => {
        e.preventDefault();
        if (editPostReplyRequest.description.trim() === '') {
            toast.error("Please enter a valid message")
            setIsSubmitting(false);
            return;
        }
        editPostReplyRequest.postId = postDetails.id;
        editPostReplyRequest.postReplyId = postReplyId;
        const response = await editPostReplyAsync(editPostReplyRequest);
        if (response.statusCode === 200) {
            toast.success(response.message);
            setEditPostReplyFormState((prevState) => ({
                ...prevState,
                [postReplyId]: {
                    ...prevState[postReplyId],
                    isVisible: false
                }
            }));

            const updatedReplies = postReplies.map(reply =>
                reply.id === postReplyId ? { ...reply, description: editPostReplyRequest.description } : reply
            );

            setPostReplies(updatedReplies);
        } else {
            toast.error(response.message ?? 'Unknown error occurred');
        }
    };

    const fetchPostReplies = async (postSlug: any) => {
        setIsLoadingReplies(true);
        await getPostRepliesAsync(postSlug)
            .then((response) => {
                if (response.statusCode === 200) {
                    const parsedData = response.data;
                    const {data, pagingMetaData} = parsedData;
                    setPostReplies(data);
                }
            })
            .catch((error) => {
                toast.error(`Error fetching thread replies: ${error}`);
            })
            .finally(() => {
                setIsLoadingReplies(false);
            });
    };

    useEffect(() => {
        fetchPostReplies(slug);
    }, [slug]);

    return (
        <>
            <div className="flex w-full mt-10">
                {/*post overview section*/}
                <div className="w-10/12 bg-black mr-4">
                    {isLoadingDetails ? (
                        <div className={'grid place-items-center'}>
                            <CircularProgress color={'primary'} className={'p-4'}
                                              label='Loading post details...'/>
                        </div>
                    ) : (
                        <>
                            <Card className="w-full" radius='sm'>
                                <CardHeader className="flex gap-3">
                                    {/*post header/title section*/}
                                    <RenderPostTitle postDetails={postDetails}/>
                                </CardHeader>

                                <Divider className='mt-0'/>

                                <CardBody className='pt-0'>
                                    {/*<RenderPostAuthor postDetails={postDetails}/>*/}
                                    {/*post author details section*/}
                                    <Card className="w-full pl-0"
                                          shadow={"none"}
                                          radius={"none"}>
                                        <CardHeader className="justify-between pl-0">
                                            <div className="flex gap-2">
                                                <Avatar radius="sm"
                                                        size="md"
                                                        src={postDetails.user.profileUrl || ''}/>
                                                <div className="flex flex-col gap-1 items-start justify-center">
                                                    <h4 className="text-small font-semibold leading-none text-default-600">
                                                        {postDetails.user.username}
                                                    </h4>
                                                    <h5 className="text-small tracking-tight text-default-400">
                                                        <span
                                                            className="mr-1">Joined {formatDateWithYear(postDetails.user.createdAt)}</span>
                                                        <span className="ml-1">10 posts</span>
                                                    </h5>
                                                </div>
                                            </div>
                                            <span onClick={() => setShowEditPost(true)}>
                                            {user && (
                                                <>
                                                    {user.username == postDetails.user.username && (
                                                        <EditIcon/>
                                                    )}
                                                </>
                                            )}
                                        </span>
                                        </CardHeader>
                                    </Card>
                                    {showEditPost ? (
                                        <>
                                            <CustomEditor
                                                initialData={postDetails.description}
                                                onChange={handlePostEditorChange}
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

                                <CardFooter className="text-small justify-between pt-0">
                                    <div className="flex justify-start w-1/2">
                                        {user ? (
                                            <span className='flex w-full' onClick={() => setShowCommentForm(true)}>
                                                <p className="font-semibold text-default-400 text-small"><ReplyIcon/></p>
                                                <p className="text-default-400 text-small">Reply</p>
                                        </span>
                                        ) : (
                                            <span className="flex mr-3">
                                                <p className="font-semibold text-default-400 text-small">Since</p>
                                                <p className="text-default-400 text-small">Like</p>
                                            </span>
                                        )}
                                    </div>

                                    <div className="flex justify-end w-1/2">
                                    <span className="flex mr-3">
                                        <p className="font-semibold text-default-400 text-small">Since</p>
                                        <p className="text-default-400 text-small">Save</p>
                                    </span>

                                        <span className="flex">
                                        <p className="font-semibold text-small">
                                            <ShareIcon/>
                                        </p>
                                        <p className="text-small">Share</p>
                                    </span>
                                    </div>
                                </CardFooter>
                            </Card>

                            {/*comment form section*/}
                            <Card radius='sm' className='mt-5'>
                                {showCommentForm && (
                                    <>
                                        <CustomEditor
                                            initialData={postReplyRequest.description}
                                            onChange={handleCommentEditorChange}
                                        />

                                        <div className="flex gap-2 mt-2">
                                            <Button color='primary'
                                                    type='submit'
                                                    size={'sm'}
                                                    isLoading={isSubmitting}
                                                    spinner={<Spinner/>}
                                                    onClick={handlePostComment}>
                                                {isSubmitting ? 'Submitting...' : 'Post Comment'}
                                            </Button>

                                            <Button color='default'
                                                    type='submit'
                                                    size={'sm'}
                                                    spinner={<Spinner/>}
                                                    onClick={() => setShowCommentForm(false)}>
                                                Cancel
                                            </Button>
                                        </div>
                                    </>
                                )}
                            </Card>

                            {/*post replies sections*/}
                            {isLoadingReplies ? (
                                <div className={'grid place-items-center'}>
                                    <CircularProgress color={'primary'} className={'p-4'} label='Loading posts...'/>
                                </div>
                            ) : (
                                <>
                                    {postReplies.length > 0 && (
                                        <>
                                            {postReplies.map((postReply) => (
                                                <Card key={postReply.id} className="w-full mt-5" radius='sm'>

                                                    <CardBody>
                                                        <Card className="w-full pt-0 pl-0"
                                                              shadow={"none"}
                                                              radius={"none"}>
                                                            <CardHeader className="justify-between pt-0 pl-0">
                                                                <div className="flex gap-2">
                                                                    <Avatar radius="sm"
                                                                            size="md"
                                                                            src={postReply.user.profileUrl || ''}/>
                                                                    <div
                                                                        className="flex flex-col gap-1 items-start justify-center">
                                                                        <h4 className="text-small font-semibold leading-none text-default-600">
                                                                            {postReply.user.username}
                                                                        </h4>
                                                                        <h5 className="text-small tracking-tight text-default-400">
                                                                            <span
                                                                                className="mr-1">Joined {formatDateWithYear(postReply.user.createdAt)}</span>
                                                                            <span className="ml-1">10 posts</span>
                                                                        </h5>
                                                                    </div>
                                                                </div>
                                                                <span
                                                                    onClick={() => toggleEditFormVisibility(postReply.id)}>
                                                                    {user && (
                                                                        <>
                                                                            {user.username == postReply.user.username && (
                                                                                <EditIcon/>
                                                                            )}
                                                                        </>
                                                                    )}
                                                                </span>
                                                            </CardHeader>
                                                        </Card>
                                                        <p className='flex'><TimerIcon/> <span
                                                            className='text-small'>{formatDateWithoutTime(postReply.createdAt)}</span>
                                                        </p>

                                                        {editPostReplyFormState[postReply.id]?.isVisible ? (
                                                            <>
                                                                <CustomEditor
                                                                    initialData={postReply.description}
                                                                    onChange={handlePostReplyEditorChange}
                                                                />

                                                                <div className="flex gap-2 mt-2">
                                                                    <Button color='primary'
                                                                            type='submit'
                                                                            size={'sm'}
                                                                            onClick={(e) => handleEditPostReply(postReply.id, e)}
                                                                            isLoading={isSubmitting}
                                                                            spinner={<Spinner/>}>
                                                                        {isSubmitting ? 'Submitting...' : 'Edit Reply'}
                                                                    </Button>

                                                                    <Button color='default'
                                                                            onClick={() =>
                                                                                setEditPostReplyFormState((prevState) => ({
                                                                                    ...prevState,
                                                                                    [postReply.id]: {
                                                                                        ...prevState[postReply.id],
                                                                                        isVisible: false
                                                                                    }
                                                                                }))
                                                                            }
                                                                            type='submit'
                                                                            size={'sm'}>
                                                                        Cancel
                                                                    </Button>
                                                                </div>
                                                            </>
                                                        ) : (
                                                            <>
                                                                <p dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(postReply.description)}}/>
                                                            </>
                                                        )}

                                                    </CardBody>

                                                    <CardFooter className="pt-0 text-small justify-between">
                                                        <div className="flex justify-start w-1/2">
                                                            <span className="flex mr-3">
                                                                <p className="font-semibold text-default-400 text-small">Since</p>
                                                                <p className="text-default-400 text-small">Like</p>
                                                            </span>
                                                        </div>

                                                        <div className="flex justify-end w-1/2">
                                                            <span className="flex">
                                                                <p className="font-semibold text-small">
                                                                    <ShareIcon/>
                                                                </p>
                                                                <p className="text-small">Share</p>
                                                            </span>
                                                        </div>
                                                    </CardFooter>
                                                </Card>
                                            ))}
                                        </>
                                    )}
                                </>
                            )}
                        </>
                    )}
                </div>

                {/*forum stats section*/}
                <div className="w-2/12 bg-blue-200 mr-4">
                    forum stats
                </div>
            </div>
        </>
    )
}