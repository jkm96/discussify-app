import {Card, CardFooter, CardHeader, CircularProgress} from "@nextui-org/react";
import {CardBody} from "@nextui-org/card";
import React, {useEffect, useState} from "react";
import {getPostDetailsAsync} from "@/lib/services/discussify/postService";
import {EditPostRequest, PostResponse} from "@/boundary/interfaces/post";
import {toast} from "react-toastify";
import {ForumStatsResponse} from "@/boundary/interfaces/forum";
import {getForumStatsAsync} from "@/lib/services/discussify/forumService";
import {formatDateWithYear} from "@/helpers/dateHelpers";

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
                <>
                    <div className={'grid place-items-center'}>
                        <CircularProgress color={'primary'} className={'p-4'}/>
                    </div>
                </>
            ) : (
                <>
                    {forumStats && !isLoadingDetails && (
                        <Card className="w-full" radius='sm'>
                            <CardHeader className="justify-between">
                            <div className="flex gap-5">
                                    <div className="flex flex-col gap-1 items-start justify-center">
                                        <h4 className="font-semibold leading-none text-default-600">{forumStats.forumName}</h4>
                                        <h5 className="text-small tracking-tight text-default-400">@{forumStats.forumName.toLowerCase()}</h5>
                                    </div>
                                </div>
                            </CardHeader>
                            <CardBody className="px-3 py-0 text-small text-default-400">
                                <p>{forumStats.forumDescription}</p>
                            </CardBody>
                            <CardFooter className="gap-3 dark:text-white">
                                <div className="flex gap-1">
                                    <p className="font-semibold text-default-400 dark:text-white text-small">Since</p>
                                    <p className=" text-default-400 dark:text-white text-small">{formatDateWithYear(forumStats.createdAt)}</p>
                                </div>
                                <div className="flex gap-1">
                                    <p className="font-semibold text-default-400 dark:text-white text-small">{forumStats.members}</p>
                                    <p className="text-default-400 dark:text-white text-small">members</p>
                                </div>
                                <div className="flex gap-1">
                                    <p className="font-semibold text-default-400 dark:text-white text-small">{forumStats.posts}</p>
                                    <p className="text-default-400 dark:text-white text-small">posts</p>
                                </div>
                            </CardFooter>
                        </Card>
                    )}
                </>
            )}
        </>
    )
}