import { ModeToggle } from '@/components/mode-toggle';
import { HeartPulse } from 'lucide-react';
import { Outlet } from 'react-router-dom';
export default function AuthLayout() {
  return (
    <>
      <div className="sticky top-0 z-50 bg-card/80 backdrop-blur-lg border-b border-border/50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <HeartPulse className="w-8 h-8 text-primary" />
            <h1 className="text-primary">Health From Home</h1>
          </div>
          <ModeToggle />
        </div>
      </div>
      <Outlet />
    </>
  );
}
