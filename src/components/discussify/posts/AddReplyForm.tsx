import React, { useState } from 'react';
import { toast } from 'react-toastify';
import {addCommentAsync, upsertReplyAsync} from "@/lib/services/discussify/commentService";
import dynamic from "next/dynamic";
import {Button, Spinner} from "@nextui-org/react";
import {User} from "@/boundary/interfaces/user";
import {UpsertReplyRequest} from "@/boundary/interfaces/comment";

const initialComment:UpsertReplyRequest = {command: 0, description: '', parentRecordId: null, recordId: null };

const CustomEditor = dynamic(() => {
    return import( '@/components/ckeditor5/custom-editor' );
}, {ssr: false});

interface AddReplyFormProps {
    isActive: boolean;
    onToggle: (isActive: boolean) => void;
    recordId: number;
    parentRecordId: number | null;
    onReplyAdded: (commentId: number, description: string) => void;
    user: User | null;
}
const AddReplyForm = ({ parentRecordId, recordId, onReplyAdded, user, isActive, onToggle }:AddReplyFormProps) => {
    const [upsertReplyRequest, setUpsertReplyRequest] = useState(initialComment);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleAddPostReplyCommentEditorChange = (data:any) => {
        setUpsertReplyRequest({ ...upsertReplyRequest, description: data });
    };

    const handleAddComment = async (e:any) => {
        e.preventDefault();
        setIsSubmitting(true);
        const comment = upsertReplyRequest.description;
        if (!comment || comment.trim() === '') {
            toast.error("Please enter a valid message");
            setIsSubmitting(false);
            return;
        }
        const requestPayload = { ...upsertReplyRequest, recordId, parentRecordId };
        const response = await upsertReplyAsync(requestPayload);
        if (response.statusCode === 200) {
            toast.success(response.message);
            onToggle(false); // Close the form
            setUpsertReplyRequest(initialComment);
            onReplyAdded(recordId,upsertReplyRequest.description);
        } else {
            toast.error(response.message ?? 'Unknown error occurred');
        }
        setIsSubmitting(false);
    };

    return (
        <>
            {isActive && (
                <div className='m-2'>
                    <CustomEditor
                        initialData={upsertReplyRequest.description || ''}
                        onChange={handleAddPostReplyCommentEditorChange}
                    />
                    <div className="flex gap-2 mt-2">
                        <Button
                            color='primary'
                            type='submit'
                            size={'sm'}
                            isLoading={isSubmitting}
                            spinner={<Spinner />}
                            onClick={handleAddComment}
                        >
                            {isSubmitting ? 'Submitting...' : 'Post Comment'}
                        </Button>
                        <Button
                            color='default'
                            type='button'
                            size={'sm'}
                            onClick={() => onToggle(false)}
                        >
                            Cancel
                        </Button>
                    </div>
                </div>
            )}
        </>
    );
};

export default AddReplyForm;
