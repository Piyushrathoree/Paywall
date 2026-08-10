import type { ReactNode } from "react";

export function Center({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="flex justify-center flex-col h-full">
      <div className="flex justify-center">{children}</div>
    </div>
  );
}
