import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { Link } from "react-router-dom";
import "vidstack/styles/defaults.css";
import "vidstack/styles/community-skin/video.css";
import {
  MediaCommunitySkin,
  MediaPoster,
  MediaOutlet,
  MediaPlayer,
} from "@vidstack/react";

const getGoogleAuthUrl = () => {
  const url = "https://accounts.google.com/o/oauth2/v2/auth";
  const { VITE_GOOGLE_CLIENT_ID, VITE_GOOGLE_REDIRECT_URI } = import.meta.env;
  const query = {
    client_id: VITE_GOOGLE_CLIENT_ID,
    redirect_uri: VITE_GOOGLE_REDIRECT_URI,
    response_type: "code",
    scope: [
      "https://www.googleapis.com/auth/userinfo.profile",
      "https://www.googleapis.com/auth/userinfo.email",
    ].join(" "),
    prompt: "consent",
    access_type: "offline",
  };
  const queryString = new URLSearchParams(query).toString();
  return `${url}?${queryString}`;
};

const googleOAuthUrl = getGoogleAuthUrl();

export default function Home() {
  const isAuthenticated = Boolean(localStorage.getItem("access_token"));
  const logout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    window.location.reload();
  };
  return (
    <>
      <div>
        <span>
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </span>
        <span>
          <img src={reactLogo} className="logo react" alt="React logo" />
        </span>
      </div>
      <h2>Video Streaming</h2>
      {/* <video controls width={500}>
        <source
          src="http://localhost:4000/static/video-stream/d92c36ae8be9ccc470d5da200.mp4"
          type="video/mp4"
        />
      </video> */}
      <h2>HLS Streaming</h2>
      <MediaPlayer
        title=""
        src="http://localhost:4000/static/video-hls/nlphfwiPYkIuLwQnB6fkO/master.m3u8"
        //poster=""
        //thumbnails={}
        aspectRatio={16 / 9}
        crossorigin=""
      >
        <MediaOutlet>
            <MediaPoster alt="A lad"/>
          </MediaOutlet>
        <MediaCommunitySkin />
      </MediaPlayer>
      <h1>Google OAuth 2.0</h1>
      <p className="read-the-docs">
        {isAuthenticated ? (
          <>
            <span>You are logged in</span>
            <button onClick={logout}>Logout</button>
          </>
        ) : (
          <Link to={googleOAuthUrl}>Login with google</Link>
        )}
      </p>
    </>
  );
}
