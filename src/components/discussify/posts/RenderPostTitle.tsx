import {EditPostRequest, PostResponse} from "@/boundary/interfaces/post";
import {Card, CardFooter, CardHeader, Chip, Input, Link} from "@nextui-org/react";
import React, {useState} from "react";
import {convertStringToList} from "@/helpers/stylingHelpers";
import TagsIcon from "@/components/shared/icons/TagsIcon";
import {formatDateWithoutTime} from "@/helpers/dateHelpers";
import {CommentIcon, EyeIcon, PeopleIcon, TimerIcon} from "@/components/shared/icons/LikeIcon";
import {EditIcon} from "@nextui-org/shared-icons";
import {User} from "@/boundary/interfaces/user";
import {toast} from "react-toastify";
import {editPostAsync} from "@/lib/services/discussify/postService";

export function RenderPostTitle({user, postDetails}: { user: User | null, postDetails: PostResponse }) {
    const [showEditTitle, setShowEditTitle] = useState(false);
    const [newTitle, setNewTitle] = useState(postDetails.title);
    const [showEditTags, setShowEditTags] = useState(false);
    const [newTags, setNewTags] = useState(postDetails.tags);
    const [inputTitleErrors, setInputTitleErrors] = useState('');
    const [inputTagsErrors, setInputTagsErrors] = useState('');

    const handleEditPostTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewTitle(e.target.value); // Update the edited title as the user types
    };

    const handleEditPostTitle = async (e: any) => {
        e.preventDefault();
        const newTitle = e.target.value;
        if (newTitle === null || newTitle === '') {
            setInputTitleErrors(inputTitleErrors);
            return;
        }
        const editTitle:EditPostRequest = {
            type:"title",
            description: postDetails.description,
            postId: postDetails.id,
            title: newTitle,
            tags: postDetails.tags
        }
        const response = await editPostAsync(editTitle);
        if (response.statusCode === 200) {
            toast.success(response.message);
            setShowEditTitle(false)
            postDetails.title = newTitle;
        } else {
            toast.error(response.message ?? 'Unknown error occurred');
        }
    };

    const handleEditTagsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewTags(e.target.value);
    };

    const handleEditTags = async (e: any) => {
        e.preventDefault();
        const newTags = e.target.value;
        if (newTags === null || newTags === '') {
            setInputTagsErrors(inputTagsErrors);
            return;
        }
        const editTags:EditPostRequest = {
            type:"tags",
            description: postDetails.description,
            postId: postDetails.id,
            title: postDetails.title,
            tags: newTags
        }
        const response = await editPostAsync(editTags);
        if (response.statusCode === 200) {
            toast.success(response.message);
            setShowEditTags(false)
            postDetails.tags = newTags;
        } else {
            toast.error(response.message ?? 'Unknown error occurred');
        }
    };

    return (
        <Card className="w-full pb-0 pl-0"
              shadow={"none"}
              radius={"none"}>
            <CardHeader className="justify-between pl-0">
                <div className="gap-5 w-full">
                    <div className="flex justify-between items-center gap-1">
                        <div className="justify-start font-semibold leading-none w-1/2">

                            {showEditTitle ? (
                                <>
                                    <Input
                                        labelPlacement={'outside'}
                                        name='tags'
                                        variant='underlined'
                                        value={newTitle}
                                        description={'Hit enter to save changes'}
                                        isInvalid={inputTitleErrors !== ''}
                                        errorMessage={inputTitleErrors}
                                        onChange={handleEditPostTitleChange}
                                        onKeyDown={(e) => {
                                            if (e.key === 'Enter') {
                                                handleEditPostTitle(e);
                                            }
                                        }}/>
                                </>
                            ) : (
                                <h4>{postDetails.title}</h4>
                            )}
                        </div>
                        <div className='flex justify-end w-1/2'>
                            {user && (
                                <>
                                    {user.username == postDetails.user.username && (
                                        <Link underline="hover"
                                              className='dark:text-white text-small hover:underline cursor-pointer text-default-500'
                                              onClick={() => setShowEditTitle(true)}>
                                            <EditIcon/>
                                        </Link>
                                    )}
                                </>
                            )}
                        </div>
                    </div>
                    {postDetails.tags && (
                        <div className='flex mt-2'>
                            {showEditTags ? (
                                <Input
                                    labelPlacement="outside"
                                    name="tags"
                                    variant="underlined"
                                    value={newTags}
                                    description="Multiple tags can be separeted by a comma. Hit enter to save changes"
                                    isInvalid={inputTagsErrors !== ''}
                                    errorMessage={inputTagsErrors}
                                    onChange={handleEditTagsChange}
                                    onKeyDown={(e) => {
                                        if (e.key === 'Enter') {
                                            handleEditTags(e);
                                        }
                                    }}
                                />
                            ) : (
                                <>
                                    <span onClick={()=>setShowEditTags(true)}>
                                        <TagsIcon/>
                                    </span>
                                    {convertStringToList(postDetails.tags).map((tag) => (
                                        <Chip key={tag}
                                              className={'mr-1 p-0 h-5'}
                                              radius={'none'}>
                                            {tag}
                                        </Chip>
                                    ))}
                                </>
                            )}

                        </div>
                    )}
                </div>
            </CardHeader>
            <CardFooter className="gap-3 pl-0 text-default-400 text-small dark:text-white">
                <div className="flex gap-1">
                    <p className="font-bold text-small">
                        <TimerIcon width={15} height={20}/>
                    </p>
                    <p className=" text-small">{formatDateWithoutTime(postDetails.createdAt)}</p>
                </div>
                <div className="flex gap-1">
                    <p className="font-semibold text-small">
                        <EyeIcon width={15} height={20}/>
                    </p>
                    <p className="">{postDetails.views} views</p>
                </div>
                <div className="flex gap-1">
                    <p className="font-semibold text-small">
                        <CommentIcon width={15} height={20}/>
                    </p>
                    <p className="">{postDetails.postRepliesCount} replies</p>
                </div>
                <div className="flex gap-1">
                    <p className="font-semibold text-small">
                        <PeopleIcon width={15} height={20}/>
                    </p>
                    <p className="">{postDetails.participants} participants</p>
                </div>
            </CardFooter>
        </Card>
    );
}