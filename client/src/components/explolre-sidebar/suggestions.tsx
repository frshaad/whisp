import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

import SuggestionItem from './suggestion-item';

const SUGGESTED_USERS = [
  {
    id: '1',
    fullname: 'Erma Dooley',
    username: 'erma_dooley',
    link: '/',
    profileImg: 'https://i.pravatar.cc/150?img=1',
  },
  {
    id: '2',
    fullname: 'Naomi Vandervort',
    username: 'naomi_vandervort_95',
    link: '/',
    profileImg: 'https://i.pravatar.cc/150?img=2',
  },
  {
    id: '3',
    fullname: 'Florence Casper',
    username: 'florcasper',
    link: '/',
    profileImg: 'https://i.pravatar.cc/150?img=3',
  },
];

export default function Suggestions() {
  return (
    <Card className="border-none">
      <CardHeader>
        <CardTitle>Who to follow</CardTitle>
        <CardDescription>People you may know</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {SUGGESTED_USERS.map((user) => (
          <SuggestionItem key={user.id} {...user} />
        ))}
      </CardContent>
    </Card>
  );
}
