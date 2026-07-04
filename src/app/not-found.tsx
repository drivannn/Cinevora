import Link from "next/link";
import { Button } from "@/components/ui/button";
import { EmptyState } from "@/components/shared/empty-state";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-4xl px-5 pb-20 pt-32">
      <EmptyState title="Scene not found" description="This page may have left the theater. Head back and keep exploring." />
      <div className="mt-6 flex justify-center">
        <Button asChild>
          <Link href="/">Return home</Link>
        </Button>
      </div>
    </div>
  );
}
