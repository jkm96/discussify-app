import {PostResponse} from "@/boundary/interfaces/post";
import {Avatar, Card, CardHeader, Link} from "@nextui-org/react";
import React from "react";
import {EditIcon} from "@nextui-org/shared-icons";
import {User} from "@/boundary/interfaces/user";
import RecordAuthorStatsComponent from "@/components/discussify/Shared/RecordAuthorStatsComponent";
import {formatDateWithYear} from "@/helpers/dateHelpers";

interface Props {
    user: User | null;
    postDetails: PostResponse;
    setShowEditPost: React.Dispatch<React.SetStateAction<boolean>>;
    updateAuthorFollowStatus: (uniqueId: string, authorId: number, followed: boolean) => void;
}

export function RenderPostAuthor({user, postDetails, setShowEditPost, updateAuthorFollowStatus}: Props) {
    return (
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
                            <RecordAuthorStatsComponent
                                uniqueId={"post"}
                                author={postDetails.user}
                                userHasFollowedAuthor={postDetails.userHasFollowedAuthor}
                                updateAuthorFollowStatus={updateAuthorFollowStatus}
                            />
                        </h4>
                        <h5 className="text-small tracking-tight text-default-400 dark:text-white">
                            <span className="mr-1">Joined {formatDateWithYear(postDetails.user.createdAt)}</span>
                            <span className="ml-1">{postDetails.user.postsCount} posts</span>
                        </h5>
                    </div>
                </div>
                <Link underline="hover"
                      className='dark:text-white text-small hover:underline cursor-pointer text-default-500'
                      onClick={() => setShowEditPost(true)}>
                    {user && (
                        <>
                            {user.username == postDetails.user.username && (
                                <EditIcon/>
                            )}
                        </>
                    )}
                </Link>
            </CardHeader>
        </Card>
    )
}