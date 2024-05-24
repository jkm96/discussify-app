import {getPageMetadata} from "@/lib/utils/seoUtils";
import {Metadata} from "next";
import Home from "@/components/discussify/landing/Home";
import {appName} from "@/boundary/constants/appConstants";

const title = `${appName} - Online Diary for Pet Lovers.`;
const description = `${appName} is an online diary for pet lovers. It helps you save your daily memories, download them at any time, and print them beautifully.`;

export async function generateMetadata(): Promise<Metadata> {
  return getPageMetadata(title, description);
}

async function HomePage() {
  return <Home />;
}

export default HomePage;