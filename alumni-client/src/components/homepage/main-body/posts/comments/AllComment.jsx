import {useState,useEffect} from "react";
import { usePostStore } from "../../../../../store/usePostStore.js";
function AllComment({comments}) {
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
    <div className="w-full bg-gray-700 p-4 h-50 overflow-auto mt-2 rounded-xl flex flex-col gap-4">
      {completeComments?.length>0 && completeComments.map((comment) => (
        <div key={comment._id} className="flex items-center gap-4">
          <img
            src={comment?.author?.image ?? "./avatar.png"}
            alt={comment?.author?.name || "user"}
            className="w-12 h-12 rounded-full"
          />
          <div className="flex flex-col">
            <div className="font-semibold text-lg">{comment?.author?.name || "none"}</div>
            <div className="text-md text-gray-300">{comment?.content || "none"}</div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default AllComment;
