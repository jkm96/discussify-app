'use client';

import {Card, CardFooter, CardHeader, Image, Button, Avatar, CircularProgress} from "@nextui-org/react";
import React, {useEffect, useState} from "react";
import {CardBody} from "@nextui-org/card";
import {usePathname, useRouter, useSearchParams} from "next/navigation";
import {PostResponse} from "@/boundary/interfaces/post";
import {PostQueryParameters} from "@/boundary/parameters/postQueryParameters";
import {toast} from "react-toastify";
import {getLatestPosts} from "@/lib/services/discussify/postService";
import Link from "next/link";
import {NAVIGATION_LINKS} from "@/boundary/configs/navigationConfig";

export default function Home() {
    const [queryParams, setQueryParams] = useState<PostQueryParameters>(new PostQueryParameters());
    const [postResponses, setPostResponses] = useState<PostResponse[]>([]);
    const [isLoadingPosts, setIsLoadingPosts] = useState(true);
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [isInitialLoad, setIsInitialLoad] = useState(true);
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const {replace} = useRouter();

    const fetchLatestPosts = async (queryParams: PostQueryParameters) => {
        setIsLoadingPosts(true);
        await getLatestPosts(queryParams)
            .then((response) => {
                if (response.statusCode === 200) {
                    const parsedData = response.data;
                    const {data, pagingMetaData} = parsedData;
                    setPostResponses(data);
                } else {
                    toast.error(`Error fetching posts: ${response.message}`);
                }
            })
            .catch((error) => {
                toast.error(`Error fetching posts: ${error}`);
            })
            .finally(() => {
                setIsLoadingPosts(false);
            });
    };

    useEffect(() => {
        const {search} = window.location;
        const searchParams = new URLSearchParams(search);
        const searchTerm = searchParams.get('searchTerm') ?? '';
        queryParams.searchTerm = searchTerm;
        setSearchTerm(searchTerm);
        fetchLatestPosts(queryParams);
    }, []); // Empty dependency array to ensure it runs only on mount

    useEffect(() => {
        if (!isInitialLoad) {
            fetchLatestPosts(queryParams);
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
            <div className="flex h-screen w-full mt-10">
                {/*main forum section*/}
                <div className="w-10/12 bg-black mr-4">
                    {/*cover post section*/}
                    <div className="flex flex-wrap gap-1 mb-3">
                        <Card isFooterBlurred className="w-3/12 h-[200px] sm:col-span-7">
                            <CardHeader className="absolute z-10 top-1 flex-col items-start">
                                <p className="text-tiny font-bold">Your day your way</p>
                                <h4 className="text-medium">Your checklist for better sleep</h4>
                            </CardHeader>
                            <Image
                                removeWrapper
                                alt="Relaxing app background"
                                className="z-0 w-1/2 h-full object-cover"
                                src="/images/card-example-5.jpeg"
                            />
                            <CardFooter
                                className="absolute bg-black/40 bottom-0 z-10">
                                <div className="flex flex-grow gap-2 items-center">
                                    <div className="flex flex-col">
                                        <p className="text-tiny text-white/60">Breathing App</p>
                                        <p className="text-tiny text-white/60">Get a good night sleep.</p>
                                    </div>
                                </div>
                                <Button radius="full" size="sm">Get App</Button>
                            </CardFooter>
                        </Card>
                        <Card isFooterBlurred className="w-3/12  h-[200px] sm:col-span-7">
                            <CardHeader className="absolute z-10 top-1 flex-col items-start">
                                <p className="text-tiny font-bold">Your day your way</p>
                                <h4 className="text-medium">Your checklist for better sleep</h4>
                            </CardHeader>
                            <Image
                                removeWrapper
                                alt="Relaxing app background"
                                className="z-0 w-1/2 h-full object-cover"
                                src="/images/card-example-5.jpeg"
                            />
                            <CardFooter
                                className="absolute bg-black/40 bottom-0 z-10">
                                <div className="flex flex-grow gap-2 items-center">
                                    <Image
                                        alt="Breathing app icon"
                                        className="rounded-full w-10 h-11 bg-black"
                                        src="/images/breathing-app-icon.jpeg"
                                    />
                                    <div className="flex flex-col">
                                        <p className="text-tiny text-white/60">Breathing App</p>
                                        <p className="text-tiny text-white/60">Get a good night sleep.</p>
                                    </div>
                                </div>
                                <Button radius="full" size="sm">Get App</Button>
                            </CardFooter>
                        </Card>
                        <Card isFooterBlurred className="w-3/12  h-[200px] sm:col-span-7">
                            <CardHeader className="absolute z-10 top-1 flex-col items-start">
                                <p className="text-tiny font-bold">Your day your way</p>
                                <h4 className="text-medium">Your checklist for better sleep</h4>
                            </CardHeader>
                            <Image
                                removeWrapper
                                alt="Relaxing app background"
                                className="z-0 w-1/2 h-full object-cover"
                                src="/images/card-example-5.jpeg"
                            />
                            <CardFooter
                                className="absolute bg-black/40 bottom-0 z-10">
                                <div className="flex flex-grow gap-2 items-center">
                                    <Image
                                        alt="Breathing app icon"
                                        className="rounded-full w-10 h-11 bg-black"
                                        src="/images/breathing-app-icon.jpeg"
                                    />
                                    <div className="flex flex-col">
                                        <p className="text-tiny text-white/60">Breathing App</p>
                                        <p className="text-tiny text-white/60">Get a good night sleep.</p>
                                    </div>
                                </div>
                                <Button radius="full" size="sm">Get App</Button>
                            </CardFooter>
                        </Card>
                    </div>

                    {/*latest post section*/}
                    {isLoadingPosts ? (
                        <div className={'grid place-items-center'}>
                            <CircularProgress color={'primary'} className={'p-4'} label='Loading posts...'/>
                        </div>
                    ) : (
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
                                                    name="P"
                                                    size='lg'
                                                    color='success'
                                                    isBordered={true}
                                                    radius="sm"
                                                />
                                                <div className="flex flex-col">
                                                    <Link key={post.forum.id}
                                                          href={`${NAVIGATION_LINKS.FORUM_OVERVIEW}/${post.forum.slug}`}>
                                                        <p>{post.forum.title}</p>
                                                    </Link>
                                                    <Link key={post.id}
                                                          href={`${NAVIGATION_LINKS.POST_OVERVIEW}/${post.slug}`}>
                                                        <p className="text-md">{post.title}</p>
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
                <div className="w-2/12 bg-blue-200 mr-4">
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

        </>
    );
}