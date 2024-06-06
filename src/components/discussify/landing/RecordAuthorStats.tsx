import {Avatar, Button, Card, CardFooter, CardHeader} from "@nextui-org/react";
import React, {useEffect, useState} from "react";
import {CardBody} from "@nextui-org/card";
import {UserResponse} from "@/boundary/interfaces/user";
import {formatDateWithoutTime} from "@/helpers/dateHelpers";
import {useAuth} from "@/hooks/useAuth";
import {toggleFollowLikeAsync} from "@/lib/services/discussify/sharedService";
import {ToggleFollowLikeRequest} from "@/boundary/interfaces/shared";
import {toast} from "react-toastify";

type RecordAuthorStatsProps = {
    uniqueId: string;
    author: UserResponse;
    userHasFollowedAuthor: boolean;
    updateAuthorFollowStatus?: (uniqueId: string,authorId: number,followed: boolean) => void;
    followButtonDisabled:boolean;
};

export const RecordAuthorStats = ({uniqueId, author, userHasFollowedAuthor,updateAuthorFollowStatus,followButtonDisabled }: RecordAuthorStatsProps) => {
    const {user} = useAuth();
    const [followStatus, setFollowStatus] = useState<{ [key: string]: boolean }>({});
     const isCurrentUser = user && user.id === author.id;

    useEffect(() => {
        if (userHasFollowedAuthor !== undefined) {
            setFollowStatus(prevState => ({
                ...prevState,
                [author.id]: userHasFollowedAuthor
            }));
        }
    }, [userHasFollowedAuthor, author.id]);

    const handleFollowToggle = async (authorId: number) => {
        try {
            const request: ToggleFollowLikeRequest = {
                recordId: author.id,
                type: "author"
            }

            const response = await toggleFollowLikeAsync(request)
            if (response.statusCode === 200) {
                toast.success(response.message);
                const followed = response.message.trim() !== "User unfollowed successfully"
                updateAuthorFollowStatus ? updateAuthorFollowStatus(uniqueId, authorId, followed) : '';
                setFollowStatus(prevState => ({
                    ...prevState,
                    [authorId]: !prevState[authorId]
                }));

                if (response.message.trim() === "User followed successfully") {
                    author.followers += 1;
                } else {
                    author.followers -= 1;
                }
            }
        } catch (error) {
            console.error('Error toggling follow:', error);
        }
    };

    return (
        <Card shadow="none" className="max-w-[300px] border-none bg-transparent">
            <CardHeader className="justify-between">
                <div className="flex gap-3">
                    <Avatar isBordered radius="sm" size="md" src={author.profileUrl || ''}/>
                    <div className="flex flex-col items-start justify-center">
                        <h4 className="text-small font-semibold leading-none text-default-600">{author.username}</h4>
                        <h5 className="text-tiny tracking-tight text-default-500">Joined {formatDateWithoutTime(author.createdAt)}</h5>
                    </div>
                </div>
                {user && !followButtonDisabled &&(
                    <>
                        {!isCurrentUser && (
                            <Button
                                className={followStatus[author.id]  ? 'bg-transparent text-foreground border-default-200' : ''}
                                color="primary"
                                radius="full"
                                size="sm"
                                variant={followStatus[author.id]  ? 'bordered' : 'solid'}
                                onPress={
                                    () => handleFollowToggle(author.id)
                                }
                            >
                                {followStatus[author.id]  ? 'Unfollow' : 'Follow'}
                            </Button>
                        )}
                    </>
                )}
            </CardHeader>
            <CardBody className="px-3 py-0">
                <table className="table table-bordered">
                    <tbody>
                    <tr className={'text-small'}>
                        <th>Posts</th>
                        <th>Reaction Score</th>
                        <th>Points Earned</th>
                    </tr>
                    <tr className={'text-center'}>
                        <td>{author.postsCount}</td>
                        <td>{author.reactionScore}</td>
                        <td>{author.pointsEarned}</td>
                    </tr>
                    </tbody>
                </table>
            </CardBody>
            <CardFooter className="gap-3">
                <div className="flex gap-1">
                    <p className="font-semibold text-default-600 text-small">{author.following}</p>
                    <p className=" text-default-500 text-small">Following</p>
                </div>
                <div className="flex gap-1">
                    <p className="font-semibold text-default-600 text-small">{author.followers}</p>
                    <p className="text-default-500 text-small">Followers</p>
                </div>
                <div className="flex gap-1">
                    <p className="font-semibold text-default-600 text-small">{author.likes}</p>
                    <p className="text-default-500 text-small">Likes</p>
                </div>
            </CardFooter>
        </Card>
    );
};
