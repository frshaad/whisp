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
          link="/profile/mahdibahmani"
          type="follow"
          user="Mahdi Bahmani"
        />
        <NotificationCard link="/" type="like" user="Mahdi Bahmani" />
        <NotificationCard link="/" type="like" user="Mahdi Bahmani" />
        <NotificationCard
          link="/profile/hadinajjar"
          type="follow"
          user="Hadi Najjar"
        />
      </CardContent>
    </Card>
  );
}
