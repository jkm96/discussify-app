import React, {useState} from 'react';
import {Avatar, Card, CardBody, CardFooter, CardHeader, Chip, CircularProgress, Link} from '@nextui-org/react';
import DOMPurify from 'dompurify';
import EditReplyForm from './EditReplyForm';
import AddReplyForm from './AddReplyForm';
import RecordAuthorStatsComponent from "@/components/discussify/Shared/RecordAuthorStatsComponent";
import {CommentResponse} from "@/boundary/interfaces/comment";
import {User} from "@/boundary/interfaces/user";
import {formatDateWithoutTime, formatDateWithYear} from "@/helpers/dateHelpers";
import {EditIcon} from "@nextui-org/shared-icons";
import {LikeIcon, TimerIcon} from "@/components/shared/icons/LikeIcon";
import {ReplyIcon} from "@/components/shared/icons/ReplyIcon";
import ShareIcon from "@/components/shared/icons/ShareIcon";
import {PostRepliesQueryParameters} from "@/boundary/parameters/postRepliesQueryParameters";
import {getRepliesAsync} from "@/lib/services/discussify/commentService";

interface RecursiveCommentProps {
    comment: CommentResponse;
    user: User | null;
    sortBy: string;
    editCommentFormState: Record<string, { isVisible: boolean }>;
    toggleEditFormVisibility: (postId: number) => void;
    handleCommentEdited: (commentId: number, description: string) => void;
    toggleReplyForm: (id: number) => void;
    activeReplyFormId: number | null;
    handleReplyAdded: (commentId: number, description: string) => void;
}

const RecursiveComment = ({ comment, user,sortBy, editCommentFormState, toggleEditFormVisibility, handleCommentEdited, toggleReplyForm, activeReplyFormId, handleReplyAdded }:RecursiveCommentProps) => {
    const [replies, setReplies] = useState<CommentResponse[]>([]);
    const [isLoadingReplies, setIsLoadingReplies] = useState(false);
    const [repliesLoaded, setRepliesLoaded] = useState(false);

    const handleLoadReplies = async () => {
        setIsLoadingReplies(true);
        try {
            const params = new PostRepliesQueryParameters();
            const response = await getRepliesAsync(comment.id,{...params,sortBy:sortBy});
            if (response.statusCode === 200) {
                const parsedData = response.data;
                const {data, pagingMetaData} = parsedData;
                setReplies(data);
                setRepliesLoaded(true);
            }
        } catch (error) {
            console.error('Error fetching replies:', error);
        } finally {
            setIsLoadingReplies(false);
        }
    };

    const handleReplyEdited = (commentId:number, description:string) => {
        setReplies((prevReplies) => prevReplies.map((reply) => reply.id === commentId ? { ...reply, description } : reply));
        handleCommentEdited(commentId, description);
    };

    const handleReplyAddedWithReload = (commentId:number, description:string) => {
        handleReplyAdded(commentId,description)
        handleLoadReplies();
    };

    return (
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
                                <div className="flex flex-col gap-1 items-start justify-center">
                                    <h4 className="text-small font-semibold leading-none text-default-600">
                                        <RecordAuthorStatsComponent key={comment.id}
                                                                    uniqueId={'post-reply'}
                                                                    author={comment.user}
                                                                    userHasFollowedAuthor={false}
                                                                    followButtonDisabled={true}
                                        />
                                    </h4>
                                    <h5 className="text-small dark:text-white text-default-400">
                                        <span className="mr-1">Joined {formatDateWithYear(comment.user.createdAt)}</span>
                                        <span className="ml-1">{comment.user.postsCount} posts</span>
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
                        <span className='text-small'>{formatDateWithoutTime(comment.createdAt)}</span>
                    </p>

                    {editCommentFormState[comment.id]?.isVisible ? (
                        <>
                            <EditReplyForm
                                initialData={comment.description}
                                parentRecordId={comment.id}
                                recordId={comment.id}
                                onCommentEdited={handleReplyEdited}
                                user={user}
                                onToggle={() => toggleEditFormVisibility(comment.id)}
                                isActive={editCommentFormState[comment.id]?.isVisible}
                            />
                        </>
                    ) : (
                        <>
                            <p dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(comment.description)}}/>
                        </>
                    )}

                </CardBody>

                <CardFooter className="pt-0 text-default-400 text-small dark:text-white justify-between">
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
                {!repliesLoaded && comment.repliesCount > 0 && (
                    <div className='flex items-center justify-center mb-1'>
                        <Link  size='sm' className='cursor-pointer hover:underline dark:text-white text-black'  onClick={handleLoadReplies}>
                            {isLoadingReplies ? <CircularProgress/> : 'Load Replies'}
                        </Link>
                    </div>
                )}
            </Card>

            <AddReplyForm
                parentRecordId={comment.id}
                recordId={0}
                onReplyAdded={handleReplyAddedWithReload}
                user={user}
                isActive={activeReplyFormId === comment.id}
                onToggle={() => toggleReplyForm(comment.id)}
            />

            {/* Replies */}
            {repliesLoaded && (
                <div className='mt-2 mb-2 ml-2 border-l-2 border-l-yellow-500'>
                    {replies.map(reply => (
                        <RecursiveComment
                            key={reply.id}
                            comment={reply}
                            user={user}
                            sortBy={sortBy}
                            editCommentFormState={editCommentFormState}
                            toggleEditFormVisibility={toggleEditFormVisibility}
                            handleCommentEdited={handleReplyEdited}
                            toggleReplyForm={toggleReplyForm}
                            activeReplyFormId={activeReplyFormId}
                            handleReplyAdded={handleReplyAddedWithReload}
                        />
                    ))}
                </div>
            )}

        </div>
    );
};

export default RecursiveComment;