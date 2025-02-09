import Logo from '@/components/shared/logo';

import AuthContainer from './auth-container';
import Navbar from './navbar';

type Properties = React.ComponentPropsWithoutRef<'section'>;

export default function MenuSidebar({ ...properties }: Properties) {
  return (
    <section {...properties}>
      <Logo className="flex-1" />
      <Navbar className="flex h-full flex-[4] flex-col justify-center" />
      <AuthContainer className="flex flex-1 flex-col justify-end" />
    </section>
  );
}
