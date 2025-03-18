import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import StdVideo from "./StdVideo";
import { IconLock, IconWorld } from "@tabler/icons-react";

interface TbCells {
  visibility: "Public" | "Private";
  date: Date;
  views: number;
  commentsCnt: number;
  title: string;
  id: string;
  thumbnail: string;
  //   links: {
  //     videoUrl: string;
  //     comments: string;
  //     download: string;
  //     details: string;
  //     delete: string;
  //     analytics: string;
  //   };
}

interface CustomTableProps {
  caption: string;
  columns: string[];
  data: TbCells[];
}

const CustomTable = ({ caption, columns, data }: CustomTableProps) => {
  return (
    <Table className="overflow-hidden">
      <TableCaption>{caption}</TableCaption>
      <TableHeader>
        <TableRow>
          {columns.map((cols, index) => (
            <TableHead key={index}>{cols}</TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((video, index) => (
          <TableRow key={index} className="px-8 overflow-hidden">
            <TableCell className="w-48 min-w-48">
              <StdVideo
                title={video.title}
                thumbnail={video.thumbnail}
                id={video.id}
              />
            </TableCell>
            <TableCell className="text-left min-w-28 w-32">
              <div className="flex w-full h-full items-center gap-2">
                {video.visibility === "Private" ? <IconLock /> : <IconWorld />}
                <span>{video.visibility}</span>
              </div>
            </TableCell>
            <TableCell className="text-left min-w-28 w-36">
              {video.date.toDateString()}
            </TableCell>
            <TableCell className="text-left min-w-16 w-20">
              <p className="pl-1.5">{video.views}</p>
            </TableCell>
            <TableCell className="text-left min-w-16 w-20">
              <p className="pl-1.5">{video.commentsCnt}</p>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default CustomTable;
