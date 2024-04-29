'use client';

import {
    Card,
    CardFooter,
    CardHeader,
    Image,
    Button,
    Avatar,
    CircularProgress,
    Tooltip,
    Link,
    PopoverContent, Popover, PopoverTrigger, Chip
} from "@nextui-org/react";
import React, {useEffect, useState} from "react";
import {CardBody} from "@nextui-org/card";
import {usePathname, useRouter, useSearchParams} from "next/navigation";
import {PostResponse} from "@/boundary/interfaces/post";
import {PostQueryParameters} from "@/boundary/parameters/postQueryParameters";
import {toast} from "react-toastify";
import {getLatestPosts} from "@/lib/services/discussify/postService";
import {NAVIGATION_LINKS} from "@/boundary/configs/navigationConfig";
import {formatDateWithoutTime, formatDateWithTime} from "@/helpers/dateHelpers";
import ForumStats from "@/components/discussify/landing/ForumStats";
import CoverPosts from "@/components/discussify/landing/CoverPosts";
import {User} from "@nextui-org/user";
import {UserStats} from "@/components/discussify/landing/UserStats";
import ReplyIcon from "@/components/shared/icons/ReplyIcon";
import {CheckIcon} from "@nextui-org/shared-icons";
import UserStatsComponent from "@/components/discussify/Shared/UserStatsComponent";

export default function Home() {
    const [queryParams, setQueryParams] = useState<PostQueryParameters>(new PostQueryParameters());
    const [postResponses, setPostResponses] = useState<PostResponse[]>([]);
    const [isLoadingPosts, setIsLoadingPosts] = useState(true);
    const [isLoadingMorePosts, setIsLoadingMorePosts] = useState(false);
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [isInitialLoad, setIsInitialLoad] = useState(true);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [totalPages, setTotalPages] = useState<number>(0);
    const [isOpen, setIsOpen] = React.useState(false);
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const {replace} = useRouter();

    const fetchLatestPosts = async (queryParams: PostQueryParameters, currentPage: number) => {
        setIsLoadingMorePosts(true);
        if (currentPage === 1) {
            setIsLoadingPosts(true);
        }
        await getLatestPosts({...queryParams, pageNumber: currentPage})
            .then((response) => {
                if (response.statusCode === 200) {
                    const parsedData = response.data;
                    const {data, pagingMetaData} = parsedData;
                    if (queryParams.pageNumber == pagingMetaData.currentPage) {
                        setPostResponses(data)
                    } else {
                        setPostResponses((prevPosts) => [...prevPosts, ...data]);
                    }
                    setTotalPages(pagingMetaData.totalPages)
                    setCurrentPage(pagingMetaData.currentPage)
                } else {
                    toast.error(`Error fetching posts: ${response.message}`);
                }
            })
            .catch((error) => {
                toast.error(`Error fetching posts: ${error}`);
            })
            .finally(() => {
                setIsLoadingPosts(false);
                setIsLoadingMorePosts(false);
            });
    };

    useEffect(() => {
        const {search} = window.location;
        const searchParams = new URLSearchParams(search);
        const searchTerm = searchParams.get('searchTerm') ?? '';
        queryParams.searchTerm = searchTerm;
        setSearchTerm(searchTerm);
        fetchLatestPosts(queryParams, currentPage); // Fetch posts for initial page
    }, []); // Empty dependency array to ensure it runs only on mount

    useEffect(() => {
        if (!isInitialLoad) {
            fetchLatestPosts(queryParams, currentPage);
        } else {
            setIsInitialLoad(false);
        }
    }, [queryParams]); // Fetch data only when queryParams change

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        const searchTerm = e.target.value;
        const params = new URLSearchParams(searchParams);

        if (searchTerm) {
            params.set('searchTerm', searchTerm);
        } else {
            params.delete('searchTerm');
        }

        replace(`${pathname}?${params.toString()}`);

        if (searchTerm.length >= 3 || searchTerm === '') {
            setQueryParams((prevParams) => ({...prevParams, searchTerm: searchTerm}));
        }
    };

    const handleLoadMore = () => {
        const nextPage = currentPage + 1;
        setCurrentPage((prevPage) => prevPage + 1); // Update currentPage using callback
        fetchLatestPosts(queryParams, nextPage);
    };

    return (
        <>
            <div className="flex w-full h-full mt-10">
                {/*main forum section*/}
                <div className="w-10/12 mr-4">
                    {/*cover post section*/}
                    <CoverPosts/>

                    {/*latest post section*/}
                    {isLoadingPosts ? (
                        <div className={'grid place-items-center'}>
                            <CircularProgress color={'primary'} className={'p-4'} label='Loading posts...'/>
                        </div>
                    ) : (
                        <>
                            <>
                                {postResponses.length < 1 ? (
                                    <>
                                        <div className='text-center'>
                                            <p className='text-danger-400'>No threads found!</p>
                                        </div>
                                    </>
                                ) : (
                                    <>
                                        {postResponses.map((post) => (
                                            <Card key={post.id} className="w-full mb-2">
                                                <CardHeader className="flex gap-3 p-1">
                                                    <Avatar
                                                        alt="nextui logo"
                                                        className="ml-1"
                                                        src={post.user.profileUrl || ''}
                                                        size='lg'
                                                        isBordered={true}
                                                        radius="sm"
                                                    />
                                                    <div className="flex flex-col">
                                                        <Link key={post.forum.id}
                                                              underline="hover"
                                                              className='dark:text-white text-default-500 text-small'
                                                              href={`${NAVIGATION_LINKS.FORUM_OVERVIEW}/${post.forum.slug}`}>
                                                            <p className={'text-tiny'}>{post.forum.title}</p>
                                                        </Link>
                                                        <Link key={post.id}
                                                              underline="hover"
                                                              className='dark:text-white text-blue-600'
                                                              href={`${NAVIGATION_LINKS.POST_OVERVIEW}/${post.slug}`}>
                                                            <p className="text-large">{post.title}</p>
                                                        </Link>
                                                        <div className="flex text-small text-default-500">
                                                            <UserStatsComponent author={post.user}
                                                                                className={'dark:text-white text-tiny text-default-500 mr-1'}/>
                                                            <p className={'font-bold text-medium'}>.</p>
                                                            <Tooltip content={formatDateWithTime(post.createdAt)}
                                                                     placement="top"
                                                            >
                                                                <Link href={""} underline="hover"
                                                                      size={'sm'}
                                                                      className='dark:text-white text-tiny text-default-500 ml-1 mr-1'>
                                                                    {formatDateWithoutTime(post.createdAt)}
                                                                </Link>
                                                            </Tooltip>
                                                            <p className={'font-bold text-medium'}>.</p>
                                                            <Link href={""} underline="hover"
                                                                  size={'sm'}
                                                                  className='dark:text-white text-tiny text-default-500 ml-1'>
                                                                <ReplyIcon width={15}/> <span
                                                                className={'ml-1'}>{post.postRepliesCount}</span>
                                                            </Link>
                                                        </div>
                                                    </div>
                                                </CardHeader>
                                            </Card>
                                        ))}
                                    </>
                                )}
                            </>

                            {isLoadingMorePosts && (
                                <div className="flex justify-center mt-4">
                                    <CircularProgress color={'primary'} className={'p-4'}
                                                      label='Loading more posts...'/>
                                </div>
                            )}

                            {totalPages > 1 && !isLoadingMorePosts && (
                                <div className="flex justify-center mt-4">
                                    <div className="flex justify-center mt-4">
                                        <Button size={'md'} onClick={handleLoadMore}>
                                            Load More
                                        </Button>
                                    </div>
                                </div>
                            )}
                        </>
                    )}

                </div>

                {/*forum stats section*/}
                <div className="w-2/12 mr-4">
                    <ForumStats/>
                </div>
            </div>

        </>
    );
}