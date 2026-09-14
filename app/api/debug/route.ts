import { NextResponse } from "next/server";
import { getLoanRequestsAction } from "../../../backend/actions/more-modules";

export async function GET() {
  try {
    const reqs = await getLoanRequestsAction();
    return NextResponse.json({ success: true, count: reqs?.length, reqs });
  } catch (e: any) {
    return NextResponse.json({ success: false, error: e.message, stack: e.stack });
  }
}
