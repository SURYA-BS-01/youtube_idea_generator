import { getVideosForUser } from "@/server/queries";
import VideoList from "@/components/VideoList";

export default async function VideosPage() {
    const videos = await getVideosForUser();

    return (
        <main>
            <VideoList initialVideos={videos}/>
        </main>
    )
}