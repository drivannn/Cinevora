"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";

export function TrailerModal({ videoKey, title }: { videoKey?: string; title: string }) {
  if (!videoKey) {
    return (
      <Button variant="secondary" disabled>
        Trailer unavailable
      </Button>
    );
  }

  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <Button>Watch Trailer</Button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm" />
        <Dialog.Content className="fixed left-1/2 top-1/2 z-50 w-[92vw] max-w-5xl -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-lg border border-white/10 bg-card shadow-2xl focus-visible:outline-none">
          <div className="flex items-center justify-between border-b border-white/10 px-4 py-3">
            <Dialog.Title className="text-sm font-semibold text-white">{title}</Dialog.Title>
            <Dialog.Close className="grid h-9 w-9 place-items-center rounded-full text-white/70 transition hover:bg-white/10 hover:text-white" aria-label="Close trailer">
              <X size={18} />
            </Dialog.Close>
          </div>
          <div className="aspect-video">
            <iframe
              title={`${title} trailer`}
              src={`https://www.youtube.com/embed/${videoKey}`}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="h-full w-full"
            />
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
