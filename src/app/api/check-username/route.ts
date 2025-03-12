import { NextRequest, NextResponse } from "next/server";
import { userModel, Iuser } from "@/app/models/user";
import { string, ZodError } from "zod";
import { MongoError } from "mongodb";
import { userValidation } from "@/app/zod/commonValidations";
import { dbConnect } from "@/lib/dbConn";

// use unique-names-generator instead of unique-username-generator
import {
  uniqueUsernameGenerator,
  Config,
  adjectives,
  nouns,
} from "unique-username-generator";
const usernameSuggestion = (username: string) => {
  const suggestions = new Set<string>();
  const config: Config = {
    dictionaries: [[username]],
    separator: "",
    randomDigits: 5,
    length: 10,
  };
  for (let i = 0; i < 3; i++) {
    const suggestion = uniqueUsernameGenerator(config);
    // if (!existingSet.includes(suggestion)) {
    suggestions.add(suggestion);
    // }
  }

  return Array.from(suggestions);
};

export const GET = async (req: NextRequest) => {
  try {
    await dbConnect();
    const { searchParams } = new URL(req.url);
    const username = searchParams.get("username");
    const valid_username = userValidation.parse(username);
    console.log(valid_username);
    const isExists = await userModel
      .findOne({ username: valid_username })
      .select("username");

    if (isExists) {
      // const existingUsernames = await user
      //   .find({ username: { $regex: valid_username, $options: "i" } })
      //   .select("username -_id")
      //   .limit(5);

      // const existingUsernamesList: string[] = existingUsernames.map(
      //   (d) => d.username
      // );

      const suggestions = usernameSuggestion(valid_username);
      return NextResponse.json({
        success: false,
        message: "username is not available",
        suggestions: suggestions,
      });
    }
    return NextResponse.json({
      success: true,
      message: "username is valid",
      data: { username: valid_username },
    });
  } catch (error) {
    if (error instanceof ZodError) {
      console.log(error);
      const fieldErrors = error.errors?.[0].message;
      return NextResponse.json(
        {
          success: false,
          error: "Invalid data format",
          details: fieldErrors,
        },
        { status: 400 }
      );
    }

    if (error instanceof MongoError) {
      return NextResponse.json(
        {
          success: false,
          error: "Database error",
          details: error.message,
        },
        { status: 500 }
      );
    }

    if (error instanceof Error) {
      return NextResponse.json(
        {
          success: false,
          error: error.message,
        },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        success: false,
        error: "An unexpected error occurred",
      },
      { status: 500 }
    );
  }
};
