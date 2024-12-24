import { Link } from "react-router-dom";

interface BlogCardProps {
  authorName: string;
  title: string;
  content: string;
  publishedDate: string;
  id: number
}

export const BlogCard = ({
  id,
  authorName,
  title,
  content,
  publishedDate,
}: BlogCardProps) => {
  return ( <Link to={`/blog/${id}`}>
    <div className="border-b border-slate-200 p-4 pb-4 w-screen-md cursor-pointer">
      <div className="flex">
        <div className="flex justify-center flex-col">
          <Avatar size="small" name={authorName} />
        </div>

        <div className="font-extralight pl-2 flex justify-center flex-col">{authorName}</div>

        <div className="flex justify-center flex-col pl-2 ">
            <Circle/>
        </div>

        <div className="pl-2 font-thin text-slate-500 text-sm flex justify-center flex-col">{publishedDate}</div>

      </div>
      <div className="text-xl font-bold pt-2">{title}</div>

      <div className="font-thin text-md">{content.slice(0, 100) + "..."}</div>

      <div className=" text-slate-500 text-sm font-thin pt-4">{`${Math.ceil(content.length / 100)} minute(s) read`}</div>

      
    </div>
    
    </Link>);
};

function Circle(){
    return <div className="h-0.5 w-0.5 rounded-full bg-slate-500">

    </div>
}

export function Avatar({ name, size="small" }: { name: string, size: "small" | "big" }) {
  return (
    <div>
      <div className={`relative inline-flex items-center justify-center overflow-hidden bg-gray-600 rounded-full ${size === "small" ? "w-6 h-6" : "w-10 h-10"}`}>
        <span className={`${size === "small"? "text-xs": "text-md"} text-xs font-extralight text-gray-600 dark:text-gray-300`}>
          {name[0]}
        </span>
      </div>
    </div>
  );
}
