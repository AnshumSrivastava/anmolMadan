import LogoutButton from "./LogoutButton";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 flex h-20 items-center justify-between border-b border-zinc-800 bg-[#0A0A0A]/90 px-8 backdrop-blur-xl">

      <div>
        <h1 className="text-2xl font-bold text-white">
          Dashboard
        </h1>

        <p className="text-sm text-zinc-400">
          Portfolio CMS
        </p>
      </div>

      <LogoutButton />

    </header>
  );
}