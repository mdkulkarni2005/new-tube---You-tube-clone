import { Webhook } from "svix";
import { headers } from "next/headers";
import { WebhookEvent } from "@clerk/nextjs/server";
import { db } from "@/db";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function POST(req: Request) {
  const SIGNING_SECRET = process.env.CLERK_SIGNING_SECRET;

  if (!SIGNING_SECRET) {
    throw new Error(
      "Missing CLERK_SIGNING_SECRET from clerk dashboard to .env or .env.local"
    );
  }

  //Create new Svix instate with secret
  const wh = new Webhook(SIGNING_SECRET);

  // Get headers
  const headerPayload = await headers();
  const svix_id = headerPayload.get("svix-id");
  const svix_timestamp = headerPayload.get("svix-timestamp");
  const svix_signature = headerPayload.get("svix-signature");

  // Also try alternative header names that Clerk might use
  const webhook_id = svix_id || headerPayload.get("webhook-id");
  const webhook_timestamp = svix_timestamp || headerPayload.get("webhook-timestamp");
  const webhook_signature = svix_signature || headerPayload.get("webhook-signature");

  // if there are no headers error out
  if (!webhook_id || !webhook_timestamp || !webhook_signature) {
    console.error("Missing headers:", {
      svix_id,
      svix_timestamp,
      svix_signature,
      webhook_id,
      webhook_timestamp,
      webhook_signature,
      allHeaders: Object.fromEntries(headerPayload.entries())
    });
    return new Response("Missing svix headers", { status: 400 });
  }

  // Get the raw body as text (important for webhook verification)
  const body = await req.text();

  let evt: WebhookEvent;

  // verify payload with headers
  try {
    evt = wh.verify(body, {
      "svix-id": webhook_id,
      "svix-timestamp": webhook_timestamp,
      "svix-signature": webhook_signature,
    }) as WebhookEvent;
  } catch (err) {
    console.error("Error: Could not verify webhook:", err);
    return new Response("Error: Verification error", {
      status: 400,
    });
  }

  // Do something with payload
  // for this guide, log payload to console
  const eventType = evt.type;

  if (eventType === "user.created") {
    const { data } = evt;

    await db.insert(users).values({
      clerkId: data.id,
      name: `${data.first_name} ${data.last_name}`,
      imageUrl: data.image_url,
    });
  }

  if(eventType === "user.deleted") {
    const { data } = evt

    if(!data.id) {
        return new Response("Missing user id", { status: 400 })
    }

    await db.delete(users).where(eq(users.clerkId, data.id))
  }

  if(eventType === "user.updated") {
    const {data} = evt
    await db.update(users).set({
        name: `${data.first_name} ${data.last_name}`,
        imageUrl: data.image_url
    })
    .where(eq(users.clerkId, data.id))
  }

  return new Response("Webhook received", { status: 200 });
}
