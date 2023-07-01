import { useState } from 'react';
import { songbank } from './songbank';

export default function App() {
  const [playList, setPlayList] = useState([]); //set list where the songs will be added on upon double-clicking the song in the repertoir.

  function handleDoubleClick(song) {
    if (playList.includes(song)) {
      alert('Song already in playlist. Choose a different song.');
    } else if (playList.length === 12) {
      alert('Playlist is full.');
    } else {
      setPlayList([...playList, song]);
    }
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

function Repertoir({ songs, handleDoubleClick }) {
  const [showRepertoir, setShowRepertoir] = useState(false);

  return (
    <div className="repertoir">
      <span className="toggle-open" onClick={(e) => setShowRepertoir(true)}>
        {!showRepertoir && 'Open Song Bank'}
      </span>
      <span className="toggle-open" onClick={(e) => setShowRepertoir(false)}>
        {showRepertoir && '❌'}
      </span>
      {showRepertoir && (
        <>
          <h2>Song Bank</h2>
          <SongBank songs={songs} handleDoubleClick={handleDoubleClick} />
          <FormAddSong />
        </>
      )}
    </div>
  );
}

function FormAddSong() {
  return (
    <form>
      <label>Song Title</label>
      <input type="text" />

      <label>Artist</label>
      <input type="text" />

      <label>Genre</label>
      <input type="text" />

      <label>Lyrics URL</label>
      <input type="text" placeholder="Optional" />

      <button>Add Song</button>
    </form>
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
            {song.title}{' '}
            <a
              href={song.lyrics}
              target="_blank"
              rel="noreferrer"
              className="lyrics"
            >
              Lyrics
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
