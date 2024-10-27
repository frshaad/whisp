import ProfileTabs from '../_components/profile-tabs';
import UserDashboard from '../_components/user-dashboard';

type Props = {
  params: { username: string };
  children: React.ReactNode;
};

export default function ProfilePage({ params: { username }, children }: Props) {
  return (
    <div className="space-y-4">
      <UserDashboard username={username} />
      <ProfileTabs username={username} />
      {children}
    </div>
  );
}
