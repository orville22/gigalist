import { useState } from 'react';
import { songbank } from './songbank';

export default function App() {
  const [playList, setPlayList] = useState([]); //set list where the songs will be added on upon double-clicking the song in the repertoir.

  const [playlistSize, setPlaylistSize] = useState('');

  const [showAll, setShowAll] = useState(false);

  function handleShowAll(e) {
    e.preventDefault(); //spent too much time on this. DO NOT REPEAT SAME MISTAKE
    playlistSize && setShowAll(true);
  }

  function handleDoubleClick(song) {
    if (playList.includes(song)) {
      alert('Song already in playlist. Choose a different song.');
    } else if (playList.length > Number(playlistSize)) {
      alert('Number of songs exceeds Playlist size. Delete song/s.');
    } else if (playList.length === Number(playlistSize)) {
      alert('Playlist is full.');
    } else {
      setPlayList([...playList, song]);
    }
  }

  function handleDelete(song) {
    setPlayList((playList) => playList.filter((curSong) => curSong !== song));
  }

  return (
    <div>
      <Navigation />
      <NumberOfSongs
        playlistSize={playlistSize}
        setPlaylistSize={setPlaylistSize}
        onShowAll={handleShowAll}
      />
      {showAll && (
        <div className="app">
          <Repertoir songs={songbank} handleDoubleClick={handleDoubleClick} />
          <PlayList
            playList={playList}
            onDelete={handleDelete}
            playlistSize={playlistSize}
            setPlaylistSize={setPlaylistSize}
          />
        </div>
      )}
    </div>
  );
}

function Navigation() {
  return (
    <nav className="nav-bar">
      <div className="logo">
        <h3 className="logo">
          <span>🎸</span> GigaList
        </h3>
      </div>
      <ul className="main-nav">
        <li>
          <a className="nav-item" href="../public/documentation.txt">
            Documentation{' '}
          </a>
        </li>
        <li>
          <a className="nav-item" href="../public/documentation.txt">
            Contact
          </a>
        </li>
        <li>
          <a className="nav-item" href="../public/documentation.txt">
            Login{' '}
          </a>
        </li>
      </ul>
    </nav>
  );
}

function Repertoir({ songs, handleDoubleClick }) {
  const [showRepertoir, setShowRepertoir] = useState(true);

  return (
    <div className="repertoir">
      <span className="toggle-open" onClick={(e) => setShowRepertoir(true)}>
        {!showRepertoir && '>> Song Bank'}
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

function PlayList({ playList, onDelete, playlistSize, setPlaylistSize }) {
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

function NumberOfSongs({ playlistSize, setPlaylistSize, onShowAll }) {
  return (
    <form className="playlistSize" onSubmit={onShowAll}>
      <label htmlFor="playlistSize">Enter set list size: &nbsp; </label>
      <input
        type="number"
        id="playlistSize"
        name="playlistSize"
        min="5"
        max="15"
        value={playlistSize}
        onChange={(e) => setPlaylistSize(e.target.value)}
      />
    </form>
  );
}
