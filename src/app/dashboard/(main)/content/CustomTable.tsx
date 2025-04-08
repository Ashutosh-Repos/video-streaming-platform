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
import { videoResponse } from "./page";

export interface TbCells {
  visibility: "Public" | "Private";
  date: Date;
  views: number;
  commentsCnt: number;
  title: string;
  id: string;
  thumbnail: string;
}

interface CustomTableProps {
  caption: string;
  columns: string[];
  data: videoResponse[];
}

const CustomTable = ({ caption, columns, data }: CustomTableProps) => {
  return (
    <Table>
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
                id={video._id}
              />
            </TableCell>
            <TableCell className="text-left min-w-28 w-32">
              <div className="flex w-full h-full items-center gap-2">
                {video.public ? <IconLock /> : <IconWorld />}
                <span>{video.public ? "Public" : "Private"}</span>
              </div>
            </TableCell>
            <TableCell className="text-left min-w-28 w-36">
              {video?.createdAt}
            </TableCell>
            <TableCell className="text-left min-w-16 w-20">
              <p className="pl-1.5">{video.views}</p>
            </TableCell>
            <TableCell className="text-left min-w-16 w-20">
              <p className="pl-1.5">{video.likes}</p>
            </TableCell>
            <TableCell className="text-left min-w-16 w-20">
              <p className="pl-1.5">{14}</p>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default CustomTable;
