export function Badge({ children }: { children: React.ReactNode }) {
  return (
    <span className="mr-2 rounded border border-green-400 bg-green-100 px-2.5 py-0.5 text-sm font-medium text-green-800">
      {children}
    </span>
  );
}
