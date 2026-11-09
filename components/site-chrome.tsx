"use client";

import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

/** Renders the site header/footer around children, except inside the Sanity Studio. */
export default function SiteChrome({ header, footer, children }: { header: ReactNode; footer: ReactNode; children: ReactNode }) {
    if (usePathname().startsWith("/studio")) return <>{children}</>;
    return <>{header}{children}{footer}</>;
}
