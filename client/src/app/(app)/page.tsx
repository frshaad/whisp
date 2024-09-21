import Post from '@/components/post';

export default function HomePage() {
  return (
    <div className="space-y-4">
      {Array(5)
        .fill(undefined)
        .map((_, i) => (
          <Post
            key={i}
            user={{
              fullname: 'Amy Franecki',
              username: 'maudie_schulist',
              link: '/',
              profileImg: 'https://i.pravatar.cc/150?img=12',
            }}
            post={{
              time: '13h',
              content:
                'Officiis iste nemo debitis labore repellendus beatae. Tenetur blanditiis tempore voluptatum at. Quaerat doloremque nulla aut nesciunt. Placeat dolore autem corrupti officiis officia eligendi non dolores. Minima blanditiis molestiae illo nobis cum maiores eligendi.',
              likes: [],
              comments: [],
              reposts: [],
            }}
          />
        ))}
    </div>
  );
}
