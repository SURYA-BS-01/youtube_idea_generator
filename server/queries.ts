"use server";

import { auth } from "@clerk/nextjs/server";

import {Video, Videos, YouTubeChannels, YouTubeChannelType } from "./db/schema";
import { db } from "./db/drizzle";
import { eq } from "drizzle-orm";


// If this is a promise, we need to await it in the front end
export const getVideosForUser = async (): Promise<Video[]> => {
    const {userId} = await auth();

    if(!userId){
        throw new Error("User not authenticated");
    }

    return db.select().from(Videos).where(eq(Videos.userId, userId))
}

export const getChannelsForUser = async (): Promise<YouTubeChannelType[]> => {
    const {userId} = await auth();

    if(!userId){
        throw new Error("User not authenticated");
    }

    return db.select().from(YouTubeChannels).where(eq(YouTubeChannels.userId, userId));
}