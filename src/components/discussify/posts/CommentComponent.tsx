'use client';

import {Avatar, Button, Card, CardFooter, CardHeader, Chip, CircularProgress, Link} from "@nextui-org/react";
import React, {useEffect, useState} from "react";
import {editCommentAsync, getCommentsAsync} from "@/lib/services/discussify/commentService";
import {toast} from "react-toastify";
import {CommentResponse, EditCommentRequest} from "@/boundary/interfaces/comment";
import {PostRepliesQueryParameters} from "@/boundary/parameters/postRepliesQueryParameters";
import DOMPurify from "dompurify";
import {CardBody} from "@nextui-org/card";
import RecordAuthorStatsComponent from "@/components/discussify/Shared/RecordAuthorStatsComponent";
import {formatDateWithoutTime, formatDateWithYear} from "@/helpers/dateHelpers";
import {EditIcon} from "@nextui-org/shared-icons";
import {LikeIcon, TimerIcon} from "@/components/shared/icons/LikeIcon";
import Spinner from "@/components/shared/icons/Spinner";
import {ReplyIcon} from "@/components/shared/icons/ReplyIcon";
import ShareIcon from "@/components/shared/icons/ShareIcon";
import {User} from "@/boundary/interfaces/user";
import dynamic from "next/dynamic";
import {editPostReplyAsync} from "@/lib/services/discussify/postReplyService";
import {EditPostReplyRequest} from "@/boundary/interfaces/post";
import AddReplyForm from "@/components/discussify/posts/AddReplyForm";
import EditReplyForm from "@/components/discussify/posts/EditReplyForm";

const CustomEditor = dynamic(() => {
    return import( '@/components/ckeditor5/custom-editor' );
}, {ssr: false});

const initialEditCommentFormState: EditCommentRequest = {
    description: '', commentId: 0, postReplyId: 0
};

interface Props {
    user: User | null;
    postReplyId: number;
    sortBy: string;
}

interface EditCommentFormState {
    [postId: string]: {
        isVisible: boolean;
    };
}

export default function CommentComponent({user, postReplyId, sortBy}: Props) {
    const [isLoadingComments, setIsLoadingComments] = useState(true);
    const [commentResponse, setCommentResponse] = useState<CommentResponse[]>([]);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [editCommentRequest, setEditCommentRequest] = useState(initialEditCommentFormState);

    const [editCommentFormState, setEditCommentFormState] = useState<EditCommentFormState>({});
    const toggleEditFormVisibility = (postId: number): void => {
        setEditCommentFormState((prevState) => ({
            ...prevState,
            [postId]: {
                isVisible: !prevState[postId]?.isVisible || true
            }
        }));
    };
    const fetchComments = async (postReplyId: any) => {
        setIsLoadingComments(true);
        const queryParams = new PostRepliesQueryParameters();
        await getCommentsAsync(postReplyId, {...queryParams, sortBy: sortBy})
            .then((response) => {
                if (response.statusCode === 200) {
                    const parsedData = response.data;
                    const {data, pagingMetaData} = parsedData;
                    setCommentResponse(data);
                }
            })
            .catch((error) => {
                toast.error(`Error fetching comments: ${error}`);
            })
            .finally(() => {
                setIsLoadingComments(false);
            });
    };

    useEffect(() => {
        fetchComments(postReplyId);
    }, [postReplyId]);

    const [activeReplyFormId, setActiveReplyFormId] = useState(null);

    const toggleReplyForm = (id: any) => {
        setActiveReplyFormId(id === activeReplyFormId ? null : id);
    };

    const handleReplyAdded = () => {

    };

    const toggleEditForm = (commentId: number) => {
        setEditCommentFormState((prevState) => ({
            ...prevState,
            [commentId]: {
                isVisible: !prevState[commentId]?.isVisible,
            },
        }));
    };

    const handleCommentEdited = (commentId: number, description: string) => {
        const updatedComments = commentResponse.map((comment) =>
            comment.id === commentId ? { ...comment, description } : comment
        );
        setCommentResponse(updatedComments);
    };

    return (
        <>
            {isLoadingComments ? (
                <div className='grid place-items-center'>
                    <CircularProgress color='primary' className='p-4' label='Loading comments...'/>
                </div>
            ) : (
                <Card radius='sm' className='mt-4 border-yellow-500 border-1 bg-grey-200 dark:bg-boxdark-2'>
                    {commentResponse.map((comment) => (
                        <div key={comment.createdAt}>
                            <Card key={comment.id} className='m-1 bg-grey-200 dark:bg-boxdark-2' radius='sm'>
                                <CardBody>
                                    <Card className="w-full pt-0 pl-0 bg-grey-200 dark:bg-boxdark-2"
                                          shadow={"none"}
                                          radius={"none"}>
                                        <CardHeader className="justify-between pt-0 pl-0">
                                            <div className="flex gap-2">
                                                <Avatar radius="sm"
                                                        size="md"
                                                        src={comment.user.profileUrl || ''}/>
                                                <div
                                                    className="flex flex-col gap-1 items-start justify-center">
                                                    <h4 className="text-small font-semibold leading-none text-default-600">
                                                        <RecordAuthorStatsComponent key={comment.id}
                                                                                    uniqueId={'post-reply'}
                                                                                    author={comment.user}
                                                                                    userHasFollowedAuthor={false}
                                                                                    followButtonDisabled={true}
                                                        />
                                                    </h4>
                                                    <h5 className="text-small dark:text-white text-default-400">
                                                        {/*<Chip  className={'mr-1 p-0 h-5'}>*/}
                                                        {/*    Joined {formatDateWithYear(comment.user.createdAt)}*/}
                                                        {/*</Chip>*/}
                                                        {/*<Chip className={'ml-1 p-0 h-5'}>*/}
                                                        {/*    {comment.user.postsCount} posts*/}
                                                        {/*</Chip>*/}

                                                        <span
                                                                                className="mr-1">Joined {formatDateWithYear(comment.user.createdAt)}</span>
                                                        <span
                                                            className="ml-1">{comment.user.postsCount} posts</span>
                                                    </h5>
                                                </div>
                                            </div>
                                            <Link underline="hover"
                                                  className='dark:text-white text-default-500 cursor-pointer'
                                                  onClick={() => toggleEditFormVisibility(comment.id)}>
                                                {user && (
                                                    <>
                                                        {user.username == comment.user.username && (
                                                            <EditIcon/>
                                                        )}
                                                    </>
                                                )}
                                            </Link>
                                        </CardHeader>
                                    </Card>
                                    <p className='flex'><TimerIcon width={15} height={20}/>
                                        <span
                                            className='text-small'>{formatDateWithoutTime(comment.createdAt)}</span>
                                    </p>

                                    {editCommentFormState[comment.id]?.isVisible ? (
                                        <>
                                            <EditReplyForm
                                                initialData={comment.description}
                                                parentRecordId={comment.id}
                                                recordId={comment.id}
                                                onCommentEdited={handleCommentEdited}
                                                user={user}
                                                onToggle={() => toggleEditForm(comment.id)}
                                                isActive={editCommentFormState[comment.id]?.isVisible}
                                            />
                                        </>
                                    ) : (
                                        <>
                                            <p dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(comment.description)}}/>
                                        </>
                                    )}

                                </CardBody>

                                <CardFooter
                                    className="pt-0 text-default-400 text-small dark:text-white justify-between">
                                    <div className="flex justify-start w-1/2">
                                        {user && (
                                            <>
                                                <Chip
                                                    onClick={() => toggleReplyForm(comment.id)}
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
                            </Card>

                            <AddReplyForm
                                parentRecordId={comment.id}
                                recordId={0}
                                onReplyAdded={handleReplyAdded}
                                user={user}
                                isActive={activeReplyFormId === comment.id}
                                onToggle={toggleReplyForm}
                            />

                        </div>
                    ))}
                </Card>
            )}
        </>
    )
}