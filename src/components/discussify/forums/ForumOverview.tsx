'use client';

import {Card, CardFooter, CardHeader, Image, Button, Avatar, CircularProgress} from "@nextui-org/react";
import React, {useEffect, useState} from "react";
import {CardBody} from "@nextui-org/card";
import {usePathname, useRouter, useSearchParams} from "next/navigation";
import {toast} from "react-toastify";
import Link from "next/link";
import {NAVIGATION_LINKS} from "@/boundary/configs/navigationConfig";
import {ForumPostsResponse, ForumResponse} from "@/boundary/interfaces/forum";
import {ForumQueryParameters} from "@/boundary/parameters/forumQueryParameters";
import {getForumPosts} from "@/lib/services/discussify/forumService";
import {ForumPostsQueryParameters} from "@/boundary/parameters/forumPostsQueryParameters";
import {PlusIcon} from "@/components/shared/icons/PlusIcon";
import {EditIcon, SearchIcon} from "@nextui-org/shared-icons";
import {convertSlugToTitleCase} from "@/lib/utils/seoUtils";

export default function ForumOverview({slug}: { slug: string }) {
    const [queryParams, setQueryParams] = useState<ForumPostsQueryParameters>(new ForumPostsQueryParameters());
    const [forumPosts, setForumPosts] = useState<ForumPostsResponse>({} as ForumPostsResponse);
    const [isLoadingForumPosts, setIsLoadingForumPosts] = useState(true);
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [isInitialLoad, setIsInitialLoad] = useState(true);
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const {replace} = useRouter();

    const fetchForumPosts = async (queryParams: ForumPostsQueryParameters) => {
        setIsLoadingForumPosts(true);
        queryParams.forumSlug = slug;
        await getForumPosts(queryParams)
            .then((response) => {
                if (response.statusCode === 200) {
                    const parsedData = response.data;
                    const {data, pagingMetaData} = parsedData;
                    setForumPosts(data);
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
        fetchForumPosts(queryParams);
    }, []); // Empty dependency array to ensure it runs only on mount

    useEffect(() => {
        if (!isInitialLoad) {
            fetchForumPosts(queryParams);
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

    return (
        <>
            <div className="">
                <div className='flex flex-col gap-4 pt-5 pb-5 mr-4'>
                    <div className='flex justify-between gap-3 items-end'>

                        <h1>{convertSlugToTitleCase(slug)}</h1>

                        <div className='gap-3 hidden lg:block'>
                           <Link  href={`${NAVIGATION_LINKS.CREATE_POST}/${slug}/create-thread`}>
                               <Button startContent={<EditIcon/>}
                                       color='primary'
                                       variant='shadow'>
                                   Create Thread
                               </Button>
                           </Link>
                        </div>
                    </div>
                </div>

                <div className="flex h-screen w-full mt-10">
                    {/*main forum section*/}
                    <div className="w-10/12 mr-4">
                        {/*latest Forums section*/}
                        {isLoadingForumPosts ? (
                            <div className={'grid place-items-center'}>
                                <CircularProgress color={'primary'} className={'p-4'} label='Loading forum posts...'/>
                            </div>
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
                                        {forumPosts.posts.map((forumPost) => (
                                            <Card key={forumPost.id} className="w-full mb-2">
                                                <CardHeader className="flex gap-3 p-1">
                                                    <Avatar
                                                        alt="nextui logo"
                                                        className="ml-1"
                                                        name="P"
                                                        size='lg'
                                                        color='success'
                                                        isBordered={true}
                                                        radius="sm"
                                                    />
                                                    <div className="flex flex-col">
                                                        <Link key={forumPost.id}
                                                              href={`${NAVIGATION_LINKS.POST_OVERVIEW}/${forumPost.slug}`}>
                                                            <p className="text-md">{forumPost.title}</p>
                                                        </Link>
                                                        <p className="text-small text-default-500">nextui.org</p>
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
                    <div className="w-2/12 mr-4">
                        <Card className="w-full" radius='sm'>
                            <CardHeader className="justify-between">
                                <div className="flex gap-5">
                                    <div className="flex flex-col gap-1 items-start justify-center">
                                        <h4 className="text-small font-semibold leading-none text-default-600">Zoey
                                            Lang</h4>
                                        <h5 className="text-small tracking-tight text-default-400">@zoeylang</h5>
                                    </div>
                                </div>
                            </CardHeader>
                            <CardBody className="px-3 py-0 text-small text-default-400">
                                <p>
                                    Frontend developer and UI/UX enthusiast. Join me on this coding adventure!
                                </p>
                            </CardBody>
                            <CardFooter className="gap-3">
                                <div className="flex gap-1">
                                    <p className="font-semibold text-default-400 text-small">Since</p>
                                    <p className=" text-default-400 text-small">2024</p>
                                </div>
                                <div className="flex gap-1">
                                    <p className="font-semibold text-default-400 text-small">97.1K</p>
                                    <p className="text-default-400 text-small">members</p>
                                </div>
                                <div className="flex gap-1">
                                    <p className="font-semibold text-default-400 text-small">97.1K</p>
                                    <p className="text-default-400 text-small">members</p>
                                </div>
                            </CardFooter>
                        </Card>
                    </div>
                </div>
            </div>
        </>
    );
}