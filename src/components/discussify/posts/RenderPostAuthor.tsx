import {PostResponse} from "@/boundary/interfaces/post";
import {Avatar, Card, CardHeader} from "@nextui-org/react";
import React from "react";
import {VerticalDotsIcon} from "@/components/shared/icons/VerticalDotsIcon";
import {EditIcon} from "@nextui-org/shared-icons";

export function RenderPostAuthor({postDetails}: { postDetails: PostResponse }) {
    return <Card className="w-full"
                 shadow={"none"}
                 radius={"none"}>
        <CardHeader className="justify-between">
            <div className="flex gap-5">
                <Avatar isBordered radius="sm" size="md" name={"T"}/>
                <div className="flex flex-col gap-1 items-start justify-center">
                    <h4 className="text-small font-semibold leading-none text-default-600">
                        {postDetails.user.username}
                    </h4>
                    <h5 className="text-small tracking-tight text-default-400">
                        <span className="mr-1">Joined 2025</span>
                        <span className="ml-1">10 posts</span>
                    </h5>
                </div>
            </div>
            <span>
                <EditIcon/>
            </span>
        </CardHeader>
    </Card>;
}