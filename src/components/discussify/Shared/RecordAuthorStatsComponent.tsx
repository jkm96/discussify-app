import {RecordAuthorStats} from "@/components/discussify/landing/RecordAuthorStats";
import {Link, Tooltip} from "@nextui-org/react";
import React from "react";
import {UserResponse} from "@/boundary/interfaces/user";
import {formatDateWithoutTime, formatDateWithTime} from "@/helpers/dateHelpers";

type RecordAuthorStatsProps = {
    uniqueId: string;
    author: UserResponse;
    userHasFollowedAuthor: boolean;
    updateAuthorFollowStatus?: (uniqueId: string,authorId: number,followed: boolean) => void;
    followButtonDisabled:boolean;
};

export default function RecordAuthorStatsComponent({uniqueId,author,userHasFollowedAuthor,updateAuthorFollowStatus,followButtonDisabled}:RecordAuthorStatsProps) {

    return(
        <Tooltip
            placement="top"
            content={<RecordAuthorStats
            uniqueId={uniqueId}
            author={author}
            userHasFollowedAuthor={userHasFollowedAuthor}
            updateAuthorFollowStatus={updateAuthorFollowStatus}
            followButtonDisabled={followButtonDisabled}
        />}
        >
            <Link underline="hover"
                  size={'sm'}
                  className='dark:text-white text-default-500 mr-1 cursor-pointer'>
                {author.username}
            </Link>
        </Tooltip>
    )
}

export function CreatedAtCard({createdAt}:{createdAt:string}) {
    return(
        <Tooltip
            content={formatDateWithTime(createdAt)}
            placement="top">
            <span
                className='dark:text-white text-tiny text-default-500 ml-1 mr-1 hover:underline cursor-pointer'>
                {formatDateWithoutTime(createdAt)}
            </span>
        </Tooltip>
    )
}