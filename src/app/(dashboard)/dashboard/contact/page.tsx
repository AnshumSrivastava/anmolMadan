import {
  getContactContent,
  getMessages,
  getMessageStats,
} from "@/services/contact";

import ContactContentForm from "./ContactContentForm";
import MessagesTable from "./MessagesTable";

export default async function ContactDashboardPage() {
  const [content, messages, stats] = await Promise.all([
    getContactContent(),
    getMessages(),
    getMessageStats(),
  ]);

  console.log("CONTACT CONTENT:", content);

  return (
    <div className="space-y-10">
      {/* Header */}

      <div>
        <h1 className="text-4xl font-bold tracking-tight">
          Contact
        </h1>

        <p className="mt-2 text-zinc-400">
          Manage your public contact information and visitor messages.
        </p>
      </div>

      {/* Contact Information */}

      <ContactContentForm content={content} />

      {/* Stats */}

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        <StatCard
          title="Total Messages"
          value={stats.total}
        />

        <StatCard
          title="New"
          value={stats.new}
        />

        <StatCard
          title="Contacted"
          value={stats.contacted}
        />

        <StatCard
          title="Completed"
          value={stats.completed}
        />
      </div>

      {/* Messages */}

      <div className="space-y-5">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-semibold">
              Recent Messages
            </h2>

            <p className="text-zinc-400">
              Messages submitted through your portfolio.
            </p>
          </div>

          <div className="rounded-xl border border-zinc-800 bg-zinc-900 px-4 py-2 text-sm">
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
      <p className="text-sm text-zinc-400">
        {title}
      </p>

      <h3 className="mt-3 text-4xl font-bold">
        {value}
      </h3>
    </div>
  );
}