import UserPosts from '../_components/user-posts';

type Props = {
  params: { username: string };
};

export default function ProfilePage({ params: { username } }: Props) {
  return <UserPosts username={username} />;
}
