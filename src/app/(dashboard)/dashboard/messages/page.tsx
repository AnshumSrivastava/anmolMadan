import MessageTable from "@/components/dashboard/messages/MessageTable";
import { getMessages } from "@/services/contact/contact.service";

export default async function MessagesPage() {
  const messages = await getMessages();

  return (
    <div className="space-y-8">

      <h1 className="text-3xl font-bold">
        Contact Messages
      </h1>

      <MessageTable messages={messages} />

    </div>
  );
}