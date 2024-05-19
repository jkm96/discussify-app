import {Card, CardFooter, CardHeader, Skeleton} from "@nextui-org/react";
import {CardBody} from "@nextui-org/card";
import React, {useEffect, useState} from "react";
import {toast} from "react-toastify";
import {ForumStatsResponse} from "@/boundary/interfaces/forum";
import {getForumStatsAsync} from "@/lib/services/discussify/forumService";
import {formatDateWithYear} from "@/helpers/dateHelpers";
import {count} from "@ckeditor/ckeditor5-utils";

export const SkeletonForumStats = () => {
    return (
        <Card className="w-full" radius="sm">
            <div className="animate-pulse p-4">
                <CardHeader className="justify-between">
                    <Skeleton className="w-24 h-6" />
                </CardHeader>
                <CardBody className="px-3 py-0">
                    <Skeleton className="w-full h-16" />
                </CardBody>
                <CardFooter className="gap-3">
                    <Skeleton className="w-16 h-4" />
                    <Skeleton className="w-12 h-4" />
                    <Skeleton className="w-12 h-4" />
                </CardFooter>
            </div>
        </Card>
    );
};

export default function ForumStats() {
    const [forumStats, setForumStats] = useState<ForumStatsResponse>({} as ForumStatsResponse);
    const [isLoadingDetails, setIsLoadingDetails] = useState(true);

    const fetchForumStats = async () => {
        setIsLoadingDetails(true);
        await getForumStatsAsync()
            .then((response) => {
                if (response.statusCode === 200) {
                    const forumStats: ForumStatsResponse = response.data;
                    setForumStats(forumStats);
                }
            })
            .catch((error) => {
                toast.error(`Error fetching forum stats: ${error}`);
            })
            .finally(() => {
                setIsLoadingDetails(false);
            });
    };

    useEffect(() => {
        fetchForumStats();
    }, []);

    return (
        <>
            {isLoadingDetails ? (
                <SkeletonForumStats />
            ) : (
                <>
                    {forumStats && forumStats.forumName && forumStats.forumDescription && !isLoadingDetails && (
                        <Card className="w-full" radius='sm'>
                            <CardHeader className="justify-between">
                            <div className="flex gap-5">
                                    <div className="flex flex-col gap-1 items-start justify-center">
                                        <h4 className="font-semibold leading-none text-default-600">{forumStats.forumName}</h4>
                                        <h5 className="text-small tracking-tight text-default-400">@{forumStats.forumName.toLowerCase()}</h5>
                                    </div>
                                </div>
                            </CardHeader>
                            <CardBody className="px-3 py-0 text-small text-black dark:text-white">
                                <p>{forumStats.forumDescription}</p>
                            </CardBody>
                            <CardFooter className="gap-3 text-small text-black dark:text-white">
                                <div className="flex gap-1">
                                    <p className="font-semibold">Since</p>
                                    <p className=" ">{formatDateWithYear(forumStats.createdAt)}</p>
                                </div>
                                <div className="flex gap-1">
                                    <p className="font-semibold ">{forumStats.members}</p>
                                    <p className="">members</p>
                                </div>
                                <div className="flex gap-1">
                                    <p className="font-semibold ">{forumStats.posts}</p>
                                    <p className="">posts</p>
                                </div>
                            </CardFooter>
                        </Card>
                    )}
                </>
            )}
        </>
    )
}