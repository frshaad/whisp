import UserButton from './user-button';

type Properties = React.ComponentPropsWithoutRef<'div'>;

export default function AuthContainer(properties: Properties) {
  return (
    <div {...properties}>
      <UserButton />
    </div>
  );
}
