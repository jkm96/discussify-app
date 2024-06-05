import {Card, CardFooter, CardHeader, Skeleton} from "@nextui-org/react";
import {CardBody} from "@nextui-org/card";
import React, {useEffect, useState} from "react";
import {toast} from "react-toastify";
import {ForumStatsResponse} from "@/boundary/interfaces/forum";
import {getForumStatsAsync} from "@/lib/services/discussify/forumService";
import {formatDateWithYear} from "@/helpers/dateHelpers";

export const SkeletonForumStats = () => {
    return (
        <Card className="w-full" radius="sm">
            <div className="animate-pulse p-4">
                <CardHeader className="justify-between">
                    <Skeleton className="w-24 h-6"/>
                </CardHeader>
                <CardBody className="px-3 py-0">
                    <Skeleton className="w-full h-16"/>
                </CardBody>
                <CardFooter className="gap-3">
                    <Skeleton className="w-16 h-4"/>
                    <Skeleton className="w-12 h-4"/>
                    <Skeleton className="w-12 h-4"/>
                </CardFooter>
            </div>
        </Card>
    );
};

export default function ForumStats({viewType}: { viewType: string }) {
    const [forumStats, setForumStats] = useState<ForumStatsResponse>({} as ForumStatsResponse);
    const [isLoadingDetails, setIsLoadingDetails] = useState(true);
    const [isExpanded, setIsExpanded] = useState(false);

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

    const toggleExpansion = () => {
        setIsExpanded(!isExpanded);
    };

    return (
        <>
            {isLoadingDetails ? (
                <SkeletonForumStats/>
            ) : (
                <>
                    {forumStats && forumStats.forumName && forumStats.forumDescription && !isLoadingDetails && (
                        <Card className="w-full" radius='sm'>
                            <CardHeader>
                                <div className="flex gap-5">
                                    <div className="flex flex-col gap-1 items-start justify-center">
                                        <h4 className="font-semibold leading-none text-default-600">{forumStats.forumName}</h4>
                                        {viewType == 'web' && (
                                            <h5 className="text-small tracking-tight text-default-400">@{forumStats.forumName.toLowerCase()}</h5>
                                        )}
                                        {viewType == 'mobile' && (
                                            <>
                                                <div className="flex gap-2">
                                                    <div className="flex gap-1">
                                                        <p className="font-semibold ">{forumStats.posts}</p>
                                                        <p className="">posts</p>
                                                    </div>
                                                    <div className="flex gap-1">
                                                        <p className="font-semibold ">{forumStats.members}</p>
                                                        <p className="">members</p>
                                                    </div>
                                                </div>
                                            </>
                                        )}
                                    </div>
                                </div>
                            </CardHeader>
                            <CardBody className="px-3 py-0 text-small text-black dark:text-white">
                                <>
                                {viewType == 'mobile' ? (
                                    <>
                                        {!isExpanded && (
                                            <div>
                                                <p>{forumStats.forumDescription.substring(0, 100)}...
                                                    <span onClick={toggleExpansion}
                                                          className="text-blue-500 cursor-pointer hover:underline">Show More</span>
                                                </p>
                                            </div>
                                        )}
                                        {/* Hidden part - shown when expanded */}
                                        {isExpanded && (
                                            <div>
                                                <p>{forumStats.forumDescription}</p>
                                                <button onClick={toggleExpansion} className="text-blue-500 underline">Show Less</button>
                                            </div>
                                        )}
                                    </>
                                ): (
                                    <p>{forumStats.forumDescription}</p>
                                )}
                                </>
                            </CardBody>
                            {viewType == 'web' && (
                                <>
                                    <CardFooter className="gap-3 text-small text-black dark:text-white">
                                        <div className="flex gap-1">
                                            <p className="font-semibold">Since</p>
                                            <p className=" ">{formatDateWithYear(forumStats.createdAt)}</p>
                                        </div>
                                        <div className="flex gap-1">
                                            <p className="font-semibold">{forumStats.members}</p>
                                            <p className="">members</p>
                                        </div>
                                        <div className="flex gap-1">
                                            <p className="font-semibold">{forumStats.posts}</p>
                                            <p className="">posts</p>
                                        </div>
                                    </CardFooter>
                                </>
                            )}
                        </Card>
                    )}
                </>
            )}
        </>
    )
}