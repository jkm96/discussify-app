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
import RecursiveComment from "@/components/discussify/posts/NestedCommentComponent";

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

    const handleReplyAdded = (commentId: number, description: string) => {
       if (activeReplyFormId == commentId){
           fetchComments(postReplyId);
       }
    };

    const handleCommentEdited = (commentId: number, description: string) => {
        setCommentResponse(prevComments =>
            prevComments.map(comment =>
                comment.id === commentId ? { ...comment, description } : comment
            )
        );
        // Set edit form visibility to false for the edited comment
        setEditCommentFormState(prevState => ({
            ...prevState,
            [commentId]: {
                isVisible: false
            }
        }));
    };

    return (
        <>
            {isLoadingComments ? (
                <div className='grid place-items-center'>
                    <CircularProgress color='primary' className='p-4' label='Loading comments...'/>
                </div>
            ) : (
                <div className='mt-2 border-l-2 border-l-yellow-500 bg-grey-200 dark:bg-boxdark-2'>
                    {commentResponse.map((comment) => (
                        <RecursiveComment
                            key={comment.id}
                            comment={comment}
                            user={user}
                            sortBy={sortBy}
                            editCommentFormState={editCommentFormState}
                            toggleEditFormVisibility={toggleEditFormVisibility}
                            handleCommentEdited={handleCommentEdited}
                            toggleReplyForm={toggleReplyForm}
                            activeReplyFormId={activeReplyFormId}
                            handleReplyAdded={handleReplyAdded}
                        />
                    ))}
                </div>
            )}
        </>
    )
}