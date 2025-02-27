import ProfileTabs from '../_components/profile-tabs';
import UserDashboard from '../_components/user-dashboard';

type Properties = {
  params: Promise<{ username: string }>;
  children: React.ReactNode;
};

export default async function ProfilePage({ params, children }: Properties) {
  const { username } = await params;

  return (
    <div className="space-y-4">
      <UserDashboard username={username} />
      <ProfileTabs username={username} />
      {children}
    </div>
  );
}
