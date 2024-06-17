import {User} from "@/boundary/interfaces/user";
import {EditPostReplyRequest, PostRepliesResponse, PostResponse} from "@/boundary/interfaces/post";
import React, {Key, useEffect, useState} from "react";
import {PostRepliesQueryParameters} from "@/boundary/parameters/postRepliesQueryParameters";
import {editPostReplyAsync, getPostRepliesAsync} from "@/lib/services/discussify/postReplyService";
import {toast} from "react-toastify";
import {
    Avatar,
    Button,
    Card,
    CardFooter,
    CardHeader,
    Chip,
    CircularProgress,
    Dropdown,
    DropdownItem,
    DropdownMenu,
    DropdownTrigger,
    Link
} from "@nextui-org/react";
import {CardBody} from "@nextui-org/card";
import RecordAuthorStatsComponent from "@/components/discussify/Shared/RecordAuthorStatsComponent";
import {formatDateWithoutTime, formatDateWithYear} from "@/helpers/dateHelpers";
import {EditIcon} from "@nextui-org/shared-icons";
import Spinner from "@/components/shared/icons/Spinner";
import DOMPurify from "dompurify";
import {LikeIcon, TimerIcon} from "@/components/shared/icons/LikeIcon";
import ShareIcon from "@/components/shared/icons/ShareIcon";
import {CommentRequest, CommentResponse} from "@/boundary/interfaces/comment";
import dynamic from "next/dynamic";
import {addCommentAsync, getCommentsAsync} from "@/lib/services/discussify/commentService";
import {ReplyIcon} from "@/components/shared/icons/ReplyIcon";
import Pagination from "@/components/discussify/forums/Pagination";
import {PagingMetaData} from "@/boundary/paging/paging";
import Filter from "@/components/discussify/forums/Filter";
import CommentComponent from "@/components/discussify/posts/CommentComponent";

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

export function PostRepliesComponent({user, postDetails, initialPostReplies}: Props) {
    const [selectedKey, setSelectedKey] = useState<string>('latest');
    const [pagingMetaData, setPagingMetaData] = useState<PagingMetaData>({} as PagingMetaData);
    const [currentPage, setCurrentPage] = useState<number>(1);

    const [postReplies, setPostReplies] = useState<PostRepliesResponse[]>([]);
    const [queryParams, setQueryParams] = useState<PostRepliesQueryParameters>(new PostRepliesQueryParameters());
    const [isLoadingReplies, setIsLoadingReplies] = useState(true);

    const [editPostReplyRequest, setEditPostReplyRequest] = useState(initialEditReplyFormState);

    const [showAddCommentForm, setShowAddCommentForm] = useState<number | null>(null);
    const [commentRequest, setCommentRequest] = useState({} as CommentRequest);

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
        if (initialPostReplies.length !== 0) {
            // Use map to add unique keys to the new replies
            const newPostReplies = initialPostReplies.map((reply, index) => ({
                ...reply,
                // Assuming each reply has an ID, use it as the key
                key: reply.id || index // If ID is not available, use index as fallback
            }));
            setPostReplies(prevPostReplies => [...newPostReplies, ...prevPostReplies]);
            // Clear initialPostReplies after adding them to postReplies
            initialPostReplies = [];
        }
    }, [initialPostReplies]);

    const fetchPostReplies = async (postSlug: any, queryParams: PostRepliesQueryParameters) => {
        setIsLoadingReplies(true);
        await getPostRepliesAsync(postSlug, queryParams)
            .then((response) => {
                if (response.statusCode === 200) {
                    const parsedData = response.data;
                    const {data, pagingMetaData} = parsedData;
                    setPostReplies(data);
                    setPagingMetaData(pagingMetaData);
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
        fetchPostReplies(postDetails.slug, {...queryParams, pageNumber: currentPage, sortBy: selectedKey});
    }, [postDetails.slug, queryParams, currentPage, selectedKey]);

    const handleEditPostReplyEditorChange = (data: string) => {
        setEditPostReplyRequest({...editPostReplyRequest, description: data});
    };

    const handleEditPostReply = async (postReplyId: number, e: any) => {
        e.preventDefault();
        setIsSubmitting(true);
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
            setIsSubmitting(false);
            setPostReplies(updatedReplies);
        } else {
            setIsSubmitting(false);
            toast.error(response.message ?? 'Unknown error occurred');
        }
    };

    const handleAddPostReplyCommentEditorChange = (data: string) => {
        setCommentRequest({...commentRequest, description: data});
    };

    const handleAddComment = async (postReplyId: number, e: any) => {
        e.preventDefault();
        setIsSubmitting(true);
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
            setFetchingCommentsFor({postReplyId, isFetched: false});
        } else {
            toast.error(response.message ?? 'Unknown error occurred');
        }
        setIsSubmitting(false);
    };

    const updateAuthorFollowStatus = (uniqueId: string, authorId: number, followed: boolean) => {
        if (uniqueId === 'post-reply') {
            const updatedPostReplies = postReplies.map(reply => {
                if (reply.user.id === authorId) {
                    return {
                        ...reply,
                        userHasFollowedAuthor: followed
                    };
                }
                return reply;
            });
            setPostReplies(updatedPostReplies);
        }
    };

    const [fetchingCommentsFor, setFetchingCommentsFor] = useState<{
        postReplyId: number,
        isFetched: boolean
    }>({postReplyId: 0, isFetched: false});

    function handleLoadComments(postReplyId: number) {
        setFetchingCommentsFor({postReplyId, isFetched: true});
    }

    useEffect(() => {
        if (!fetchingCommentsFor.isFetched) {
            handleLoadComments(fetchingCommentsFor.postReplyId);
        }
    }, [fetchingCommentsFor]);

    return (
        <>
            {isLoadingReplies ? (
                <div className='grid place-items-center'>
                    <CircularProgress color='primary' className='p-4' label='Loading posts...'/>
                </div>
            ) : (
                <>
                    {postReplies.length > 0 && (
                        <>
                            <div className="flex w-full justify-between items-center mt-2">
                                <div className='flex w-1/2 justify-start'>
                                    Sort by:
                                    <Filter
                                        selectedKey={selectedKey}
                                        onSelect={setSelectedKey}
                                    />
                                </div>
                                <div className='flex w-1/2 justify-end'>
                                    <Pagination
                                        currentPage={pagingMetaData.currentPage}
                                        totalPages={pagingMetaData.totalPages}
                                        onPageChange={setCurrentPage}
                                    />
                                </div>
                            </div>

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
                                                                <RecordAuthorStatsComponent key={postReply.id}
                                                                                            uniqueId={'post-reply'}
                                                                                            author={postReply.user}
                                                                                            userHasFollowedAuthor={postReply.userHasFollowedAuthor}
                                                                                            updateAuthorFollowStatus={updateAuthorFollowStatus}
                                                                                            followButtonDisabled={false}
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
                                                          className='dark:text-white text-default-500 cursor-pointer'
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
                                            <p className='flex'><TimerIcon width={15} height={20}/>
                                                <span
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
                                                    <>
                                                        <Chip
                                                            onClick={() => setShowAddCommentForm(postReply.id)}
                                                            startContent={<ReplyIcon width={18}/>}
                                                            variant="light"
                                                            className='cursor-pointer'
                                                        >
                                                            <p className="hover:underline">Reply</p>
                                                        </Chip>
                                                    </>
                                                )}

                                                <Chip
                                                    startContent={<LikeIcon width={18}/>}
                                                    variant="light"
                                                    className='cursor-pointer'
                                                >
                                                    <p className="hover:underline">Like</p>
                                                </Chip>
                                            </div>

                                            <div className="flex justify-end w-1/2">
                                                <Chip
                                                    startContent={<ShareIcon width={18}/>}
                                                    variant="light"
                                                    className='cursor-pointer'
                                                >
                                                    <p className="hover:underline">Share</p>
                                                </Chip>
                                            </div>
                                        </CardFooter>

                                        {postReply.commentsCount > 0 && (
                                            <div className='flex items-center justify-center mb-1'>
                                                {(!fetchingCommentsFor.isFetched || fetchingCommentsFor.postReplyId !== postReply.id) && (
                                                    <Chip radius="sm"
                                                          size='sm'
                                                          className='place-items-center cursor-pointer hover:underline'
                                                          onClick={() => handleLoadComments(postReply.id)}
                                                    >
                                                        Load comments
                                                    </Chip>
                                                )}
                                            </div>
                                        )}
                                    </Card>

                                    {/*form to add comment to a postReply*/}
                                    {showAddCommentForm === postReply.id && (
                                        <div className='mt-4' key={postReply.createdAt}>
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

                                    {fetchingCommentsFor.isFetched && fetchingCommentsFor.postReplyId === postReply.id && (
                                        <CommentComponent key={postReply.user.createdAt}
                                                          user={user}
                                                          postReplyId={postReply.id}
                                                          sortBy={queryParams.sortBy}
                                        />
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