'use client';

import React, {useEffect, useState} from "react";
import {CategoryResponse} from "@/boundary/interfaces/category";
import {toast} from "react-toastify";
import {getCategoriesWithForumsAsync} from "@/lib/services/discussify/categoryService";
import {Avatar, Card, CardBody, CardFooter, CardHeader, Chip, CircularProgress, Link} from "@nextui-org/react";
import useClientMediaQuery from "@/hooks/useClientMediaQuery";
import ForumStats from "@/components/discussify/landing/ForumStats";
import {NAVIGATION_LINKS} from "@/boundary/configs/navigationConfig";
import {formatDateWithTime} from "@/helpers/dateHelpers";
import {CommentIcon, EyeIcon, PeopleIcon} from "@/components/shared/icons/LikeIcon";
import RecordAuthorStatsComponent from "@/components/discussify/Shared/RecordAuthorStatsComponent";

export function CategoriesOverview() {
    const {matches: isMediumOrLarger} = useClientMediaQuery('(min-width: 768px)');
    const [categoryDetails, setCategoryDetails] = useState<CategoryResponse[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    const fetchForum = async () => {
        setIsLoading(true);
        await getCategoriesWithForumsAsync()
            .then((response) => {
                if (response.statusCode === 200) {
                    setCategoryDetails(response.data);
                }
            })
            .catch((error) => {
                toast.error(`Error fetching forum categories: ${error}`);
            })
            .finally(() => {
                setIsLoading(false);
            });
    };

    useEffect(() => {
        fetchForum();
    }, []);

    return (
        <>
            <div className="flex w-full h-full mt-2.5 mb-5">
                <div className="md:w-10/12 md:mr-4 w-full ml-1 mr-1">
                    {isLoading ? (
                        <div className='grid place-items-center'>
                            <CircularProgress color='primary' className='p-4' label='Loading forums...'/>
                        </div>
                    ) : (
                        <>
                            {categoryDetails.length < 1 ? (
                                <>
                                    <div className='text-center'>
                                        <p className='text-danger-400'>No forums found!</p>
                                    </div>
                                </>
                            ) : (
                                <>
                                    {categoryDetails.map((category) => (
                                        <Card key={category.id} className="w-full mb-2">
                                            <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
                                                <h4 className="font-bold">{category.name}</h4>
                                            </CardHeader>

                                            <CardBody>
                                                {category.forums.map((categoryForum) => (
                                                    <Card key={categoryForum.id} className="w-full mb-2">
                                                        <CardBody className="flex gap-4">
                                                            <div className="flex gap-4">
                                                                <div
                                                                    className={categoryForum.latestPost ? 'w-2/3' : 'w-full'}>
                                                                    <h4 className="font-bold">
                                                                        <Link key={categoryForum.id}
                                                                              underline="hover"
                                                                              className='dark:text-white cursor-pointer'
                                                                              href={`${NAVIGATION_LINKS.FORUM_OVERVIEW}/${categoryForum.slug}`}>
                                                                            {categoryForum.title}
                                                                        </Link>
                                                                    </h4>

                                                                    <span className={isMediumOrLarger ? '':'text-small'}>{categoryForum.description}</span>

                                                                    {!isMediumOrLarger && (
                                                                        <div>
                                                                            <Chip
                                                                                startContent={<EyeIcon width={15}/>}
                                                                                variant="light"
                                                                                color="default"
                                                                                radius='sm'
                                                                                size='sm'
                                                                            >
                                                                                {categoryForum.views}
                                                                            </Chip>

                                                                            <Chip
                                                                                startContent={<CommentIcon width={15}/>}
                                                                                variant="light"
                                                                                color="default"
                                                                                radius='sm'
                                                                                size='sm'
                                                                            >
                                                                                {categoryForum.postCount}
                                                                            </Chip>

                                                                            <Chip
                                                                                startContent={<PeopleIcon width={15}/>}
                                                                                variant="light"
                                                                                color="default"
                                                                                radius='sm'
                                                                                size='sm'
                                                                            >
                                                                                2k
                                                                            </Chip>
                                                                        </div>
                                                                    )}
                                                                </div>

                                                                {isMediumOrLarger && (
                                                                    <div
                                                                        className="flex w-1/3 items-center justify-items-center">
                                                                        <div
                                                                            className="grid grid-rows-2 grid-flow-col w-full justify-items-center">
                                                                            <div
                                                                                className='justify-items-end'>Threads
                                                                            </div>
                                                                            <div>2k</div>
                                                                            <div
                                                                                className='justify-items-start'>Messages
                                                                            </div>
                                                                            <div>4k</div>
                                                                            <div
                                                                                className='justify-items-end'>Views
                                                                            </div>
                                                                            <div>2k</div>
                                                                        </div>
                                                                    </div>
                                                                )}

                                                                {categoryForum.latestPost && (
                                                                    <div
                                                                        className="flex w-1/3 justify-items-center">

                                                                        <div
                                                                            className={`flex flex-col mr-3 ${isMediumOrLarger ? 'items-center' : 'items-end w-full'}`}>
                                                                            <Avatar
                                                                                alt={categoryForum.title}
                                                                                className="ml-1"
                                                                                src={categoryForum.latestPost.user.profileUrl || ''}
                                                                                size='md'
                                                                                isBordered={true}
                                                                                radius='sm'
                                                                            />
                                                                        </div>
                                                                        {isMediumOrLarger && (
                                                                            <div className="flex flex-col">
                                                                                <Link key={categoryForum.id}
                                                                                      underline='hover'
                                                                                      className='dark:text-white text-blue-600'
                                                                                      href={`${NAVIGATION_LINKS.POST_OVERVIEW}/${categoryForum.latestPost.slug}`}>
                                                                                    {categoryForum.latestPost.title.substring(0, 20)} ...
                                                                                </Link>
                                                                                <p className='dark:text-white text-default-500 text-small'>
                                                                                    {formatDateWithTime(categoryForum.latestPost.createdAt)}.
                                                                                    <RecordAuthorStatsComponent
                                                                                        uniqueId="forum-overview-last-author"
                                                                                        author={categoryForum.latestPost.user}
                                                                                        userHasFollowedAuthor={false}
                                                                                        followButtonDisabled={true}
                                                                                    />
                                                                                </p>
                                                                            </div>
                                                                        )}
                                                                    </div>
                                                                )}
                                                            </div>
                                                        </CardBody>
                                                    </Card>
                                                ))}
                                            </CardBody>

                                            <CardFooter>
                                                Stats
                                            </CardFooter>
                                        </Card>
                                    ))}
                                </>
                            )}
                        </>
                    )}
                </div>

                <div className="w-2/12 mr-4 hidden md:block">
                    {isMediumOrLarger && (
                        <ForumStats viewType='web'/>
                    )}
                </div>
            </div>
        </>
    )
}