'use client';

import {useRouter} from "next/navigation";
import {EditPostRequest, PostReplyRequest, PostResponse} from "@/boundary/interfaces/post";
import React, {useEffect, useState} from "react";
import {toast} from "react-toastify";
import {editPostAsync, getPostDetailsAsync} from "@/lib/services/discussify/postService";
import {Avatar, AvatarGroup, Button, Card, CardFooter, CardHeader, Divider} from "@nextui-org/react";
import {CardBody} from "@nextui-org/card";
import {RenderPostTitle} from "@/components/discussify/posts/RenderPostTitle";
import {RenderPostAuthor} from "@/components/discussify/posts/RenderPostAuthor";
import DOMPurify from 'dompurify';
import dynamic from "next/dynamic";
import Spinner from "@/components/shared/icons/Spinner";
import {NAVIGATION_LINKS} from "@/boundary/configs/navigationConfig";
import {useAuth} from "@/hooks/useAuth";
import ShareIcon from "@/components/shared/icons/ShareIcon";
import ReplyIcon from "@/components/shared/icons/ReplyIcon";
import ForumStats from "@/components/discussify/landing/ForumStats";
import BookmarkIcon from "@/components/shared/icons/BookmarkIcon";
import {addPostReplyAsync} from "@/lib/services/discussify/postReplyService";
import {SkeletonPostCard} from "@/components/discussify/skeletons/SkeletonPostCard";
import {LikeRequest} from "@/boundary/interfaces/shared";
import {saveLikeAsync} from "@/lib/services/discussify/sharedService";
import {LikedIcon, LikeIcon} from "@/components/shared/icons/LikeIcon";
import {PostRepliesComponent} from "@/components/discussify/posts/PostRepliesComponent";

const CustomEditor = dynamic(() => {
    return import( '@/components/ckeditor5/custom-editor' );
}, {ssr: false});

const initialPostReplyFormState: PostReplyRequest = {
    description: '', postId: 0
};

export default function PostOverview({slug}: { slug: string }) {
    const router = useRouter();
    const {user} = useAuth();
    const [postDetails, setPostDetails] = useState<PostResponse>({} as PostResponse);
    const [isLoadingDetails, setIsLoadingDetails] = useState(true);
    const [postReplies, setPostReplies] = useState([]);

    const [showEditPost, setShowEditPost] = useState(false);
    const [showAddPostReplyForm, setShowAddPostReplyForm] = useState(false);
    const [editPostRequest, setEditPostRequest] = useState({} as EditPostRequest);
    const [postReplyRequest, setPostReplyRequest] = useState(initialPostReplyFormState);

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isLiked, setIsLiked] = useState(false);

    const fetchPostDetails = async (postSlug: any) => {
        setIsLoadingDetails(true);
        await getPostDetailsAsync(postSlug)
            .then((response) => {
                if (response.statusCode === 200) {
                    const {post, postLikes} = response.data;
                    const postWithLikes = {
                        ...post,
                        postLikes: postLikes
                    };
                    setPostDetails(postWithLikes);
                    const editRequest: EditPostRequest = {
                        description: post.description,
                        postId: post.id,
                        title: post.title
                    }
                    setEditPostRequest(editRequest)
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

    const handleEditPostEditorChange = (data: string) => {
        setEditPostRequest({...editPostRequest, description: data});
    };

    const handleEditPost = async (e: any) => {
        e.preventDefault();
        const response = await editPostAsync(editPostRequest);
        if (response.statusCode === 200) {
            toast.success(response.message);
            setShowEditPost(false)
            setPostDetails({...postDetails, description: editPostRequest.description})
        } else {
            toast.error(response.message ?? 'Unknown error occurred');
        }
    };

    const handleAddPostReplyEditorChange = (data: string) => {
        setPostReplyRequest({...postReplyRequest, description: data});
    };

    const handleAddPostReply = async (e: any) => {
        e.preventDefault();
        if (postReplyRequest.description.trim() === '') {
            toast.error("Please enter a valid comment")
            setIsSubmitting(false);
            return;
        }
        postReplyRequest.postId = postDetails.id;
        const response = await addPostReplyAsync(postReplyRequest);
        if (response.statusCode === 200) {
            toast.success(response.message);
            setShowAddPostReplyForm(false)

            const updatedReplies:any = [response.data, ...postReplies];
            setPostReplies(updatedReplies);

            setPostReplyRequest(initialPostReplyFormState)
        } else {
            toast.error(response.message ?? 'Unknown error occurred');
        }
    };

    const toggleLike = async (recordId: number, type: string, e: any) => {
        e.preventDefault();
        if (!user) {
            toast.warning("You must be logged in to like")
            router.push(NAVIGATION_LINKS.LOGIN)
            return;
        }
        const likeRequest: LikeRequest = {
            recordId: recordId, type: type
        }
        const response = await saveLikeAsync(likeRequest)
        if (response.statusCode === 200) {
            toast.success(response.message);
            setIsLiked(true)

            setPostDetails((prevPostDetails): any => ({
                ...prevPostDetails,
                postLikes: {
                    likes: (prevPostDetails.postLikes ? prevPostDetails.postLikes.likes : 0) + 1,
                    users: [...(prevPostDetails.postLikes ? prevPostDetails.postLikes.users : []), user?.profileUrl]
                }
            }));

        } else {
            toast.error(response.message ?? 'Unknown error occurred');
        }
    }

    return (
        <>
            <div className="flex w-full mt-5 md:mt-10">
                {/*post overview section*/}
                <div className="md:w-10/12 md:mr-4 w-full ml-1 mr-1">
                    {isLoadingDetails ? (
                        <SkeletonPostCard/>
                    ) : (
                        <>
                            <Card className="w-full" radius='sm'>
                                <CardHeader className="flex gap-3 pb-0">
                                    {/*post header section*/}
                                    <RenderPostTitle postDetails={postDetails}/>
                                </CardHeader>

                                <Divider className='mt-0'/>

                                <CardBody className='pt-0'>
                                    {/*post author details section*/}
                                    <RenderPostAuthor user={user} postDetails={postDetails} setShowEditPost={setShowEditPost}/>

                                    {showEditPost ? (
                                        <>
                                            <CustomEditor
                                                initialData={postDetails.description}
                                                onChange={handleEditPostEditorChange}
                                            />

                                            <div className="flex gap-2 mt-2">
                                                <Button color='primary'
                                                        type='submit'
                                                        size={'sm'}
                                                        isLoading={isSubmitting}
                                                        spinner={<Spinner/>}
                                                        onClick={handleEditPost}>
                                                    {isSubmitting ? 'Submitting...' : 'Edit Thread'}
                                                </Button>

                                                <Button color='default'
                                                        type='submit'
                                                        size={'sm'}
                                                        spinner={<Spinner/>}
                                                        onClick={() => setShowEditPost(false)}>
                                                    Cancel
                                                </Button>
                                            </div>
                                        </>
                                    ) : (
                                        <>
                                            <p dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(postDetails.description)}}/>

                                            {postDetails.postLikes !== undefined && (
                                                <AvatarGroup isBordered max={3}
                                                             size={'sm'}
                                                             classNames={{
                                                                 base: 'justify-items-start items-start text-blue-600'
                                                             }}
                                                             total={postDetails.postLikes.users.length}>
                                                    {postDetails.postLikes.users.map((profileUrl, index) => (
                                                        <Avatar key={index}
                                                                size={'sm'}
                                                                src={profileUrl}
                                                        />
                                                    ))}
                                                </AvatarGroup>
                                            )}
                                        </>
                                    )}
                                </CardBody>

                                {/*post actions section e.g. like, reply*/}
                                <CardFooter
                                    className="text-default-400 dark:text-white text-small justify-between pt-0">
                                    <div className="flex justify-start w-1/2">
                                        {user && (
                                            <>
                                                <span className='flex items-center mr-1 cursor-pointer'
                                                      onClick={() => setShowAddPostReplyForm(true)}>
                                                    <p className="font-semibold items-center"><ReplyIcon
                                                        width={20}/></p>
                                                    <p className="hover:underline">Reply</p>
                                                </span>
                                            </>
                                        )}

                                        <span className="flex mr-3 items-center cursor-pointer"
                                              onClick={(e) => toggleLike(postDetails.id, 'post', e)}>
                                            <p className="font-semibold">
                                               {postDetails.postLikes === undefined ? (
                                                   <>
                                                       {isLiked ? (<LikedIcon width={20}/>) : (<LikeIcon width={20}/>)}
                                                   </>
                                               ) : (
                                                   <>
                                                       {postDetails.postLikes?.users.some((likedUser) => likedUser === user?.profileUrl) ? (
                                                           <>
                                                               <LikedIcon width={20}/>
                                                           </>
                                                       ) : (
                                                           <>
                                                               {isLiked ? (<LikedIcon width={20}/>) : (
                                                                   <LikeIcon width={20}/>)}
                                                           </>
                                                       )}
                                                   </>
                                               )}
                                            </p>
                                            <p className="hover:underline">Like</p>
                                        </span>
                                    </div>

                                    <div className="flex justify-end w-1/2">
                                        {user && (
                                            <span className="flex mr-3 items-center cursor-pointer">
                                                <p className="font-semibold"><BookmarkIcon width={20}/></p>
                                                <p className="hover:underline">Save</p>
                                            </span>
                                        )}

                                        <span className="flex items-center cursor-pointer">
                                            <p className="font-semibold text-small">
                                                <ShareIcon width={20}/>
                                            </p>
                                            <p className="hover:underline">Share</p>
                                        </span>
                                    </div>
                                </CardFooter>
                            </Card>

                            {/*form to add replies to a post section*/}
                            <Card radius='sm' className='mt-5'>
                                {showAddPostReplyForm && (
                                    <>
                                        <CustomEditor
                                            initialData={postReplyRequest.description}
                                            onChange={handleAddPostReplyEditorChange}
                                        />

                                        <div className="flex gap-2 mt-2">
                                            <Button color='primary'
                                                    type='submit'
                                                    size={'sm'}
                                                    isLoading={isSubmitting}
                                                    spinner={<Spinner/>}
                                                    onClick={handleAddPostReply}>
                                                {isSubmitting ? 'Submitting...' : 'Post Comment'}
                                            </Button>

                                            <Button color='default'
                                                    type='submit'
                                                    size={'sm'}
                                                    spinner={<Spinner/>}
                                                    onClick={() => setShowAddPostReplyForm(false)}>
                                                Cancel
                                            </Button>
                                        </div>
                                    </>
                                )}
                            </Card>

                            {/*post replies sections*/}
                            <PostRepliesComponent user={user}
                                                  postDetails={postDetails}
                                                  initialPostReplies={postReplies}
                            />
                        </>
                    )
                    }
                </div>

                {/*forum stats section*/}
                <div className="w-2/12 mr-4 hidden md:block">
                    <ForumStats/>
                </div>
            </div>
        </>
    )
}