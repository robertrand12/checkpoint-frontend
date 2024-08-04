import Link from "next/link";

export default function Header() {
  return (
    <header className="header bg-primary text-background font-bold text-center py-6">
      <h1 className="text-3xl mb-4">Checkpoint : frontend</h1>
      <Link href="/">Countries</Link>
    </header>
  );
}
