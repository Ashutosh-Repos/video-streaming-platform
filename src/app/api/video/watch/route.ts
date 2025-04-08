import { NextRequest, NextResponse } from "next/server";
import { userModel } from "@/app/models/user";
import { Video } from "@/app/models/video";
import { dbConnect } from "@/lib/dbConn";
import { ZodError } from "zod";
import { MongoError } from "mongodb";

export const GET = async (request: NextRequest): Promise<NextResponse> => {
  try {
    await dbConnect();

    const params = request.nextUrl.searchParams;
    const id = params.get("id") || "";
    // const page = Number(params.get("page")) || 1;
    // const limit = Number(params.get("limit")) || 10;
    // const query = params.get("query") || null;
    // const sortBy = params.get("sortBy") || "createdAt";
    // const sortType = params.get("sortType")?.toLowerCase() === "asc" ? 1 : -1;

    // const filter: Record<string, any> = {};
    // if (query) {
    //   filter.$or = [
    //     { title: { $regex: query, $options: "i" } },
    //     { description: { $regex: query, $options: "i" } },
    //   ];
    // }
    if (!id || id.trim() === "") throw new Error("null id");
    const video = await Video.findById(id);

    if (!video) {
      return NextResponse.json(
        { success: false, error: "No videos found" },
        { status: 203 }
      );
    }
    return NextResponse.json(
      {
        success: true,
        message: "Success",
        data: video,
      },
      { status: 200 }
    );
  } catch (error) {
    if (error instanceof ZodError) {
      const fieldErrors = error.errors.map((err) => ({
        field: err.path.join("."),
        message: err.message,
      }));
      return NextResponse.json(
        { success: false, error: "Invalid data format", details: fieldErrors },
        { status: 400 }
      );
    }

    if (error instanceof MongoError) {
      return NextResponse.json(
        { success: false, error: "Database error", details: error.message },
        { status: 500 }
      );
    }

    if (error instanceof Error) {
      return NextResponse.json(
        { success: false, error: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { success: false, error: "An unexpected error occurred" },
      { status: 500 }
    );
  }
};
