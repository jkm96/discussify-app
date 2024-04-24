import {PostResponse} from "@/boundary/interfaces/post";
import {Card, CardFooter, CardHeader, Chip} from "@nextui-org/react";
import React from "react";
import {convertStringToList} from "@/helpers/stylingHelpers";
import {EditIcon} from "@nextui-org/shared-icons";
import TagsIcon from "@/components/shared/icons/TagsIcon";
import {formatDateWithoutTime} from "@/helpers/dateHelpers";
import TimerIcon from "@/components/shared/icons/TimerIcon";

export function RenderPostTitle({postDetails}: { postDetails: PostResponse }) {
    return (
        <Card className="w-full pb-0 pl-0"
              shadow={"none"}
              radius={"none"}>
            <CardHeader className="justify-between">
                <div className="gap-5">
                    <div className="flex flex-col gap-1 items-start justify-center">
                        <h4 className="font-semibold leading-none">
                            {postDetails.title}
                        </h4>
                    </div>
                    {postDetails.tags && (
                        <div className='flex mt-2'>
                            <TagsIcon/>
                            {convertStringToList(postDetails.tags).map((tag) => (
                                <Chip key={tag}
                                      className={'mr-1 p-0 h-5'}
                                      radius={'none'}>
                                    {tag}
                                </Chip>
                            ))}
                        </div>
                    )}
                </div>
            </CardHeader>
            <CardFooter className="gap-3">
                <div className="flex gap-1">
                    <p className="font-bold text-small">
                       <TimerIcon/>
                    </p>
                    <p className=" text-default-400 text-small">{formatDateWithoutTime(postDetails.createdAt)}</p>
                </div>
                <div className="flex gap-1">
                    <p className="font-semibold text-default-400 text-small">97.1K</p>
                    <p className="text-default-400 text-small">views</p>
                </div>
                <div className="flex gap-1">
                    <p className="font-semibold text-default-400 text-small">97.1K</p>
                    <p className="text-default-400 text-small">replies</p>
                </div>
                <div className="flex gap-1">
                    <p className="font-semibold text-default-400 text-small">97.1K</p>
                    <p className="text-default-400 text-small">participants</p>
                </div>
            </CardFooter>
        </Card>
    );
}