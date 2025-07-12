import { useState, useEffect } from "react";
import { usePostStore } from "../../../../../store/usePostStore.js";

function AllComment({ comments }) {
  const [completeComments, setCompleteComments] = useState([]);
  const { getCompleteComments } = usePostStore();

  useEffect(() => {
    async function fetchData() {
      const completeComments = await getCompleteComments(comments);
      setCompleteComments(completeComments);
    }
    fetchData();
  }, [comments]);

  return (
    <div className="w-full bg-white dark:bg-zinc-800 p-4 h-50 overflow-auto mt-2 rounded-xl flex flex-col gap-4 transition-colors">
      <h1 className="text-lg pt-2 pb-3 font-[500] text-black dark:text-white transition-colors">
        All Comments
      </h1>

      {completeComments?.length > 0 &&
        completeComments.map((comment) => (
          <div key={comment._id} className="flex items-center gap-4">
            <img
              src={comment?.author?.image ?? "./avatar.png"}
              alt={comment?.author?.name || "user"}
              className="w-11 h-11 rounded-full"
            />
            <div className="flex flex-col">
              <div className="font-[500] text-[15px] text-gray-800 dark:text-gray-100 hover:underline cursor-pointer transition-colors">
                {comment?.author?.name || "none"}
              </div>
              <div className="text-sm text-gray-500 dark:text-gray-400 font-[300] transition-colors">
                {comment?.content || "none"}
              </div>
            </div>
          </div>
        ))}
    </div>
  );
}

export default AllComment;
