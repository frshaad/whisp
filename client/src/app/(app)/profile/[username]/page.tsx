type Props = {
  params: { username: string };
};

export default function ProfilePage({ params: { username } }: Props) {
  return <div>{username}</div>;
}
