import React, {useState} from 'react';
import {toast} from 'react-toastify';
import {upsertReplyAsync} from "@/lib/services/discussify/commentService";
import dynamic from "next/dynamic";
import {Button} from "@nextui-org/react";
import {User} from "@/boundary/interfaces/user";
import {UpsertReplyRequest} from "@/boundary/interfaces/comment";
import Spinner from "@/components/shared/icons/Spinner";

const initialComment:UpsertReplyRequest = {command: 1, description: '', parentRecordId: null, recordId: null };

const CustomEditor = dynamic(() => {
    return import( '@/components/ckeditor5/custom-editor' );
}, {ssr: false});

interface EditReplyFormProps {
    initialData: string;
    isActive: boolean;
    onToggle: (isActive: boolean) => void;
    recordId: number;
    parentRecordId: number | null;
    onCommentEdited: (commentId: number, description: string) => void;
    user: User | null;
}
const EditReplyForm = ({ initialData,parentRecordId, recordId, onCommentEdited, user, isActive, onToggle }:EditReplyFormProps) => {
    const [editReplyRequest, setEditReplyRequest] = useState({
        ...initialComment,
        description: initialData || '',
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleEditReplyEditorChange = (data:any) => {
        setEditReplyRequest({ ...editReplyRequest, description: data });
    };

    const handleEditReply = async (e:any) => {
        e.preventDefault();
        setIsSubmitting(true);
        const comment = editReplyRequest.description;
        if (!comment || comment.trim() === '') {
            toast.error("Please enter a valid message");
            setIsSubmitting(false);
            return;
        }
        const requestPayload = { ...editReplyRequest, recordId, parentRecordId };
        const response = await upsertReplyAsync(requestPayload);
        if (response.statusCode === 200) {
            toast.success(response.message);
            onToggle(false); // Close the form
            setEditReplyRequest(initialComment);
            onCommentEdited(recordId, comment);
        } else {
            toast.error(response.message ?? 'Unknown error occurred');
        }
        setIsSubmitting(false);
    };

    return (
        <>
            {isActive && (
                <div>
                    <CustomEditor
                        initialData={editReplyRequest.description || ''}
                        onChange={handleEditReplyEditorChange}
                    />
                    <div className="flex gap-2 mt-2">
                        <Button
                            color='primary'
                            type='submit'
                            size='sm'
                            isLoading={isSubmitting}
                            spinner={<Spinner/>}
                            onClick={handleEditReply}
                        >
                            {isSubmitting ? 'Submitting...' : 'Update'}
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

export default EditReplyForm;
