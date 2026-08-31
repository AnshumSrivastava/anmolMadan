import {
  getContactContent,
  getContactLinks,
  getMessages,
  getMessageStats,
} from "@/services/contact";

import ContactContentForm from "./ContactContentForm";
import ContactLinksManager from "./ContactLinksManager";
import MessagesTable from "./MessagesTable";

export default async function ContactDashboardPage() {
  const [content, contactLinks, messages, stats] = await Promise.all([
    getContactContent(),
    getContactLinks(),
    getMessages(),
    getMessageStats(),
  ]);

  return (
    <div className="space-y-12">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-bold tracking-tight text-white">
          Contact & Channels
        </h1>
        <p className="mt-2 text-zinc-400">
          Manage your public contact information, dynamic connect channels, and visitor messages.
        </p>
      </div>

      {/* 1. Dynamic Contact Links Manager (Drag & Drop, Icon, Label, URL) */}
      <ContactLinksManager initialLinks={contactLinks} />

      {/* 2. Contact Content CMS (Emails, Whatsapp, Booking description) */}
      <ContactContentForm content={content} />

      {/* 3. Stats */}
      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        <StatCard title="Total Messages" value={stats.total} />
        <StatCard title="New" value={stats.new} />
        <StatCard title="Contacted" value={stats.contacted} />
        <StatCard title="Completed" value={stats.completed} />
      </div>

      {/* 4. Messages Table */}
      <div className="space-y-5">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-semibold text-white">
              Recent Messages
            </h2>
            <p className="text-zinc-400">
              Messages submitted through your portfolio booking form.
            </p>
          </div>

          <div className="rounded-xl border border-zinc-800 bg-zinc-900 px-4 py-2 text-sm text-zinc-300">
            {messages.length} Messages
          </div>
        </div>

        <MessagesTable messages={messages} />
      </div>
    </div>
  );
}

type StatCardProps = {
  title: string;
  value: number;
};

function StatCard({ title, value }: StatCardProps) {
  return (
    <div className="rounded-3xl border border-zinc-800 bg-zinc-900 p-6">
      <p className="text-sm text-zinc-400">{title}</p>
      <h3 className="mt-3 text-4xl font-bold text-white">{value}</h3>
    </div>
  );
}