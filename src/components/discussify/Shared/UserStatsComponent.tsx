import {UserStats} from "@/components/discussify/landing/UserStats";
import {Link, Tooltip} from "@nextui-org/react";
import React from "react";
import {UserResponse} from "@/boundary/interfaces/user";
import {formatDateWithoutTime, formatDateWithTime} from "@/helpers/dateHelpers";

export default function UserStatsComponent({author,className}:{author:UserResponse,className:string}) {

    return(
        <Tooltip content={<UserStats user={author}/>}
                 placement="top"
        >
            <Link href={""} underline="hover"
                  size={'sm'}
                  className={className}>
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