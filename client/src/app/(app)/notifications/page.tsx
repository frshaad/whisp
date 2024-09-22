import NotificationCard from '@/components/shared/notification-card';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

export default function NotificationsPage() {
  return (
    <Card className="border-none shadow-none">
      <CardHeader>
        <CardTitle>Notifications</CardTitle>
        <CardDescription>See what is happening</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-2">
        <NotificationCard
          type={'follow'}
          link={'/profile/mahdibahmani'}
          user={'Mahdi Bahmani'}
        />
        <NotificationCard type={'like'} link="/" user={'Mahdi Bahmani'} />
        <NotificationCard type={'like'} link="/" user={'Mahdi Bahmani'} />
        <NotificationCard
          type={'follow'}
          link={'/profile/hadinajjar'}
          user={'Hadi Najjar'}
        />
      </CardContent>
    </Card>
  );
}
