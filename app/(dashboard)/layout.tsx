import { Navbar } from "@/components/navbar";

const DashboarLayout = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <div className="h-[100%-64px] relative">
      <Navbar />
      <div className="h-full">{children}</div>
    </div>
  );
};
export default DashboarLayout;
