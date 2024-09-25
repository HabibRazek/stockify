import LandingPage from "@/components/landing/LandingPage";
import { unstable_setRequestLocale } from 'next-intl/server';


type Props = {
  params: { locale: string };
};

export default function Home({ params: { locale } }: Props) {
  unstable_setRequestLocale(locale);
  return (
    <div>
      <LandingPage />
    </div>
  );
}
