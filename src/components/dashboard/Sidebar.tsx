import NavItem from "./NavItem";

export default function Sidebar() {
  return (
    <aside className="sticky top-0 flex h-screen w-72 flex-col border-r border-zinc-800 bg-[#111111]">

        <div className="bg-[#111111] border-r border-zinc-800">

    <h1 className="text-2xl font-bold text-white">
  Portfolio CMS
</h1>
      </div>

      <nav className="flex flex-1 flex-col gap-2 overflow-y-auto p-4 custom-scrollbar">

       <NavItem href="/dashboard" label="Dashboard" />
<NavItem href="/dashboard/hero" label="Hero" />
<NavItem href="/dashboard/about" label="About" />
<NavItem href="/dashboard/vision" label="Vision" />
<NavItem href="/dashboard/note" label="Note from Anmol" />
<NavItem href="/dashboard/timeline" label="Timeline" />
<NavItem href="/dashboard/companies" label="Companies" />
<NavItem href="/dashboard/projects" label="Projects" />
<NavItem href="/dashboard/gallery" label="Gallery" />
<NavItem href="/dashboard/testimonials" label="Testimonials" />
<NavItem href="/dashboard/services" label="Services" />
<NavItem href="/dashboard/contact" label="Contact" />
      </nav>

    </aside>
  );
}