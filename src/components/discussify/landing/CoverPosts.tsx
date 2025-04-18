import {Avatar, Card, CardFooter, CardHeader, Link} from "@nextui-org/react";
import React, {useEffect, useState} from "react";
import {PostResponse} from "@/boundary/interfaces/post";
import {toast} from "react-toastify";
import {getCoverPostsAsync} from "@/lib/services/discussify/postService";
import {formatDateWithoutTime} from "@/helpers/dateHelpers";
import {SkeletonCard} from "@/components/discussify/skeletons/SkeletonPostCard";
import {NAVIGATION_LINKS} from "@/boundary/configs/navigationConfig";
import useClientMediaQuery from "@/hooks/useClientMediaQuery";

export default function CoverPosts() {
    const {  matches: isMediumOrLarger } = useClientMediaQuery('(min-width: 768px)');
    const [postResponses, setPostResponses] = useState<PostResponse[]>([]);
    const [isLoadingPosts, setIsLoadingPosts] = useState(true);

    const fetchPosts = async () => {
        setIsLoadingPosts(true);
        await getCoverPostsAsync()
            .then((response) => {
                if (response.statusCode === 200) {
                    setPostResponses(response.data);
                }
            })
            .catch((error) => {
                toast.error(`Error fetching cover posts: ${error}`);
            })
            .finally(() => {
                setIsLoadingPosts(false);
            });
    };

    useEffect(() => {
        fetchPosts();
    }, []);

    return (
        <>
            <div>

                {/* Show only one post on small screens */}
                {!isMediumOrLarger && (
                    <div className="md:hidden">
                        {isLoadingPosts ? <SkeletonCard/> : (
                            <>
                                {postResponses.length > 0 ? (
                                    <>
                                        <div
                                            className="block rounded-lg shadow-secondary-1 dark:bg-surface-dark dark:text-white text-surface">
                                            <Card isFooterBlurred className="h-[200px] sm:col-span-7">
                                                <CardHeader className="absolute z-10 top-1 flex-col items-start">
                                                    <p className="text-tiny font-bold">
                                                        <Link underline="hover"
                                                              className='dark:text-white text-small'
                                                              href={`${NAVIGATION_LINKS.FORUM_OVERVIEW}/${postResponses[0]?.forum.slug}`}>
                                                            {postResponses[0]?.forum.title}
                                                        </Link>
                                                    </p>
                                                    <p className="text-white">
                                                        <Link className='text-white'
                                                              underline='hover'
                                                              href={`${NAVIGATION_LINKS.POST_OVERVIEW}/${postResponses[0]?.slug}`}>
                                                            {postResponses[0]?.title}
                                                        </Link>
                                                    </p>
                                                </CardHeader>
                                                <img
                                                    loading="lazy"
                                                    alt={postResponses[0]?.title}
                                                    className="z-0 w-full h-full object-cover"
                                                    src={postResponses[0]?.user.profileUrl || ''}
                                                />
                                                <CardFooter className="absolute bg-black/40 bottom-0 z-10">
                                                    <div className="flex flex-grow gap-2 items-center">
                                                        <div className="flex gap-2">
                                                            <Avatar radius="sm" size="sm"
                                                                    src={postResponses[0]?.user.profileUrl || ''}/>
                                                            <div
                                                                className="flex flex-col gap-1 items-start justify-center">
                                                                <p className="text-tiny text-white/60">{postResponses[0]?.user.username}</p>
                                                                <p className="text-tiny text-white/60">{formatDateWithoutTime(postResponses[0]?.createdAt)}</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </CardFooter>
                                            </Card>
                                        </div>
                                    </>
                                ) : (
                                    <>
                                        No threads found
                                    </>
                                )}
                            </>
                        )}
                    </div>
                )}

                {/* Show all threads on medium and larger screens */}
                {isMediumOrLarger && (
                    <div className="hidden md:grid md:grid-cols-4 md:gap-2">
                        {isLoadingPosts ? (
                            Array.from({length: 4}, (_, index) => <SkeletonCard key={index}/>)
                        ) : (
                            <>
                                {postResponses.length > 0 ? (
                                    <>
                                        {postResponses.map((post, index) => (
                                            <div
                                                className="block rounded-lg shadow-secondary-1 dark:bg-surface-dark dark:text-white text-surface"
                                                key={index}>

                                                <Card isFooterBlurred className="h-[200px] sm:col-span-7">
                                                    <CardHeader className="absolute z-10 top-1 flex-col items-start">
                                                        <p className="text-tiny font-bold text-white">
                                                            <Link underline="hover"
                                                                  className='dark:text-white text-default-500 text-small'
                                                                  href={`${NAVIGATION_LINKS.FORUM_OVERVIEW}/${postResponses[0]?.forum.slug}`}>
                                                                {postResponses[0]?.forum.title}
                                                            </Link>
                                                        </p>
                                                        <h4 className="text-medium text-white">
                                                            <Link className='text-white'
                                                                  underline='hover'
                                                                  href={`${NAVIGATION_LINKS.POST_OVERVIEW}/${post.slug}`}>
                                                                {post.title}
                                                            </Link>
                                                        </h4>
                                                    </CardHeader>
                                                    <img
                                                        loading="lazy"
                                                        alt={post.title}
                                                        className="z-0 w-full h-full object-cover"
                                                        src={post.user.profileUrl || ''}
                                                    />
                                                    <CardFooter className="absolute bg-black/40 bottom-0 z-10">
                                                        <div className="flex flex-grow gap-2 items-center">
                                                            <div className="flex gap-2">
                                                                <Avatar radius="sm" size="sm"
                                                                        src={post.user.profileUrl || ''}/>
                                                                <div
                                                                    className="flex flex-col gap-1 items-start justify-center">
                                                                    <p className="text-tiny text-white/60">{post.user.username}</p>
                                                                    <p className="text-tiny text-white/60">{formatDateWithoutTime(post.createdAt)}</p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </CardFooter>
                                                </Card>

                                            </div>
                                        ))}
                                    </>
                                ) : (
                                    <>
                                    </>
                                )}

                            </>
                        )}
                    </div>
                )}

            </div>
        </>
    )
}