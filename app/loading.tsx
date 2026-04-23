export default function Loading() {
  return (
    <div className="space-y-4 px-4 py-8 lg:px-10">
      <div className="h-24 skeleton rounded-xl" />
      <div className="h-64 skeleton rounded-2xl" />
      <div className="grid gap-4 md:grid-cols-2">
        <div className="h-48 skeleton rounded-xl" />
        <div className="h-48 skeleton rounded-xl" />
      </div>
    </div>
  );
}
