import { NextRequest, NextResponse } from "next/server";
import { userDataParser } from "@/app/zod/zodParsingSchemas/userPost";
import { user } from "@/app/models/user";
import dbConnect from "@/lib/dbConn";
import bcrypt from "bcryptjs";
import hyperid from "hyperid";
import nodemailer from "nodemailer";
import EmailVerify from "@/components/template/EmailVerify";
import { render } from "@react-email/components";
import { ZodError } from "zod";
import { MongoError } from "mongodb";
import { error } from "console";

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.DOMAIN_EMAIL,
    pass: process.env.EMAIL_APP_PASSWORD,
  },
});

const sendVerificationEmail = async (
  toEmail: string,
  fullname: string,
  verifyCode: string
): Promise<void> => {
  try {
    const htmlEmail = await render(
      EmailVerify({ username: fullname, verifyLink: verifyCode })
    );
    const options = {
      from: "ashu9226kumar@gmail.com",
      to: toEmail,
      subject: "Email Verification",
      html: htmlEmail,
    };
    const info = await transporter.sendMail(options);
  } catch (error) {
    console.error("Email sending error:", error);
    throw new Error("Failed to send verification email");
  }
};

export const POST = async (request: NextRequest): Promise<NextResponse> => {
  try {
    await dbConnect();
    const body = await request.json();
    const { email, fullname, password, age, gender } =
      userDataParser.parse(body);

    const existingUser = await user.findOne({ email });
    if (existingUser?.verified) {
      return NextResponse.json({
        success: false,
        message: "User with this email already exists",
      });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const code = await hyperid({ urlSafe: true }).uuid;

    if (existingUser) {
      Object.assign(existingUser, {
        fullname,
        password: hashedPassword,
        age,
        gender,
        verifyCode: code,
      });
      await existingUser.save();

      await sendVerificationEmail(email, fullname, code);

      return NextResponse.json({
        success: true,
        message: "Verification code resent to email",
      });
    }

    // Create new user if not found
    const newUser = await user.create({
      fullname,
      email,
      password: hashedPassword,
      age,
      gender,
      verified: false,
      verifyCode: code,
    });
    if (!newUser) throw error("unable to new user server error");

    await sendVerificationEmail(email, fullname, code);

    return NextResponse.json({
      success: true,
      message:
        "User created successfully, verification link sent (valid for 1 hour)",
      data: {
        ...newUser,
        password: undefined,
        verifyCode: undefined,
      },
    });
  } catch (error) {
    if (error instanceof ZodError) {
      const fieldErrors = error.errors.map((err) => ({
        field: err.path.join("."),
        message: err.message,
      }));
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
