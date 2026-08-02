import { useEffect, useMemo, useState } from "react";
import {
  Check,
  Plus,
  Star,
  Trash2,
  ListChecks,
  CalendarDays,
  X,
  Search,
  Pencil,
  Tag as TagIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";

export type Task = {
  id: string;
  title: string;
  notes: string;
  due: string; // yyyy-mm-dd or ""
  done: boolean;
  starred: boolean;
  listId: string;
  createdAt: number;
  tags?: string[];
};

export type TaskList = { id: string; name: string };

type StatusFilter = "all" | "open" | "done";

const STORAGE_KEY = "tasks.v1";

const defaultLists: TaskList[] = [
  { id: "my-tasks", name: "My Tasks" },
  { id: "work", name: "Work" },
  { id: "groceries", name: "Groceries" },
];

const uid = () => Math.random().toString(36).slice(2, 10);

const seedTasks = (): Task[] => [
  {
    id: uid(),
    title: "Draft the quarterly review",
    notes: "Pull numbers from the dashboard first.",
    due: "",
    done: false,
    starred: true,
    listId: "work",
    createdAt: Date.now() - 5000,
    tags: ["urgent", "report"],
  },
  {
    id: uid(),
    title: "Book dentist appointment",
    notes: "",
    due: "",
    done: false,
    starred: false,
    listId: "my-tasks",
    createdAt: Date.now() - 4000,
    tags: ["health"],
  },
  {
    id: uid(),
    title: "Water the plants",
    notes: "",
    due: "",
    done: true,
    starred: false,
    listId: "my-tasks",
    createdAt: Date.now() - 3000,
    tags: ["home"],
  },
  {
    id: uid(),
    title: "Oat milk, lemons, sourdough",
    notes: "",
    due: "",
    done: false,
    starred: false,
    listId: "groceries",
    createdAt: Date.now() - 2000,
    tags: [],
  },
];

function formatDue(due: string) {
  if (!due) return "";
  const d = new Date(due + "T00:00:00");
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const diff = Math.round((d.getTime() - today.getTime()) / 86400000);
  if (diff === 0) return "Today";
  if (diff === 1) return "Tomorrow";
  if (diff === -1) return "Yesterday";
  return d.toLocaleDateString(undefined, { month: "short", day: "numeric" });
}

const parseTags = (value: string) =>
  Array.from(
    new Set(
      value
        .split(",")
        .map((t) => t.trim().toLowerCase())
        .filter(Boolean),
    ),
  );

export function TaskManager() {
  const [lists, setLists] = useState<TaskList[]>(defaultLists);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [activeList, setActiveList] = useState<string>("my-tasks");
  const [draft, setDraft] = useState("");
  const [openTaskId, setOpenTaskId] = useState<string | null>(null);
  const [showDone, setShowDone] = useState(true);
  const [hydrated, setHydrated] = useState(false);
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState<StatusFilter>("all");
  const [activeTag, setActiveTag] = useState<string>("");

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as { lists: TaskList[]; tasks: Task[] };
        setLists(parsed.lists?.length ? parsed.lists : defaultLists);
        setTasks(parsed.tasks ?? []);
      } else {
        setTasks(seedTasks());
      }
    } catch {
      setTasks(seedTasks());
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ lists, tasks }));
  }, [lists, tasks, hydrated]);

  const isStarredView = activeList === "__starred";

  const allTags = useMemo(() => {
    const set = new Set<string>();
    for (const t of tasks) for (const tag of t.tags ?? []) set.add(tag);
    return Array.from(set).sort();
  }, [tasks]);

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();
    const inScope = tasks.filter((t) => {
      if (isStarredView ? !t.starred : t.listId !== activeList) return false;
      if (activeTag && !(t.tags ?? []).includes(activeTag)) return false;
      if (status === "open" && t.done) return false;
      if (status === "done" && !t.done) return false;
      if (q) {
        const hay = [t.title, t.notes, ...(t.tags ?? [])].join(" ").toLowerCase();
        if (!hay.includes(q)) return false;
      }
      return true;
    });
    return {
      open: inScope.filter((t) => !t.done).sort((a, b) => a.createdAt - b.createdAt),
      done: inScope.filter((t) => t.done).sort((a, b) => b.createdAt - a.createdAt),
    };
  }, [tasks, activeList, isStarredView, query, status, activeTag]);

  const filtersActive = Boolean(query.trim() || activeTag || status !== "all");

  const counts = useMemo(() => {
    const map: Record<string, number> = { ["__starred"]: 0 };
    for (const t of tasks) {
      if (t.done) continue;
      map[t.listId] = (map[t.listId] ?? 0) + 1;
      if (t.starred) map["__starred"] = (map["__starred"] ?? 0) + 1;
    }
    return map;
  }, [tasks]);

  const openTask = tasks.find((t) => t.id === openTaskId) ?? null;

  const addTask = () => {
    const title = draft.trim();
    if (!title) return;
    setTasks((prev) => [
      ...prev,
      {
        id: uid(),
        title,
        notes: "",
        due: "",
        done: false,
        starred: isStarredView,
        listId: isStarredView ? "my-tasks" : activeList,
        createdAt: Date.now(),
        tags: activeTag ? [activeTag] : [],
      },
    ]);
    setDraft("");
  };

  const patch = (id: string, changes: Partial<Task>) =>
    setTasks((prev) => prev.map((t) => (t.id === id ? { ...t, ...changes } : t)));

  const remove = (id: string) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
    setOpenTaskId((c) => (c === id ? null : c));
  };

  const addList = () => {
    const name = window.prompt("New list name")?.trim();
    if (!name) return;
    const id = uid();
    setLists((prev) => [...prev, { id, name }]);
    setActiveList(id);
  };

  const renameList = (id: string) => {
    const current = lists.find((l) => l.id === id);
    const name = window.prompt("Rename list", current?.name ?? "")?.trim();
    if (!name) return;
    setLists((prev) => prev.map((l) => (l.id === id ? { ...l, name } : l)));
  };

  const deleteList = (id: string) => {
    const list = lists.find((l) => l.id === id);
    const count = tasks.filter((t) => t.listId === id).length;
    const ok = window.confirm(
      `Delete "${list?.name}"${count ? ` and its ${count} task${count > 1 ? "s" : ""}` : ""}?`,
    );
    if (!ok) return;
    setTasks((prev) => prev.filter((t) => t.listId !== id));
    setLists((prev) => {
      const next = prev.filter((l) => l.id !== id);
      setActiveList((cur) => (cur === id ? (next[0]?.id ?? "__starred") : cur));
      return next;
    });
  };

  const activeName = isStarredView
    ? "Starred"
    : (lists.find((l) => l.id === activeList)?.name ?? "Tasks");

  return (
    <div className="mx-auto flex min-h-screen w-full max-w-6xl gap-8 px-4 py-10 sm:px-8">
      {/* Sidebar */}
      <aside className="hidden w-60 shrink-0 md:block">
        <div className="mb-8 flex items-center gap-2">
          <span className="grid size-8 place-items-center rounded-xl bg-primary text-primary-foreground">
            <ListChecks className="size-4" />
          </span>
          <span className="font-display text-lg tracking-tight">Tasks</span>
        </div>

        <nav className="space-y-1">
          <SidebarItem
            label="Starred"
            icon={<Star className="size-4" />}
            count={counts["__starred"] ?? 0}
            active={isStarredView}
            onClick={() => setActiveList("__starred")}
          />
          <p className="px-3 pt-5 pb-2 text-xs font-medium tracking-wide text-muted-foreground uppercase">
            Lists
          </p>
          {lists.map((l) => (
            <SidebarItem
              key={l.id}
              label={l.name}
              count={counts[l.id] ?? 0}
              active={activeList === l.id}
              onClick={() => setActiveList(l.id)}
              onRename={() => renameList(l.id)}
              onDelete={() => deleteList(l.id)}
            />
          ))}
          <button
            onClick={addList}
            className="mt-1 flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
          >
            <Plus className="size-4" /> New list
          </button>
        </nav>
      </aside>

      {/* Main */}
      <main className="min-w-0 flex-1">
        <header className="mb-6 flex flex-wrap items-end justify-between gap-3">
          <div className="flex items-end gap-2">
            <div>
              <h1 className="font-display text-3xl tracking-tight">{activeName}</h1>
              <p className="mt-1 text-sm text-muted-foreground">
                {visible.open.length} open · {visible.done.length} completed
              </p>
            </div>
            {!isStarredView && lists.some((l) => l.id === activeList) && (
              <div className="mb-1 flex gap-1">
                <button
                  onClick={() => renameList(activeList)}
                  aria-label="Rename list"
                  className="rounded-md p-1.5 text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
                >
                  <Pencil className="size-4" />
                </button>
                <button
                  onClick={() => deleteList(activeList)}
                  aria-label="Delete list"
                  className="rounded-md p-1.5 text-muted-foreground transition-colors hover:bg-destructive/10 hover:text-destructive"
                >
                  <Trash2 className="size-4" />
                </button>
              </div>
            )}
          </div>
          <div className="flex flex-wrap gap-1 md:hidden">
            {[{ id: "__starred", name: "Starred" }, ...lists].map((l) => (
              <button
                key={l.id}
                onClick={() => setActiveList(l.id)}
                className={cn(
                  "rounded-full border px-3 py-1.5 text-xs transition-colors",
                  activeList === l.id
                    ? "border-transparent bg-primary text-primary-foreground"
                    : "border-border text-muted-foreground",
                )}
              >
                {l.name}
              </button>
            ))}
          </div>
        </header>

        {/* Filters */}
        <div className="mb-4 space-y-3">
          <div className="flex flex-wrap items-center gap-2">
            <div className="flex min-w-[12rem] flex-1 items-center gap-2 rounded-xl border border-border bg-card px-3 py-2">
              <Search className="size-4 shrink-0 text-muted-foreground" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search tasks, notes, tags"
                className="w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground"
              />
              {query && (
                <button
                  onClick={() => setQuery("")}
                  aria-label="Clear search"
                  className="text-muted-foreground hover:text-foreground"
                >
                  <X className="size-4" />
                </button>
              )}
            </div>
            <div className="flex rounded-xl border border-border bg-card p-1">
              {(["all", "open", "done"] as StatusFilter[]).map((s) => (
                <button
                  key={s}
                  onClick={() => setStatus(s)}
                  className={cn(
                    "rounded-lg px-3 py-1.5 text-xs font-medium capitalize transition-colors",
                    status === s
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:text-foreground",
                  )}
                >
                  {s === "done" ? "Completed" : s}
                </button>
              ))}
            </div>
          </div>

          {allTags.length > 0 && (
            <div className="flex flex-wrap items-center gap-1.5">
              <TagIcon className="size-3.5 text-muted-foreground" />
              {allTags.map((tag) => (
                <button
                  key={tag}
                  onClick={() => setActiveTag((cur) => (cur === tag ? "" : tag))}
                  className={cn(
                    "rounded-full border px-2.5 py-1 text-xs transition-colors",
                    activeTag === tag
                      ? "border-transparent bg-primary text-primary-foreground"
                      : "border-border text-muted-foreground hover:text-foreground",
                  )}
                >
                  #{tag}
                </button>
              ))}
              {filtersActive && (
                <button
                  onClick={() => {
                    setQuery("");
                    setStatus("all");
                    setActiveTag("");
                  }}
                  className="ml-1 text-xs text-muted-foreground underline underline-offset-2 hover:text-foreground"
                >
                  Clear filters
                </button>
              )}
            </div>
          )}
        </div>

        <div className="rounded-2xl border border-border bg-card shadow-soft">
          <div className="flex items-center gap-3 border-b border-border px-4 py-3">
            <Plus className="size-5 text-muted-foreground" />
            <input
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && addTask()}
              placeholder="Add a task"
              className="w-full bg-transparent py-1 text-sm outline-none placeholder:text-muted-foreground"
            />
            {draft && (
              <button
                onClick={addTask}
                className="rounded-full bg-primary px-3 py-1.5 text-xs font-medium text-primary-foreground"
              >
                Add
              </button>
            )}
          </div>

          <ul>
            {visible.open.map((t) => (
              <TaskRow
                key={t.id}
                task={t}
                onToggle={() => patch(t.id, { done: true })}
                onStar={() => patch(t.id, { starred: !t.starred })}
                onOpen={() => setOpenTaskId(t.id)}
              />
            ))}
            {visible.open.length === 0 && (
              <li className="px-5 py-14 text-center text-sm text-muted-foreground">
                {filtersActive
                  ? "No tasks match these filters."
                  : "Nothing here. Add your first task above."}
              </li>
            )}
          </ul>

          {visible.done.length > 0 && (
            <div className="border-t border-border">
              <button
                onClick={() => setShowDone((s) => !s)}
                className="px-5 py-3 text-xs font-medium tracking-wide text-muted-foreground uppercase transition-colors hover:text-foreground"
              >
                Completed ({visible.done.length})
              </button>
              {showDone && (
                <ul className="pb-2">
                  {visible.done.map((t) => (
                    <TaskRow
                      key={t.id}
                      task={t}
                      onToggle={() => patch(t.id, { done: false })}
                      onStar={() => patch(t.id, { starred: !t.starred })}
                      onOpen={() => setOpenTaskId(t.id)}
                    />
                  ))}
                </ul>
              )}
            </div>
          )}
        </div>
      </main>

      {/* Details panel */}
      {openTask && (
        <div className="fixed inset-0 z-50 flex justify-end bg-foreground/20 backdrop-blur-[2px]">
          <div className="h-full w-full max-w-sm overflow-y-auto border-l border-border bg-card p-6 shadow-soft">
            <div className="mb-6 flex items-center justify-between">
              <span className="text-xs font-medium tracking-wide text-muted-foreground uppercase">
                Task details
              </span>
              <button
                onClick={() => setOpenTaskId(null)}
                className="rounded-md p-1 text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
                aria-label="Close details"
              >
                <X className="size-4" />
              </button>
            </div>

            <input
              value={openTask.title}
              onChange={(e) => patch(openTask.id, { title: e.target.value })}
              className="w-full border-b border-border bg-transparent pb-2 font-display text-xl tracking-tight outline-none focus:border-primary"
            />

            <textarea
              value={openTask.notes}
              onChange={(e) => patch(openTask.id, { notes: e.target.value })}
              placeholder="Add details"
              rows={5}
              className="mt-5 w-full resize-none rounded-xl border border-border bg-background p-3 text-sm outline-none focus:border-primary"
            />

            <label className="mt-5 flex items-center gap-3 rounded-xl border border-border p-3 text-sm">
              <CalendarDays className="size-4 text-muted-foreground" />
              <input
                type="date"
                value={openTask.due}
                onChange={(e) => patch(openTask.id, { due: e.target.value })}
                className="w-full bg-transparent outline-none"
              />
            </label>

            <label className="mt-3 flex items-center gap-3 rounded-xl border border-border p-3 text-sm">
              <TagIcon className="size-4 shrink-0 text-muted-foreground" />
              <input
                value={(openTask.tags ?? []).join(", ")}
                onChange={(e) =>
                  patch(openTask.id, { tags: parseTags(e.target.value) })
                }
                placeholder="tags, comma separated"
                className="w-full bg-transparent outline-none placeholder:text-muted-foreground"
              />
            </label>

            <div className="mt-6 flex items-center gap-2">
              <button
                onClick={() => patch(openTask.id, { starred: !openTask.starred })}
                className={cn(
                  "flex items-center gap-2 rounded-full border border-border px-3 py-2 text-sm transition-colors",
                  openTask.starred && "border-transparent bg-accent text-accent-foreground",
                )}
              >
                <Star
                  className={cn("size-4", openTask.starred && "fill-current")}
                />
                {openTask.starred ? "Starred" : "Star"}
              </button>
              <button
                onClick={() => remove(openTask.id)}
                className="flex items-center gap-2 rounded-full border border-border px-3 py-2 text-sm text-destructive transition-colors hover:bg-destructive/10"
              >
                <Trash2 className="size-4" /> Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function SidebarItem({
  label,
  icon,
  count,
  active,
  onClick,
  onRename,
  onDelete,
}: {
  label: string;
  icon?: React.ReactNode;
  count: number;
  active: boolean;
  onClick: () => void;
  onRename?: () => void;
  onDelete?: () => void;
}) {
  return (
    <div
      className={cn(
        "group flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm transition-colors",
        active
          ? "bg-accent font-medium text-accent-foreground"
          : "text-muted-foreground hover:bg-accent/60 hover:text-foreground",
      )}
    >
      <button onClick={onClick} className="flex min-w-0 flex-1 items-center gap-2 text-left">
        {icon}
        <span className="truncate">{label}</span>
      </button>
      {count > 0 && (
        <span className="text-xs tabular-nums group-hover:hidden">{count}</span>
      )}
      {(onRename || onDelete) && (
        <span className="hidden items-center gap-1 group-hover:flex">
          {onRename && (
            <button
              onClick={onRename}
              aria-label={`Rename ${label}`}
              className="text-muted-foreground hover:text-foreground"
            >
              <Pencil className="size-3.5" />
            </button>
          )}
          {onDelete && (
            <button
              onClick={onDelete}
              aria-label={`Delete ${label}`}
              className="text-muted-foreground hover:text-destructive"
            >
              <Trash2 className="size-3.5" />
            </button>
          )}
        </span>
      )}
    </div>
  );
}

function TaskRow({
  task,
  onToggle,
  onStar,
  onOpen,
}: {
  task: Task;
  onToggle: () => void;
  onStar: () => void;
  onOpen: () => void;
}) {
  const tags = task.tags ?? [];
  return (
    <li className="group flex items-start gap-3 border-b border-border/60 px-4 py-3 last:border-0 hover:bg-accent/40">
      <button
        onClick={onToggle}
        aria-label={task.done ? "Mark as not done" : "Mark as done"}
        className={cn(
          "mt-0.5 grid size-5 shrink-0 place-items-center rounded-full border transition-colors",
          task.done
            ? "border-primary bg-primary text-primary-foreground"
            : "border-muted-foreground/50 hover:border-primary",
        )}
      >
        {task.done && <Check className="size-3" />}
      </button>

      <button onClick={onOpen} className="min-w-0 flex-1 text-left">
        <p
          className={cn(
            "truncate text-sm",
            task.done && "text-muted-foreground line-through",
          )}
        >
          {task.title}
        </p>
        {(task.notes || task.due || tags.length > 0) && (
          <p className="mt-0.5 flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
            {task.due && (
              <span className="rounded-full bg-accent px-2 py-0.5 text-accent-foreground">
                {formatDue(task.due)}
              </span>
            )}
            {tags.map((tag) => (
              <span key={tag} className="rounded-full border border-border px-2 py-0.5">
                #{tag}
              </span>
            ))}
            {task.notes && <span className="truncate">{task.notes}</span>}
          </p>
        )}
      </button>

      <button
        onClick={onStar}
        aria-label="Star task"
        className={cn(
          "mt-0.5 shrink-0 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100 hover:text-primary",
          task.starred && "text-primary opacity-100",
        )}
      >
        <Star className={cn("size-4", task.starred && "fill-current")} />
      </button>
    </li>
  );
}
