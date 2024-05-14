import {getPageMetadata} from '@/lib/utils/seoUtils';
import {Metadata} from 'next';
import LogoutForm from "@/components/auth/user/LogoutForm";

const title = 'Login - Online Diary for Pet Lovers.';
const description = 'Pet Diaries helps you save your daily memories, download them at any time, and print them beautifully.';

export async function generateMetadata(): Promise<Metadata> {
  return getPageMetadata(title, description);
}

export default function LogoutPage() {
  return <LogoutForm />;
};
