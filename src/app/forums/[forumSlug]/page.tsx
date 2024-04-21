import {getPageMetadata} from "@/lib/utils/seoUtils";
import {Metadata} from "next";
import ForumOverview from "@/components/discussify/forums/ForumOverview";

const title = 'Pet Diaries - Online Diary for Pet Lovers.';
const description = 'Pet Diaries is an online diary for pet lovers. It helps you save your daily memories, download them at any time, and print them beautifully.';

export async function generateMetadata(): Promise<Metadata> {
  return getPageMetadata(title, description);
}

async function ForumOverviewPage({ params }: { params: { forumSlug: string } }) {
  return <ForumOverview slug={params.forumSlug} />;
}

export default ForumOverviewPage;