import { Suspense } from "react";
import Loading from "./loading";
const DashboarLayout = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <Suspense fallback={<Loading />}>
      <div className="h-full">{children}</div>
    </Suspense>
  );
};
export default DashboarLayout;
