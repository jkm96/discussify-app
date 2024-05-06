import LoginForm from '@/components/auth/user/LoginForm';
import {getPageMetadata} from '@/lib/utils/seoUtils';
import {Metadata} from 'next';

const title = 'Login - Online Diary for Pet Lovers.';
const description = 'Pet Diaries helps you save your daily memories, download them at any time, and print them beautifully.';

export async function generateMetadata(): Promise<Metadata> {
  return getPageMetadata(title, description);
}

export default function LoginPage() {
  return <LoginForm />;
};
