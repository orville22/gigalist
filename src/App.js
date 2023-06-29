import { useState } from 'react';
import { songbank } from './songbank';

export default function App() {
  const [playList, setPlayList] = useState([]); //set list where the songs will be added on upon double-clicking the song in the repertoir.

  function handleDoubleClick(song) {
    console.log(song.title);
    setPlayList([...playList, song]);
  }

  function handleDelete(song) {
    setPlayList((playList) => playList.filter((curSong) => curSong !== song));
  }

  return (
    <div className="app">
      <Repertoir songs={songbank} handleDoubleClick={handleDoubleClick} />
      <PlayList playList={playList} onDelete={handleDelete} />
    </div>
  );
}

function Button({ onClick, children }) {
  return <button onClick={onClick}>{children}</button>;
}

function Repertoir({ songs, handleDoubleClick }) {
  const [showRepertoir, setShowRepertoir] = useState(false);

  return (
    <>
      {!showRepertoir && (
        <span className="toggle-open" onClick={(e) => setShowRepertoir(true)}>
          Open Repertoir
        </span>
      )}
      {showRepertoir && (
        <span className="toggle-open" onClick={(e) => setShowRepertoir(false)}>
          ❌
        </span>
      )}

      {showRepertoir && (
        <div className="repertoir">
          <h2>Repertoir</h2>
          <SongBank songs={songs} handleDoubleClick={handleDoubleClick} />
          <Button>Add Song</Button>
        </div>
      )}
    </>
  );
}

function SongBank({ songs, handleDoubleClick }) {
  return (
    <ul className="songbank">
      {songs.map((song, index) => (
        <Song song={song} index={index} handleDoubleClick={handleDoubleClick} />
      ))}
    </ul>
  );
}

function Song({ song, index, handleDoubleClick }) {
  return (
    <li className="song" onDoubleClick={() => handleDoubleClick(song)}>
      <p>
        <span>{index + 1}.</span> {song.title} - {song.artist}
      </p>
    </li>
  );
}

function PlayList({ playList, onDelete }) {
  return (
    <div className="playlist">
      <h2>Set List</h2>
      <ul>
        {playList.map((song, index) => (
          <li onDoubleClick={() => onDelete(song)} draggable>
            <span className="num">{index + 1}</span>&nbsp;&nbsp;&nbsp;
            {song.title}
          </li>
        ))}
      </ul>
    </div>
  );
}
