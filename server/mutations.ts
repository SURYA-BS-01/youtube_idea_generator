"use server";

import { and, eq } from "drizzle-orm";
import { db } from "./db/drizzle";
import { YouTubeChannels, YouTubeChannelType } from "./db/schema";
import { auth } from "@clerk/nextjs/server";

export const addChannelForUser = async (name: string): Promise<YouTubeChannelType> => {
    
    const {userId} = await auth();

    if(!userId){
        throw new Error("User not authenticated");
    }
    // using square brackets ([]) to destructure the first element of the array returned by the db.insert(...).values(...).returning() query.
    const [newChannel] = await db.insert(YouTubeChannels).values({
        name,
        userId
    }).returning(); //The .returning() method specifies that the query should return the inserted record(s).

    return newChannel;
}

export const removeChannelForUser = async (id: string): Promise<void> => {
    const {userId} = await auth();

    if(!userId){
        throw new Error("User not authenticated");
    }

    await db.delete(YouTubeChannels).where(and(eq(YouTubeChannels.userId, userId), eq(YouTubeChannels.id, id)));
}