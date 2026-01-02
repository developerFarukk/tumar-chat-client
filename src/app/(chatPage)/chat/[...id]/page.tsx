// "use client"

import ConversationClient from "@/components/module/chatPage/conerationPage/ConversationClient";

// import { useParams } from "next/navigation";

const ChatePageServer = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
    // const params = useParams();
//   const id = params.id
  const { id } = await params;
  console.log(id);

  return (
    <div>
        
      <ConversationClient />
    </div>
  );
};

export default ChatePageServer;
