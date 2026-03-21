interface ScreenTemplateProps {
  children: React.ReactNode;
  className?: string;
  header?: string;
}

// function Header({ title }: { title: string }) {
//   return (
//     <div>
//       <h1 className="text-4xl font-bold tracking-tight text-zinc-100">
//         {title}
//       </h1>
//     </div>
//   );
// }

export function ScreenTemplate({
  children,
  className = "",
  header,
}: ScreenTemplateProps) {
  return (
    <div
      className={`min-h-screen flex items-center justify-center bg-[#111012] px-4 ${className}`}
    >
      {/* {header && <Header title={header} />} */}
      {children}
    </div>
  );
}
