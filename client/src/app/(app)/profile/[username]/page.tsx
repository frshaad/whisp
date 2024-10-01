import UserDashboard from './user-dashboard';
import UserPosts from './user-posts';

type Props = {
  params: { username: string };
};

export default function ProfilePage({ params: { username } }: Props) {
  return (
    <div className="space-y-5">
      <UserDashboard username={username} />
      <UserPosts username={username} />
    </div>
  );
}
