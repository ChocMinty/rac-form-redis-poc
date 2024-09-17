import { ReactNode } from "react";
import Link from "next/link";
import styles from "./layout.module.css";

interface LayoutProps {
  children: ReactNode;
}

export const metadata = {
  title: "Multi-step Form",
  description: "A multi-step form application",
};

export default function RootLayout({ children }: LayoutProps) {
  return (
    <html lang="en">
      <body>
        <div className={styles.container}>
          <aside className={styles.sidebar}>
            <h2>Form Steps</h2>
            <ul>
              <li>
                <Link href="/step1">Step 1</Link>
              </li>
              <li>
                <Link href="/step2">Step 2</Link>
              </li>
              <li>
                <Link href="/summary">Summary</Link>
              </li>
            </ul>
          </aside>
          <main className={styles.content}>{children}</main>
        </div>
      </body>
    </html>
  );
}
