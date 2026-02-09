import { ReactNode } from 'react';
import Header from './Header';
import Footer from './Footer';
import MetaPixel from '../MetaPixel';
import JsonLdLocalBusiness from '../JsonLdLocalBusiness';

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen flex flex-col">
      <JsonLdLocalBusiness />
      <MetaPixel />
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
