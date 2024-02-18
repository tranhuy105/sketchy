import { Navbar } from "@/components/navbar";
import Loading from "../../components/loading";
import { Suspense } from "react";
const DashboarLayout = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <div className="h-[100%-64px] relative">
      <Navbar />
      {/* <Loading /> */}

      <Suspense fallback={<Loading />}>
        <div className="h-full">{children}</div>
      </Suspense>
    </div>
  );
};
export default DashboarLayout;
