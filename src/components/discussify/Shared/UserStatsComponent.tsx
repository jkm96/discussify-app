import {UserStats} from "@/components/discussify/landing/UserStats";
import {Link, Tooltip} from "@nextui-org/react";
import React from "react";
import {PostResponse} from "@/boundary/interfaces/post";
import {UserResponse} from "@/boundary/interfaces/user";

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