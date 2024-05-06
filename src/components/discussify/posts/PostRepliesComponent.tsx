import {User} from "@/boundary/interfaces/user";
import {EditPostReplyRequest, PostRepliesResponse, PostResponse} from "@/boundary/interfaces/post";
import React, {useEffect, useState} from "react";
import {PostRepliesQueryParameters} from "@/boundary/parameters/postRepliesQueryParameters";
import {editPostReplyAsync, getPostRepliesAsync} from "@/lib/services/discussify/postReplyService";
import {toast} from "react-toastify";
import {Avatar, Button, Card, CardFooter, CardHeader, CircularProgress, Link} from "@nextui-org/react";
import {CardBody} from "@nextui-org/card";
import UserStatsComponent from "@/components/discussify/Shared/UserStatsComponent";
import {formatDateWithoutTime, formatDateWithYear} from "@/helpers/dateHelpers";
import {EditIcon} from "@nextui-org/shared-icons";
import TimerIcon from "@/components/shared/icons/TimerIcon";
import Spinner from "@/components/shared/icons/Spinner";
import DOMPurify from "dompurify";
import ReplyIcon from "@/components/shared/icons/ReplyIcon";
import {LikeIcon} from "@/components/shared/icons/LikeIcon";
import ShareIcon from "@/components/shared/icons/ShareIcon";
import {addCommentAsync, getCommentsAsync} from "@/lib/services/discussify/commentService";
import {CommentRequest, CommentResponse} from "@/boundary/interfaces/comment";
import dynamic from "next/dynamic";

const CustomEditor = dynamic(() => {
    return import( '@/components/ckeditor5/custom-editor' );
}, {ssr: false});

interface Props {
    user: User | null;
    postDetails: PostResponse;
    initialPostReplies: PostRepliesResponse[];
}

const initialComment: CommentRequest = {
    description: '', postReplyId: 0
};

const initialEditReplyFormState: EditPostReplyRequest = {
    description: '', postId: 0, postReplyId: 0
};

interface EditPostReplyFormState {
    [postId: string]: {
        isVisible: boolean;
    };
}

export function PostRepliesComponent({user, postDetails,initialPostReplies }:Props) {
    const [postReplies, setPostReplies] = useState<PostRepliesResponse[]>([]);
    const [queryParams, setQueryParams] = useState<PostRepliesQueryParameters>(new PostRepliesQueryParameters());
    const [isLoadingReplies, setIsLoadingReplies] = useState(true);

    const [editPostReplyRequest, setEditPostReplyRequest] = useState(initialEditReplyFormState);

    const [showAddCommentForm, setShowAddCommentForm] = useState<number | null>(null);
    const [commentRequest, setCommentRequest] = useState({} as CommentRequest);
    const [commentResponse, setCommentResponse] = useState<CommentResponse[]>([]);

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

    useEffect(() => {
        if (initialPostReplies.length !== 0){
            setPostReplies(prevPostReplies => [...initialPostReplies, ...prevPostReplies]);
            initialPostReplies = []
        }
        console.info("initialPostReplies",initialPostReplies)
    }, [initialPostReplies]);

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
        fetchPostReplies(postDetails.slug);
    }, [postDetails.slug]);

    const handleEditPostReplyEditorChange = (data: string) => {
        setEditPostReplyRequest({...editPostReplyRequest, description: data});
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
                reply.id === postReplyId ? {...reply, description: editPostReplyRequest.description} : reply
            );

            setPostReplies(updatedReplies);
        } else {
            toast.error(response.message ?? 'Unknown error occurred');
        }
    };

    const fetchComments = async (postReplyId: any) => {
        setIsLoadingReplies(true);
        await getCommentsAsync(postReplyId)
            .then((response) => {
                if (response.statusCode === 200) {
                    const parsedData = response.data;
                    const {data, pagingMetaData} = parsedData;
                    setPostReplies(data);
                }
            })
            .catch((error) => {
                toast.error(`Error fetching post reply comments: ${error}`);
            })
            .finally(() => {
                setIsLoadingReplies(false);
            });
    };

    useEffect(() => {
        if (postReplies && !isLoadingReplies) {
            fetchComments(postDetails.slug);
        }
    }, [postDetails.slug]);

    const handleAddPostReplyCommentEditorChange = (data: string) => {
        setCommentRequest({...commentRequest, description: data});
    };

    const handleAddComment = async (postReplyId: number, e: any) => {
        e.preventDefault();
        console.info("add comment", postReplyId)
        const comment = commentRequest.description;
        if (!comment || comment.trim() === '') {
            toast.error("Please enter a valid comment");
            setIsSubmitting(false);
            return;
        }
        commentRequest.postReplyId = postReplyId;
        const response = await addCommentAsync(commentRequest);
        if (response.statusCode === 200) {
            toast.success(response.message);
            setShowAddCommentForm(null);
            setCommentRequest(initialComment);
            // Assuming response.data contains the newly added comment
            // const updatedReplies = postReplies.map(reply =>
            //     reply.id === postId ? { ...reply, comments: [response.data, ...reply.comments] } : reply
            // );
            // setPostReplies(updatedReplies);
        } else {
            toast.error(response.message ?? 'Unknown error occurred');
        }
    };

    return(
        <>
            {isLoadingReplies ? (
                <div className={'grid place-items-center'}>
                    <CircularProgress color={'primary'} className={'p-4'} label='Loading posts...'/>
                </div>
            ) : (
                <>
                    {postReplies.length > 0 && (
                        <>
                            {postReplies.map((postReply) => (
                                <div key={postReply.id}>
                                    <Card key={postReply.id} className="w-full mt-3" radius='sm'>

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
                                                                <UserStatsComponent key={postReply.id}
                                                                                    author={postReply.user}
                                                                                    className={'dark:text-white mr-1'}
                                                                />
                                                            </h4>
                                                            <h5 className="text-small dark:text-white text-default-400">
                                                                            <span
                                                                                className="mr-1">Joined {formatDateWithYear(postReply.user.createdAt)}</span>
                                                                <span
                                                                    className="ml-1">{postReply.user.postsCount} posts</span>
                                                            </h5>
                                                        </div>
                                                    </div>
                                                    <Link underline="hover"
                                                          className='dark:text-white text-default-500'
                                                          onClick={() => toggleEditFormVisibility(postReply.id)}>
                                                        {user && (
                                                            <>
                                                                {user.username == postReply.user.username && (
                                                                    <EditIcon/>
                                                                )}
                                                            </>
                                                        )}
                                                    </Link>
                                                </CardHeader>
                                            </Card>
                                            <p className='flex'><TimerIcon/> <span
                                                className='text-small'>{formatDateWithoutTime(postReply.createdAt)}</span>
                                            </p>

                                            {editPostReplyFormState[postReply.id]?.isVisible ? (
                                                <>
                                                    <CustomEditor
                                                        initialData={postReply.description}
                                                        onChange={handleEditPostReplyEditorChange}
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

                                        <CardFooter
                                            className="pt-0 text-default-400 text-small dark:text-white justify-between">
                                            <div className="flex justify-start w-1/2">
                                                {user && (
                                                    <span
                                                        className='flex items-center mr-1 cursor-pointer'
                                                        onClick={() => setShowAddCommentForm(postReply.id)}
                                                    >
                                                                        <p className="font-semibold items-center">
                                                                            <ReplyIcon width={20}/></p>
                                                                        <p className="hover:underline">Reply</p>
                                                                    </span>
                                                )}

                                                <span className="flex mr-3 items-center cursor-pointer">
                                                                    <p className="font-semibold">
                                                                        <LikeIcon width={20}/>
                                                                    </p>
                                                                    <p className="hover:underline">Like</p>
                                                                </span>
                                            </div>

                                            <div className="flex justify-end w-1/2">
                                                            <span className="flex items-center cursor-pointer">
                                                                <p className="font-semibold">
                                                                    <ShareIcon width={20}/>
                                                                </p>
                                                                <p className="hover:underline">Share</p>
                                                            </span>
                                            </div>
                                        </CardFooter>
                                    </Card>

                                    {/*form to add comment to a postReply*/}
                                    {showAddCommentForm === postReply.id && (
                                        <div key={postReply.createdAt}>
                                            <CustomEditor
                                                initialData={commentRequest.description || postReply.id}
                                                onChange={handleAddPostReplyCommentEditorChange}
                                            />

                                            <div className="flex gap-2 mt-2">
                                                <Button color='primary'
                                                        type='submit'
                                                        size={'sm'}
                                                        isLoading={isSubmitting}
                                                        spinner={<Spinner/>}
                                                        onClick={(e) => handleAddComment(postReply.id, e)}>
                                                    {isSubmitting ? 'Submitting...' : 'Post Comment'}
                                                </Button>

                                                <Button color='default'
                                                        type='submit'
                                                        size={'sm'}
                                                        spinner={<Spinner/>}
                                                        onClick={() => setShowAddCommentForm(null)}>
                                                    Cancel
                                                </Button>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </>
                    )}
                </>
            )}
        </>
    )
}