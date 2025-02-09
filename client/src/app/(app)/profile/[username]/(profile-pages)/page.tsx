import UserPosts from '../_components/user-posts';

type Properties = {
  params: { username: string };
};

export default function ProfilePage({ params: { username } }: Properties) {
  return <UserPosts username={username} />;
}
