import VerifyComp from "./client";
import { toast } from "sonner";
const page = async ({
  params,
}: {
  params: Promise<{ verifyCode: string }>;
}) => {
  const { verifyCode } = await params;
  console.log(verifyCode);

  return <VerifyComp code={verifyCode} />;
};

export default page;
