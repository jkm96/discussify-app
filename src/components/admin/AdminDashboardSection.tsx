import {useAuth} from '@/hooks/useAuth';

function AdminDashboardSection() {
  const {user} = useAuth();

  return (
    <>
      <p>Admin Dashboard Page</p>
      <div>{JSON.stringify(user)}</div>
    </>
  );
}

export default AdminDashboardSection;