"use client";

import { ServiceItem as ServiceItemType } from "@/types/service";

type Props = {
  item: ServiceItemType;
  index: number;
  onChange: (
    id: string,
    field: keyof ServiceItemType,
    value: string | number | boolean
  ) => void;
  onDelete: (id: string) => void;
};

export default function ServiceItem({
  item,
  index,
  onChange,
  onDelete,
}: Props) {
  return (
    <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
      <div className="mb-6 flex items-start justify-between">
        <div>
          <h2 className="text-xl font-semibold text-white">
            Service {String(index + 1).padStart(2, "0")}
          </h2>

          <p className="mt-1 text-sm text-zinc-400">
            Edit this service.
          </p>
        </div>

        <div className="flex items-center gap-4">
          <label className="flex items-center gap-2 text-sm text-zinc-300">
            <span>Active</span>

            <input
              type="checkbox"
              checked={item.is_active}
              onChange={(e) =>
                onChange(
                  item.id,
                  "is_active",
                  e.target.checked
                )
              }
              className="h-5 w-5 accent-white"
            />
          </label>

          <button
            type="button"
            onClick={() => onDelete(item.id)}
            className="rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-red-700"
          >
            Delete
          </button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div>
          <label className="mb-2 block text-sm text-zinc-300">
            Service Number
          </label>

          <input
            type="number"
            value={item.service_number}
            onChange={(e) =>
              onChange(
                item.id,
                "service_number",
                Number(e.target.value)
              )
            }
            className="w-full rounded-xl border border-zinc-700 bg-zinc-950 px-4 py-3 text-white outline-none focus:border-white"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm text-zinc-300">
            Display Order
          </label>

          <input
            type="number"
            value={item.display_order}
            onChange={(e) =>
              onChange(
                item.id,
                "display_order",
                Number(e.target.value)
              )
            }
            className="w-full rounded-xl border border-zinc-700 bg-zinc-950 px-4 py-3 text-white outline-none focus:border-white"
          />
        </div>

        <div className="md:col-span-2">
          <label className="mb-2 block text-sm text-zinc-300">
            Title
          </label>

          <input
            type="text"
            value={item.title}
            onChange={(e) =>
              onChange(item.id, "title", e.target.value)
            }
            className="w-full rounded-xl border border-zinc-700 bg-zinc-950 px-4 py-3 text-white outline-none focus:border-white"
          />
        </div>

        <div className="md:col-span-2">
          <label className="mb-2 block text-sm text-zinc-300">
            Badge
          </label>

          <input
            type="text"
            value={item.badge}
            onChange={(e) =>
              onChange(item.id, "badge", e.target.value)
            }
            className="w-full rounded-xl border border-zinc-700 bg-zinc-950 px-4 py-3 text-white outline-none focus:border-white"
          />
        </div>

        <div className="md:col-span-2">
          <label className="mb-2 block text-sm text-zinc-300">
            Description
          </label>

          <textarea
            rows={4}
            value={item.description}
            onChange={(e) =>
              onChange(
                item.id,
                "description",
                e.target.value
              )
            }
            className="w-full resize-none rounded-xl border border-zinc-700 bg-zinc-950 px-4 py-3 text-white outline-none focus:border-white"
          />
        </div>

                <div>
          <label className="mb-2 block text-sm text-zinc-300">
            Point 1
          </label>

          <input
            type="text"
            value={item.point_1}
            onChange={(e) =>
              onChange(
                item.id,
                "point_1",
                e.target.value
              )
            }
            className="w-full rounded-xl border border-zinc-700 bg-zinc-950 px-4 py-3 text-white outline-none focus:border-white"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm text-zinc-300">
            Point 2
          </label>

          <input
            type="text"
            value={item.point_2}
            onChange={(e) =>
              onChange(
                item.id,
                "point_2",
                e.target.value
              )
            }
            className="w-full rounded-xl border border-zinc-700 bg-zinc-950 px-4 py-3 text-white outline-none focus:border-white"
          />
        </div>

        <div className="md:col-span-2">
          <label className="mb-2 block text-sm text-zinc-300">
            Point 3
          </label>

          <input
            type="text"
            value={item.point_3}
            onChange={(e) =>
              onChange(
                item.id,
                "point_3",
                e.target.value
              )
            }
            className="w-full rounded-xl border border-zinc-700 bg-zinc-950 px-4 py-3 text-white outline-none focus:border-white"
          />
        </div>

        <div className="md:col-span-2">
          <label className="mb-2 block text-sm text-zinc-300">
            Button Text
          </label>

          <input
            type="text"
            value={item.button_text}
            onChange={(e) =>
              onChange(
                item.id,
                "button_text",
                e.target.value
              )
            }
            className="w-full rounded-xl border border-zinc-700 bg-zinc-950 px-4 py-3 text-white outline-none focus:border-white"
          />
        </div>
      </div>
    </div>
  );
}