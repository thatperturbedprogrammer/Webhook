import { Webhook } from "svix";
import { headers } from "next/headers";
import { WebhookEvent } from "@clerk/nextjs/server";

export async function POST(req: Request) {
  const SIGNING_SECRET = process.env.SIGNING_SECRET;

  if (!SIGNING_SECRET) {
    throw new Error(
      "Error: Please add SIGNING_SECRET from Clerk Dashboard to .env or .env.local"
    );
  }

  // Create new webhook instance with secret
  const wh = new Webhook(SIGNING_SECRET);

  // Get headers
  const headerPayload = await headers();
  const svix_id = headerPayload.get("svix-id");
  const svix_timestamp = headerPayload.get("svix-timestamp");
  const svix_signature = headerPayload.get("svix-signature");

  // If there are no headers, error out
  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response("Error: Missing Svix headers", {
      status: 400,
    });
  }

  // Get body
  const payload = await req.json();
  const body = JSON.stringify(payload);

  let evt: WebhookEvent;

  // Verify payload with headers
  try {
    evt = wh.verify(body, {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature,
    }) as WebhookEvent;
  } catch (err) {
    console.error("Error: Could not verify webhook:", err);
    return new Response("Error: Verification error", {
      status: 400,
    });
  }

  // Do something with payload
  // For this guide, log payload to console
  const evtData = evt.data;
  const eventType = evt.type;
  console.log(
    `Received webhook with ID ${evtData.id} and event type of ${eventType}`
  );
  //   console.log("Webhook payload:", body);
  if (!evtData) {
    return new Response("Error: Missing user ID or email addresses", {
      status: 400,
    });
  }

  // Expected Events

  // User Events
  if (eventType === "user.created") {
    console.log("Event data: ", evtData);
    console.log("id:", evtData.id);
    console.log("email address:", evtData.email_addresses[0].email_address);

    // save in mongodb
    // const user = new User({
    //   clerkUserId: id,
    //   email: evtData.email_addresses[0].email_address,
    // });

    // await user.save();
    // console.log('User saved to database');

    const user = {
      clerkUserId: evtData.id,
      email: evtData.email_addresses[0].email_address,
    };

    // Save user to your database using prisma
    // const userCreated = await createUser(user as User);
    // const savedUser = await getUserById({ id: userCreated.user?.id });
    // console.log("Saved user: ", savedUser.user?.id);
  }

  if (eventType === "user.updated") {
    console.log("Event data: ", evtData);
    console.log("id:", evtData.id);
    console.log("email address:", evtData.email_addresses[0].email_address);
  }

  if (eventType === "user.deleted") {
    console.log("Event data: ", evtData);
    console.log("id: ", evtData.id);
    console.log("email address deleted:", evtData.deleted);
  }

  // Session Events
  if (
    eventType === "session.created" ||
    eventType === "session.removed" ||
    eventType === "session.ended" ||
    eventType === "session.revoked"
  ) {
    console.log("Event data: ", evtData);
    console.log("session status :", evtData.status);
  }

  return new Response("Webhook received", { status: 200 });
}
