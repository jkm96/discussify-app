import {getPageMetadata} from "@/lib/utils/seoUtils";
import {Metadata} from "next";
import Home from "@/components/discussify/Home";
import PostOverview from "@/components/discussify/posts/PostOverview";

const title = 'Pet Diaries - Online Diary for Pet Lovers.';
const description = 'Pet Diaries is an online diary for pet lovers. It helps you save your daily memories, download them at any time, and print them beautifully.';

export async function generateMetadata(): Promise<Metadata> {
  return getPageMetadata(title, description);
}

async function PostOverviewPage({ params }: { params: { postSlug: string } }) {
  return <PostOverview slug={params.postSlug} />;
}

export default PostOverviewPage;