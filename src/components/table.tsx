export function Table({ children }: { children: React.ReactNode }) {
  return (
    <table className="w-full table-auto border-collapse">{children}</table>
  );
}

export function Td({ children }: { children: React.ReactNode }) {
  return (
    <td className="w-1/2 border border-slate-300 p-2 text-start">{children}</td>
  );
}
