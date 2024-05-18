'use client';

import {Avatar, Button, Card, CardHeader, Chip, Link, Skeleton, Tooltip} from "@nextui-org/react";
import React, {useEffect, useState} from "react";
import {usePathname, useRouter} from "next/navigation";
import {toast} from "react-toastify";
import {NAVIGATION_LINKS} from "@/boundary/configs/navigationConfig";
import {ForumPostsResponse, ForumResponse} from "@/boundary/interfaces/forum";
import {getForumBySlugAsync, getForumPosts} from "@/lib/services/discussify/forumService";
import {ForumPostsQueryParameters} from "@/boundary/parameters/forumPostsQueryParameters";
import {convertSlugToTitleCase} from "@/lib/utils/seoUtils";
import ForumStats from "@/components/discussify/landing/ForumStats";
import {PlusIcon} from "@/components/shared/icons/PlusIcon";
import {useAuth} from "@/hooks/useAuth";
import RecordAuthorStatsComponent from "@/components/discussify/Shared/RecordAuthorStatsComponent";
import {formatDateWithoutTime, formatDateWithTime} from "@/helpers/dateHelpers";
import {CommentIcon, EyeIcon, PeopleIcon} from "@/components/shared/icons/LikeIcon";
import {PagingMetaData} from "@/boundary/paging/paging";
import Pagination from "@/components/discussify/forums/Pagination";
import {getCommentsAsync} from "@/lib/services/discussify/commentService";

const SkeletonForumPost = () => {
    return (
        <>
            <Card className="w-full mb-2">
                <div className="animate-pulse">
                    <CardHeader className="flex gap-3 p-1">
                        <Avatar radius="sm" size='lg'/>
                        <Skeleton className="w-full h-16"/>
                        <div className="flex flex-col">
                            <Skeleton className="text-tiny text-white/60"/>
                            <Skeleton className="text-tiny text-white/60"/>
                        </div>
                    </CardHeader>
                </div>
            </Card>
        </>
    );
};

export default function ForumOverview({slug}: { slug: string }) {
    const {user,loading} = useAuth();
    const router = useRouter();
    const [queryParams, setQueryParams] = useState<ForumPostsQueryParameters>(new ForumPostsQueryParameters());
    const [pagingMetaData, setPagingMetaData] = useState<PagingMetaData>({} as PagingMetaData);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [forumPosts, setForumPosts] = useState<ForumPostsResponse>({} as ForumPostsResponse);
    const [forumDetails, setForumDetails] = useState<ForumResponse>({} as ForumResponse);
    const [isLoadingForumPosts, setIsLoadingForumPosts] = useState(true);
    const [isFetchingForum, setIsFetchingForum] = useState(true);
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [isInitialLoad, setIsInitialLoad] = useState(true);
    // const searchParams = useSearchParams();
    const pathname = usePathname();
    const {replace} = useRouter();

    const fetchForum = async (forumSlug: any) => {
        setIsFetchingForum(true);
        await getForumBySlugAsync(forumSlug)
            .then((response) => {
                if (response.statusCode === 200) {
                    setForumDetails(response.data);
                }
            })
            .catch((error) => {
                toast.error(`Error fetching forum: ${error}`);
            })
            .finally(() => {
                setIsFetchingForum(false);
            });
    };

    useEffect(() => {
        if (slug) {
            fetchForum(slug);
        }
    }, [slug]);


    const fetchForumPosts = async (queryParams: ForumPostsQueryParameters,currentPage:number) => {
        setIsLoadingForumPosts(true);
        queryParams.forumSlug = slug;
        await getForumPosts({...queryParams, pageNumber: currentPage})
            .then((response) => {
                if (response.statusCode === 200) {
                    const parsedData = response.data;
                    const {data, pagingMetaData} = parsedData;
                    setForumPosts(data);
                    setPagingMetaData(pagingMetaData);
                } else {
                    toast.error(`Error fetching forum posts: ${response.message}`);
                }
            })
            .catch((error) => {
                toast.error(`Error fetching forum posts: ${error}`);
            })
            .finally(() => {
                setIsLoadingForumPosts(false);
            });
    };

    useEffect(() => {
        const {search} = window.location;
        const searchParams = new URLSearchParams(search);
        const searchTerm = searchParams.get('searchTerm') ?? '';
        queryParams.searchTerm = searchTerm;
        setSearchTerm(searchTerm);
        fetchForumPosts(queryParams,currentPage);
    }, []); // Empty dependency array to ensure it runs only on mount

    useEffect(() => {
        if (!isInitialLoad) {
            fetchForumPosts(queryParams,currentPage);
        } else {
            setIsInitialLoad(false);
        }
    }, [queryParams,currentPage]); // Fetch data only when queryParams change

    // const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    //     e.preventDefault();
    //     const searchTerm = e.target.value;
    //     const params = new URLSearchParams(searchParams);
    //
    //     if (searchTerm) {
    //         params.set('searchTerm', searchTerm);
    //     } else {
    //         params.delete('searchTerm');
    //     }
    //
    //     replace(`${pathname}?${params.toString()}`);
    //
    //     if (searchTerm.length >= 3 || searchTerm === '') {
    //         setQueryParams((prevParams) => ({...prevParams, searchTerm: searchTerm}));
    //     }
    // };

    const updateAuthorFollowStatus = (uniqueId: string, authorId: number, followed: boolean) => {
        if (uniqueId === "forum-overview") {
            setForumPosts(prevPosts => ({
                ...prevPosts,
                posts: prevPosts.posts.map(post =>
                    post.user.id === authorId ? {...post, userHasFollowedAuthor: followed} : post
                )
            }));
        }
    };

    const handleSStartThread = async () => {
        if (!loading && user !== null && !user.isEmailVerified){
            toast.warning('PLease verify you email address to create thread')
            return
        }

        router.push(`${NAVIGATION_LINKS.FORUM_OVERVIEW}/${slug}/create-thread`)
    }

    return (
        <>
            <div className="">
                <div className='flex flex-col gap-4 pt-5 mr-4'>
                    <div className='flex justify-between gap-3 items-end'>

                        <h1 className={'text-title-md'}>{convertSlugToTitleCase(slug)}</h1>

                        {forumDetails && !isFetchingForum && !forumDetails.isSystem && (
                            <div className='gap-3 hidden lg:block'>
                                <Button startContent={<PlusIcon/>}
                                        onClick={handleSStartThread}
                                        color='primary'>
                                    Create Thread
                                </Button>
                            </div>
                        )}

                        {user?.isModerator && (
                            <div className='gap-3 hidden lg:block'>
                                <Button startContent={<PlusIcon/>}
                                        onClick={handleSStartThread}
                                        color='primary'>
                                    Create Thread
                                </Button>
                            </div>
                        )}

                    </div>
                </div>

                <div className="flex h-full w-full mt-5">
                    {/*main forum section*/}
                    <div className="md:w-10/12 md:mr-4 w-full ml-1 mr-1">
                        {/*latest Forums section*/}
                        {isLoadingForumPosts ? (
                            <>
                                {Array.from({length: 2}, (_, index) => (
                                    <SkeletonForumPost key={index}/>
                                ))}
                            </>
                        ) : (
                            <>
                                {forumPosts.posts.length < 1 ? (
                                    <>
                                        <div className='text-center'>
                                            <p className='text-danger-400'>No forum threads found!</p>
                                        </div>
                                    </>
                                ) : (
                                    <>
                                        <div className="flex justify-between items-start mt-2 mb-2">
                                            <div>Filters</div>
                                            <div>
                                                <Pagination
                                                    currentPage={pagingMetaData.currentPage}
                                                    totalPages={pagingMetaData.totalPages}
                                                    onPageChange={setCurrentPage}
                                                />
                                            </div>
                                        </div>

                                        {forumPosts.posts.map((forumPost) => (
                                            <Card key={forumPost.id} className="w-full mb-2">
                                                <CardHeader className="flex gap-3 p-1">
                                                    <Avatar
                                                        alt={forumPost.slug}
                                                        className="ml-1"
                                                        name={forumPost.user.username}
                                                        size='md'
                                                        src={forumPost.user.profileUrl || ''}
                                                        isBordered={true}
                                                        radius="sm"
                                                    />
                                                    <div className="flex flex-col col-span-6 md:col-span-8 w-full">
                                                        <div className="flex justify-between items-start">
                                                            <div className="flex flex-col gap-0">
                                                                <Link key={forumPost.id}
                                                                      underline="hover"
                                                                      className='dark:text-white text-blue-600'
                                                                      href={`${NAVIGATION_LINKS.POST_OVERVIEW}/${forumPost.slug}`}>
                                                                    {user ? (
                                                                        <>
                                                                            {forumPost.userHasViewed ? (
                                                                                <p className="text-large">{forumPost.title}</p>
                                                                            ) : (
                                                                                <p className="text-xl font-bold">{forumPost.title}</p>
                                                                            )}
                                                                        </>
                                                                    ) : (
                                                                        <p className="text-large">{forumPost.title}</p>
                                                                    )}
                                                                </Link>
                                                            </div>

                                                            <div className='text-small col-span-3 md:block hidden'>
                                                                <div className="flex gap-10 justify-center pr-2">
                                                                    <div className='flex gap-3'>
                                                                        <Chip
                                                                            startContent={<EyeIcon width={15} />}
                                                                            variant="light"
                                                                            color="default"
                                                                            radius='sm'
                                                                            size='sm'
                                                                        >
                                                                            {forumPost.views}
                                                                        </Chip>

                                                                        <Chip
                                                                            startContent={<CommentIcon width={15} />}
                                                                            variant="light"
                                                                            color="default"
                                                                            radius='sm'
                                                                            size='sm'
                                                                        >
                                                                            {forumPost.postRepliesCount}
                                                                        </Chip>

                                                                        <Chip
                                                                            startContent={<PeopleIcon width={15} />}
                                                                            variant="light"
                                                                            color="default"
                                                                            radius='sm'
                                                                            size='sm'
                                                                        >
                                                                            {forumPost.participants}
                                                                        </Chip>
                                                                    </div>

                                                                    {forumPost.lastReplyCreatedAt && (
                                                                        <p>{formatDateWithoutTime(forumPost.lastReplyCreatedAt)}</p>
                                                                    )}
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <div className="flex flex-col gap-1 pr-2">
                                                            <div className="flex md:justify-between">
                                                                <span className='flex'>
                                                                    <RecordAuthorStatsComponent
                                                                        uniqueId="forum-overview"
                                                                        author={forumPost.user}
                                                                        userHasFollowedAuthor={forumPost.userHasFollowedAuthor}
                                                                        updateAuthorFollowStatus={updateAuthorFollowStatus}
                                                                        followButtonDisabled={false}
                                                                    />

                                                                     <Tooltip content={formatDateWithTime(forumPost.createdAt)}
                                                                              placement="top"
                                                                     >
                                                                        <Link href={""} underline="hover"
                                                                          size={'sm'}
                                                                          className='dark:text-white text-tiny text-default-500 ml-1 mr-1'>
                                                                        {formatDateWithoutTime(forumPost.createdAt)}
                                                                        </Link>
                                                                    </Tooltip>
                                                                </span>

                                                                <div className='flex md:hidden'>
                                                                    <Chip
                                                                        startContent={<EyeIcon width={15} />}
                                                                        variant="light"
                                                                        color="default"
                                                                        radius='sm'
                                                                        size='md'
                                                                    >
                                                                        {forumPost.views}
                                                                    </Chip>

                                                                    <Chip
                                                                        startContent={<CommentIcon width={15} />}
                                                                        variant="light"
                                                                        color="default"
                                                                        radius='sm'
                                                                        size='md'
                                                                    >
                                                                        {forumPost.postRepliesCount}
                                                                    </Chip>

                                                                    <Chip
                                                                        startContent={<PeopleIcon width={15} />}
                                                                        variant="light"
                                                                        color="default"
                                                                        radius='sm'
                                                                        size='md'
                                                                    >
                                                                        {forumPost.participants}
                                                                    </Chip>
                                                                </div>

                                                                <div
                                                                    className="text-foreground/50 text-small md:block hidden">
                                                                    {forumPost.lastReplyUser && (
                                                                        <RecordAuthorStatsComponent
                                                                            uniqueId="forum-overview-last-author"
                                                                            author={forumPost.lastReplyUser}
                                                                            userHasFollowedAuthor={forumPost.userHasFollowedAuthor}
                                                                            updateAuthorFollowStatus={updateAuthorFollowStatus}
                                                                            followButtonDisabled={true}
                                                                        />
                                                                    )}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </CardHeader>
                                            </Card>
                                        ))}
                                    </>
                                )}
                            </>
                        )}

                    </div>

                    {/*forum stats section*/}
                    <div className="w-2/12 mr-4 hidden md:block">
                        <ForumStats/>
                    </div>
                </div>
            </div>
        </>
    );
}