'use client';

import {CircularProgress} from "@nextui-org/react";
import React, {useEffect, useState} from "react";
import {getCommentsAsync} from "@/lib/services/discussify/commentService";
import {toast} from "react-toastify";
import {CommentResponse} from "@/boundary/interfaces/comment";
import {PostRepliesQueryParameters} from "@/boundary/parameters/postRepliesQueryParameters";
import {User} from "@/boundary/interfaces/user";
import RenderRecursiveComments from "@/components/discussify/posts/RenderRecursiveComments";

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
            [postId]: {isVisible: !prevState[postId]?.isVisible}
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
        if (activeReplyFormId == commentId) {
            fetchComments(postReplyId);
        }
    };

    const handleCommentEdited = (commentId: number, description: string) => {
        setCommentResponse(prevComments =>
            prevComments.map(comment =>
                comment.id === commentId ? {...comment, description} : comment
            )
        );
        // Set edit form visibility to false for the edited comment
        setEditCommentFormState(prevState => ({
            ...prevState,
            [commentId]: {isVisible: false}
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
                        <RenderRecursiveComments
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