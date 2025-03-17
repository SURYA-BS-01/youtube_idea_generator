import {google, youtube_v3} from "googleapis";

const youtube = google.youtube({
    version: "v3",
    auth: process.env.YOUTUBE_API_KEY
})

async function fetchVideoDetails(videoIds: string[]): Promise<void> {
    try {
      const response = await youtube.videos.list({
        part: ["snippet", "statistics"],
        id: videoIds,
      });
  
      console.log (
        response.data.items?.map((item) => ({
          id: { videoId: item.id! },
          snippet: item.snippet!,
          statistics: item.statistics!,
        })) || []
      );
    } catch (error) {
      console.error("Error fetching video details:", error);
    }
  }