'use client';

import {useRouter} from "next/navigation";
import {PostResponse} from "@/boundary/interfaces/post";
import React, {useEffect, useState} from "react";
import {toast} from "react-toastify";
import {getPostDetails} from "@/lib/services/discussify/postService";
import {Card, CardFooter, CardHeader, CircularProgress, Divider, Link, Image, Avatar} from "@nextui-org/react";
import {CardBody} from "@nextui-org/card";
import {RenderPostTitle} from "@/components/discussify/posts/RenderPostTitle";
import {RenderPostAuthor} from "@/components/discussify/posts/RenderPostAuthor";

export default function PostOverview({slug}: { slug: string }) {
    const router = useRouter();
    const [postDetails, setPostDetails] = useState<PostResponse>({} as PostResponse);
    const [isLoadingDetails, setIsLoadingDetails] = useState(true);

    const fetchPostDetails = async (postSlug: any) => {
        setIsLoadingDetails(true);
        await getPostDetails(postSlug)
            .then((response) => {
                if (response.statusCode === 200) {
                    const post: PostResponse = response.data;
                    setPostDetails(post);
                }
            })
            .catch((error) => {
                toast.error(`Error fetching post details: ${error}`);
            })
            .finally(() => {
                setIsLoadingDetails(false);
            });
    };

    useEffect(() => {
        fetchPostDetails(slug);
    }, [slug]);

    return (
        <>
            <div className="flex w-full mt-10">
                {isLoadingDetails ? (
                    <div className={'grid place-items-center'}>
                        <CircularProgress color={'primary'} className={'p-4'}
                                          label='Loading post details...'/>
                    </div>
                ) : (
                    <>

                        <Card className="w-full"
                              radius='sm'>
                            <CardHeader className="flex gap-3">
                                <RenderPostTitle postDetails={postDetails}/>
                            </CardHeader>

                            <Divider className='mt-0'/>

                            <CardBody>
                                <RenderPostAuthor postDetails={postDetails}/>

                                <p>{postDetails.description}</p>
                            </CardBody>

                            <CardFooter className="text-small justify-between">
                                <b>
                                    <div className="flex gap-1">
                                        <p className="font-semibold text-default-400 text-small">97.1K</p>
                                        <p className="text-default-400 text-small">like</p>
                                    </div>
                                </b>
                                <div className="flex justify-end w-1/2">
                                    <span className="flex mr-3">
                                        <p className="font-semibold text-default-400 text-small">Since</p>
                                        <p className="text-default-400 text-small">save</p>
                                    </span>

                                    <span className="flex">
                                        <p className="font-semibold text-default-400 text-small">share</p>
                                        <p className="text-default-400 text-small">share</p>
                                    </span>
                                </div>
                            </CardFooter>
                        </Card>
                    </>
                )}
            </div>
        </>
    )
}