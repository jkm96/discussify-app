'use client';

import {
    Avatar,
    Button,
    Card,
    CardFooter,
    CardHeader,
    CircularProgress,
    Input,
    Link,
    Select,
    SelectItem,
    Tooltip
} from "@nextui-org/react";
import React, {useEffect, useState} from "react";
import {usePathname, useRouter} from "next/navigation";
import {PostResponse} from "@/boundary/interfaces/post";
import {PostQueryParameters} from "@/boundary/parameters/postQueryParameters";
import {toast} from "react-toastify";
import {createPostAsync, getLatestPosts} from "@/lib/services/discussify/postService";
import {NAVIGATION_LINKS} from "@/boundary/configs/navigationConfig";
import {formatDateWithoutTime, formatDateWithTime} from "@/helpers/dateHelpers";
import ForumStats from "@/components/discussify/landing/ForumStats";
import CoverPosts from "@/components/discussify/landing/CoverPosts";
import RecordAuthorStatsComponent from "@/components/discussify/Shared/RecordAuthorStatsComponent";
import {useAuth} from "@/hooks/useAuth";
import {ReplyIcon} from "@/components/shared/icons/ReplyIcon";
import {EditIcon} from "@nextui-org/shared-icons";
import Spinner from "@/components/shared/icons/Spinner";
import {initialPostFormState} from "@/components/discussify/forums/CreateForumPost";
import dynamic from "next/dynamic";
import {ForumResponse} from "@/boundary/interfaces/forum";
import {getForums} from "@/lib/services/discussify/forumService";
import {validateCreatePostFormInputErrors} from "@/helpers/validationHelpers";
import useClientMediaQuery from "@/hooks/useClientMediaQuery";

const CustomEditor = dynamic(() => {
    return import( '@/components/ckeditor5/custom-editor' );
}, {ssr: false});

export default function Home() {
    const {  matches: isMediumOrLarger } = useClientMediaQuery('(min-width: 768px)');

    const {user} = useAuth();
    const pathname = usePathname();
    const router = useRouter();
    const {replace} = useRouter();
    const [queryParams, setQueryParams] = useState<PostQueryParameters>(new PostQueryParameters());
    const [postResponses, setPostResponses] = useState<PostResponse[]>([]);
    const [isLoadingPosts, setIsLoadingPosts] = useState(true);
    const [isLoadingMorePosts, setIsLoadingMorePosts] = useState(false);
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [isInitialLoad, setIsInitialLoad] = useState(true);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [totalPages, setTotalPages] = useState<number>(0);
    const [isOpen, setIsOpen] = React.useState(false);
    // const searchParams = useSearchParams();

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
        fetchLatestPosts(queryParams, currentPage); // Fetch threads for initial page
    }, []); // Empty dependency array to ensure it runs only on mount

    useEffect(() => {
        if (!isInitialLoad) {
            fetchLatestPosts(queryParams, currentPage);
        } else {
            setIsInitialLoad(false);
        }
    }, [queryParams]); // Fetch data only when queryParams change

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

    const handleLoadMore = () => {
        const nextPage = currentPage + 1;
        setCurrentPage((prevPage) => prevPage + 1); // Update currentPage using callback
        fetchLatestPosts(queryParams, nextPage);
    };

    const updateAuthorFollowStatus = (uniqueId: string, authorId: number, followed: boolean) => {
        if (uniqueId === "home") {
            setPostResponses(prevPosts =>
                prevPosts.map(post =>
                    post.user.id === authorId ? {...post, userHasFollowedAuthor: followed} : post
                )
            );
        }
    };


    const [startQuickThread, setStartQuickThread] = useState(false);
    const [createPostRequest, setCreatePostRequest] = useState(initialPostFormState);
    const [forums, setForums] = useState<ForumResponse[]>([]);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [inputErrors, setInputErrors] = useState({
        forumSlug: '', description: '', tags: '', title: ''
    });
    const handleStartQuickThread = async () => {
        if (user == null) {
            router.push(NAVIGATION_LINKS.LOGIN)
            return
        }

        if (!user.isEmailVerified){
            toast.warning('Please verify you email address to create thread')
            return
        }

        const response = await getForums();
        if (response.statusCode === 200) {

            let filteredForums;
            if (!user?.isModerator) {
                const forumData:ForumResponse[] = response.data;
                filteredForums = forumData.filter(forum => !forum.isSystem);
            } else {
                filteredForums = response.data;
            }
            setForums(filteredForums)
        }
        setStartQuickThread(true)
    }

    const handleEditorChange = (data: string) => {
        setCreatePostRequest({...createPostRequest, description: data});
    };

    const handleChange = (e: any) => {
        const {name, value} = e.target;
        setCreatePostRequest({...createPostRequest, [name]: value});
    };

    const handleCreatePost = async (e: any) => {
        e.preventDefault();
        setIsSubmitting(true)

        const inputErrors = validateCreatePostFormInputErrors(createPostRequest);
        if (inputErrors && Object.keys(inputErrors).length > 0) {
            setInputErrors(inputErrors);
            setIsSubmitting(false);
            return;
        }

        if (createPostRequest.description === null || createPostRequest.description === '') {
            toast.error('Please provide a valid message')
            return
        }
        const response = await createPostAsync(createPostRequest);
        if (response.statusCode === 200) {
            toast.success(response.message);
            setIsSubmitting(false);
            setStartQuickThread(false)
            setCreatePostRequest(initialPostFormState)
            setPostResponses(prevPostResponses => [response.data, ...prevPostResponses]);
        } else {
            setIsSubmitting(false);
            toast.error(response.message ?? 'Unknown error occurred');
        }
    }

    return (
        <>
            <div className="flex w-full h-full mt-2.5 mb-5">
                {/*main forum section*/}
                <div className="md:w-10/12 md:mr-4 w-full ml-1 mr-1">

                        <div className="md:hidden mb-4">
                            {!isMediumOrLarger && (
                            <ForumStats viewType='mobile'/>
                            )}
                        </div>

                    {/*cover post section*/}
                    <CoverPosts/>

                    {!isLoadingPosts && (
                        <Card className={`mt-2 mb-2 dark:bg-boxdark-mode ${startQuickThread ? 'p-1 pl-2 pr-2':''}`}>
                            <form>
                                <Input
                                    value={startQuickThread ? createPostRequest.title : ''}
                                    className={startQuickThread ? 'mt-2 mb-2' : ''}
                                    classNames={{
                                        inputWrapper:'border-small'
                                    }}
                                    type="text"
                                    radius='sm'
                                    size='md'
                                    onChange={handleChange}
                                    name='title'
                                    variant='bordered'
                                    label={startQuickThread ? 'Title' : ''}
                                    labelPlacement="outside"
                                    placeholder={startQuickThread ? 'Thread title' : 'Start a quick thread'}
                                    onClick={handleStartQuickThread}
                                    onInput={() => {
                                        setInputErrors({...inputErrors, title: ''});
                                    }}
                                    startContent={
                                        <EditIcon height={20} width={20}/>
                                    }
                                    isInvalid={inputErrors.title !== ''}
                                    errorMessage={inputErrors.title}
                                />
                            </form>

                            {startQuickThread && (
                                <>
                                    <div className='grid md:grid-cols-1 md:gap-6 mt-2 mb-2'>
                                        <Select
                                            label='Forum'
                                            labelPlacement='outside'
                                            placeholder="Select a forum"
                                            variant='bordered'
                                            size='md'
                                            onSelectionChange={() => {
                                                setInputErrors({...inputErrors, forumSlug: ''});
                                            }}
                                            onChange={(e) => {
                                                const selectedSlug = e.target.value;
                                                setCreatePostRequest({
                                                    ...createPostRequest,
                                                    forumSlug: selectedSlug
                                                })
                                            }}
                                            isInvalid={inputErrors.forumSlug !== ''}
                                            errorMessage={inputErrors.forumSlug}
                                        >
                                            {forums.map((forum) => (
                                                <SelectItem key={forum.slug} value={forum.slug}>
                                                    {forum.title}
                                                </SelectItem>
                                            ))}
                                        </Select>

                                        <h3>Thread message</h3>
                                        <CustomEditor
                                            initialData={createPostRequest.description}
                                            onChange={handleEditorChange}
                                        />

                                        <Input
                                            label='Tags'
                                            labelPlacement='outside'
                                            classNames={{
                                                inputWrapper:'border-sm'
                                            }}
                                            name='tags'
                                            onChange={handleChange}
                                            value={createPostRequest.tags}
                                            variant='bordered'
                                            description={'More than one tags should be separated by comma'}
                                            placeholder={'Enter thread tags'}
                                            isInvalid={inputErrors.tags !== ''}
                                            errorMessage={inputErrors.tags}/>
                                    </div>

                                    <CardFooter>
                                        <Button color='primary'
                                                type='submit'
                                                isLoading={isSubmitting}
                                                spinner={<Spinner/>}
                                                size='sm'
                                                onClick={handleCreatePost}>
                                            {isSubmitting ? 'Submitting...' : 'Submit Thread'}
                                        </Button>

                                        <Button color='default'
                                                type='submit'
                                                size='sm'
                                                className='ml-2'
                                                spinner={<Spinner/>}
                                                onClick={() => {
                                                    setStartQuickThread(false)
                                                    setInputErrors(initialPostFormState)
                                                }}>
                                            Cancel
                                        </Button>
                                    </CardFooter>
                                </>
                            )}
                        </Card>
                    )}

                    {/*latest post section*/}
                    {isLoadingPosts ? (
                        <div className='grid place-items-center'>
                            <CircularProgress color='primary' className='p-4' label='Loading posts...'/>
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
                                            <Card key={post.id} className="w-full mb-2" radius="sm">
                                                <CardHeader className="flex gap-3 p-1">
                                                    <Avatar
                                                        alt={post.title}
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
                                                            <p className="text-tiny">{post.forum.title}</p>
                                                        </Link>
                                                        <Link key={post.id}
                                                              underline="hover"
                                                              className='dark:text-white text-blue-600'
                                                              href={`${NAVIGATION_LINKS.POST_OVERVIEW}/${post.slug}`}>
                                                            {user ? (
                                                                <>
                                                                    {post.userHasViewed ? (
                                                                        <p className="text-medium">{post.title}</p>
                                                                    ) : (
                                                                        <p className="font-bold">{post.title}</p>
                                                                    )}
                                                                </>
                                                            ) : (
                                                                <p className="text-medium">{post.title}</p>
                                                            )}
                                                        </Link>
                                                        <div className="flex text-small text-default-500">
                                                            <RecordAuthorStatsComponent key={post.user.id}
                                                                                        uniqueId={"home"}
                                                                                        author={post.user}
                                                                                        userHasFollowedAuthor={post.userHasFollowedAuthor}
                                                                                        updateAuthorFollowStatus={updateAuthorFollowStatus}
                                                                                        followButtonDisabled={false}
                                                            />
                                                            <p className={'font-bold text-medium'}>.</p>
                                                            <Tooltip content={formatDateWithTime(post.createdAt)}
                                                                     placement="top"
                                                            >
                                                                <Link underline="hover"
                                                                      size={'sm'}
                                                                      className='dark:text-white text-tiny text-default-500 ml-1 mr-1 cursor-pointer'>
                                                                    {formatDateWithoutTime(post.createdAt)}
                                                                </Link>
                                                            </Tooltip>
                                                            <p className={'font-bold text-medium'}>.</p>
                                                            <Link underline="hover"
                                                                  size={'sm'}
                                                                  className='dark:text-white text-tiny text-default-500 ml-1 cursor-pointer'>
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

                            {totalPages > 1 && !isLoadingMorePosts && totalPages !== currentPage && (
                                <div className="flex justify-center mt-4 mb-4">
                                    <Button color='primary' size='sm' onClick={handleLoadMore}>
                                        Load More
                                    </Button>
                                </div>
                            )}
                        </>
                    )}

                </div>

                {/*forum stats section*/}

                    <div className="w-2/12 mr-4 hidden md:block">
                        {isMediumOrLarger && (
                        <ForumStats viewType='web'/>
                        )}
                    </div>
            </div>
        </>
    );
}