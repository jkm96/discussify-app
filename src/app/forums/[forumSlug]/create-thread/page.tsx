import {getPageMetadata} from "@/lib/utils/seoUtils";
import {Metadata} from "next";
import CreateForumPost from "@/components/discussify/forums/CreateForumPost";

const title = 'Pet Diaries - Online Diary for Pet Lovers.';
const description = 'Pet Diaries is an online diary for pet lovers. It helps you save your daily memories, download them at any time, and print them beautifully.';

export async function generateMetadata(): Promise<Metadata> {
  return getPageMetadata(title, description);
}

async function CreatePostPage({ params }: { params: { forumSlug: string } }) {
  return <CreateForumPost slug={params.forumSlug} />;
}

export default CreatePostPage;