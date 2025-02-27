import UserPosts from '../_components/user-posts';

type Properties = {
  params: Promise<{ username: string }>;
};

export default async function ProfilePage({ params }: Properties) {
  const { username } = await params;

  return <UserPosts username={username} />;
}
