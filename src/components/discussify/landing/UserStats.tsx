import {Avatar, Button, Card, CardFooter, CardHeader} from "@nextui-org/react";
import React from "react";
import {CardBody} from "@nextui-org/card";
import {UserResponse} from "@/boundary/interfaces/user";
import {formatDateWithoutTime} from "@/helpers/dateHelpers";

export const UserStats = ({user}:{user:UserResponse}) => {
    const [isFollowed, setIsFollowed] = React.useState(false);

    return (
        <Card shadow="none" className="max-w-[300px] border-none bg-transparent">
            <CardHeader className="justify-between">
                <div className="flex gap-3">
                    <Avatar isBordered radius="sm" size="md" src={user.profileUrl || ''} />
                    <div className="flex flex-col items-start justify-center">
                        <h4 className="text-small font-semibold leading-none text-default-600">{user.username}</h4>
                        <h5 className="text-tiny tracking-tight text-default-500">Joined {formatDateWithoutTime(user.createdAt)}</h5>
                    </div>
                </div>
                <Button
                    className={isFollowed ? "bg-transparent text-foreground border-default-200" : ""}
                    color="primary"
                    radius="full"
                    size="sm"
                    variant={isFollowed ? "bordered" : "solid"}
                    onPress={() => setIsFollowed(!isFollowed)}
                >
                    {isFollowed ? "Unfollow" : "Follow"}
                </Button>
            </CardHeader>
            <CardBody className="px-3 py-0">
                <table className="table table-bordered">
                    <tbody>
                    <tr className={'text-small'}>
                        <th>Post Count</th>
                        <th>Reaction Score</th>
                        <th>Points Earned</th>
                    </tr>
                    <tr className={'text-center'}>
                        <td>{user.postsCount}</td>
                        <td>{user.reactionScore}</td>
                        <td>{user.pointsEarned}</td>
                    </tr>
                    </tbody>
                </table>
            </CardBody>
            <CardFooter className="gap-3">
                <div className="flex gap-1">
                    <p className="font-semibold text-default-600 text-small">4</p>
                    <p className=" text-default-500 text-small">Following</p>
                </div>
                <div className="flex gap-1">
                    <p className="font-semibold text-default-600 text-small">97.1K</p>
                    <p className="text-default-500 text-small">Followers</p>
                </div>
                <div className="flex gap-1">
                    <p className="font-semibold text-default-600 text-small">97.1K</p>
                    <p className="text-default-500 text-small">Likes</p>
                </div>
            </CardFooter>
        </Card>
    );
};
