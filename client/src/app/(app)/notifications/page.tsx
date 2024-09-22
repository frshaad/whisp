export default function NotificationsPage() {
  return (
    <div className="space-y-4">
      {Array(3)
        .fill(undefined)
        .map((_, i) => (
          <p key={i}>Notfication {i}</p>
        ))}
    </div>
  );
}
