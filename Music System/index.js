// Music

// import mongoose from "mongoose";
// const MONGO_URL = "mongodb://127.0.0.1/MusicTest"

// const connect = async() => {
//     try {
//         await mongoose.connect(MONGO_URL)
//         console.log("DB Connected")
//     } catch (error) {
//         console.log("Error to connect to Mongoose", error.message)
//     }

// }

// export default connect;



// import mongoose from 'mongoose';

// const songSchema = new mongoose.Schema({
//   Songname: String,
//   Film: String,
//   Music_director: String,
//   singer: String,
//   Actor: String,
//   Actress: String,
// });

// const Song = mongoose.model('Song', songSchema);

// export default Song;

// index.js


// import express from 'express';
// import cors from 'cors';
// import connect from './models/db.js';
// import Routes from './routes.js';

// const app = express()

// const PORT = 5000
// const corsOptions = {
//     origin: "http://localhost:5173"
// }

// app.use(cors(corsOptions));
// app.use(express.json())
// app.use('/', Routes)

// connect()
// app.listen(PORT, () => {
//     console.log(`Server listening on ${PORT}`)
// })


// routes.js

// import express from "express";
// import Song from "./models/songSchema.js";




// const router = express.Router();

// router.post("/insert", async (req, res) => {
//     try {
//         const { Songname, Film, Music_director, singer } = req.body;

//         const data = await Song.create({
//             Songname,
//             Film,
//             Music_director,
//             singer,
//         });

//         res.status(200).json({ msg: "Song Added successfully" });
//     } catch (error) {
//         res.status(500).json({ msg: "Internal Server ERROR in insert" });
//     }
// });

// router.get("/list", async (req, res) => {
//     try {
//         const songs = await Song.find();
//         res.status(200).json({ songs });
//     } catch (err) {
//         res.status(500).send("Error listing documents in list");
//     }
// });

// router.get("/specific/:dir", async (req, res) => {
//     try {
//         const Music_director = req.params.dir;

//         const songs = await Song.find({ Music_director });
//         const Songs = songs.map(song => song.Songname)
//         res.status(200).json({ Songs });
//     } catch (err) {
//         res.status(500).send("Error listing documents in list");
//     }
// });

// router.post("/dirandsong", async (req, res) => {
//     try {
//         const songs = await Song.find({
//             Music_director: req.body.dirname,
//             singer: req.body.singerName,
//         });
//         const Songs = songs.map(song => song.Songname)
//         res.status(200).json({ Songs });
//     } catch (err) {
//         console.log(err);
//         res.status(500).send("Error listing documents in list");
//     }
// });

// router.delete("/delete/:Songname", async (req, res) => {
//     try {
//         const { Songname } = req.params;
//         await Song.deleteMany({ Songname });
//         res.send("Song deleted successfully");
//     } catch (err) {
//         res.status(500).send(err.message);
//     }
// });

// router.patch('/update/:Songname', async (req, res) => {

//     try {
//         const { Songname } = req.params;
//         const { actorname, actressname } = req.body;
//         await Song.updateOne({ Songname }, { Actor: actorname, Actress: actressname });

//         res.status(200).json({ msg: "song updated successfully" });
//     } catch (err) {
//         res.status(500).send(err.message);
//     }
// });


// export default router







// import { useEffect, useState } from "react";
// import axios from "axios";
// import "./App.css";

// const BACK_API = "http://localhost:5000";

// function App() {
//   const [songs, setSongs] = useState([]);
//   const [dirandsonglist, setDirandsonglist] = useState([]);
//   const [dirlist, setDirlist] = useState([]);
//   const [dir, setdir] = useState("");
//   const [delSongName, setdelSongName] = useState("");
//   const [dirname, setDirname] = useState("");
//   const [singerName, setSingerName] = useState("");
//   const [actorname, setActorname] = useState("");
//   const [actressname, setActressname] = useState("");
//   const [songName, setSongName] = useState("");

//   const [formData, setFormData] = useState({
//     Songname: "",
//     Film: "",
//     Music_director: "",
//     singer: "",
//     Actor: "",
//     Actress: "",
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({
//       ...formData,
//       [name]: value,
//     });
//   };

//   const handleInsertData = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await axios.post(`${BACK_API}/insert`, formData);
//       setFormData({
//         Songname: "",
//         Film: "",
//         Music_director: "",
//         singer: "",
//         Actor: "",
//         Actress: "",
//       });
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   const handleActorActressAdd = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await axios.patch(`${BACK_API}/update/${songName}`, {
//         actorname,
//         actressname,
//       });
//       setActorname("");
//       setActressname("");
//       setSongName("");
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   const handleDelete = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await axios.delete(`${BACK_API}/delete/${delSongName}`);
//       setdelSongName("");
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   const handleSearchByDir = async (e) => {
//     e.preventDefault();

//     try {
//       const response = await axios.get(`${BACK_API}/specific/${dir}`);
      
//       // console.log(response.data.songs);
//       setDirlist(response.data.Songs);
//       setdir("");
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   const handleSearchByDirAndSing = async (e) => {
//     e.preventDefault();

//     try {
//       const response = await axios.post(`${BACK_API}/dirandsong`, {
//         singerName,
//         dirname,
//       });
//       setDirandsonglist(response.data.Songs);
//       setDirname("")
//       setSingerName("")

//     } catch (error) {
//       console.log(error);
//     }
//   };

//   useEffect(() => {
//     const fetchData = async () => {
//       const response1 = await axios.get(`${BACK_API}/list`);
//       setSongs(response1.data.songs);
//     };
//     fetchData();
//   }, [formData, delSongName, actorname, actressname]);

//   return (
//     <>
//       <div>
//         <h2>Add Songs</h2>
//         <form onSubmit={handleInsertData}>
//           <div>
//             <label>Song:</label>
//             <input
//               type="text"
//               name="Songname"
//               value={formData.Songname}
//               onChange={handleChange}
//               required
//             />
//           </div>
//           <div>
//             <label>Film:</label>
//             <input
//               type="text"
//               name="Film"
//               value={formData.Film}
//               onChange={handleChange}
//               required
//             />
//           </div>
//           <div>
//             <label>Director:</label>
//             <input
//               type="text"
//               name="Music_director"
//               value={formData.Music_director}
//               onChange={handleChange}
//               required
//             />
//           </div>
//           <div>
//             <label>singer:</label>
//             <input
//               type="text"
//               name="singer"
//               value={formData.singer}
//               onChange={handleChange}
//               required
//             />
//           </div>

//           <button type="submit">Add Song</button>
//         </form>
//       </div>

//       <div>
//         <h2>List Director Song</h2>
//         <form onSubmit={handleSearchByDir}>
//           <label>Enter Director name:</label>
//           <input
//             type="text"
//             value={dir}
//             onChange={(e) => setdir(e.target.value)}
//             required
//           />
//           <button type="submit">Search by Director</button>
//         </form>
//       </div>

//       <div>
//         <h2>Delete Song</h2>
//         <form onSubmit={handleDelete}>
//           <label>Song Name </label>
//           <input
//             type="text"
//             value={delSongName}
//             onChange={(e) => setdelSongName(e.target.value)}
//             required
//           />
//           <button type="submit">Delete Song</button>
//         </form>
//       </div>

//       <div>
//         <h2>Search by director & singer </h2>
//         <form onSubmit={handleSearchByDirAndSing}>
//           <div>
//             <label>Director Name:</label>
//             <input
//               type="text"
//               value={dirname}
//               onChange={(e) => {
//                 setDirname(e.target.value);
//               }}
//               required
//             />
//           </div>
//           <div>
//             <label>Singer Name:</label>
//             <input
//               type="text"
//               value={singerName}
//               onChange={(e) => {
//                 setSingerName(e.target.value);
//               }}
//               required
//             />
//           </div>
//           <button type="submit">Search</button>
//         </form>
//       </div>

//       <div>
//         <h2>Add Actors & actress</h2>
//         <form onSubmit={handleActorActressAdd}>
//           <div>
//             <label>Song Name:</label>
//             <input
//               type="text"
//               value={songName}
//               onChange={(e) => {
//                 setSongName(e.target.value);
//               }}
//               required
//             />
//           </div>
//           <div>
//             <label>Actor Name:</label>
//             <input
//               type="text"
//               value={actorname}
//               onChange={(e) => {
//                 setActorname(e.target.value);
//               }}
//               required
//             />
//           </div>
//           <div>
//             <label>Actress Name:</label>
//             <input
//               type="text"
//               value={actressname}
//               onChange={(e) => {
//                 setActressname(e.target.value);
//               }}
//               required
//             />
//           </div>
//           <button type="submit">Add</button>
//         </form>
//       </div>

//       {songs && (
//         <div>
//           <h2>Songs Database</h2>
//           <h3>Total Songs : {songs.length}</h3>
//           <table>
//             <thead>
//               <tr>
//                 <th>SongName</th>
//                 <th>FilmName</th>
//                 <th>MusicDirector</th>
//                 <th>Singer</th>
//                 <th>Actor</th>
//                 <th>Actress</th>
//               </tr>
//             </thead>
//             <tbody>
//               {songs &&
//                 songs.map((song, index) => (
//                   <tr key={index}>
//                     <td>{song.Songname}</td>
//                     <td>{song.Film}</td>
//                     <td>{song.Music_director}</td>
//                     <td>{song.singer}</td>
//                     <td>{song.Actor}</td>
//                     <td>{song.Actress}</td>
//                   </tr>
//                 ))}
//             </tbody>
//           </table>
//         </div>
//       )}

//       {dirandsonglist && (
//         <div>
//           <h2>List specified Music Director & singer Songs</h2>
//           <h3>Total Songs : {dirandsonglist.length}</h3>
//           <table>
//             <thead>
//               <tr>
//                 <th>Name</th>
//               </tr>
//             </thead>
//             <tbody>
//               {dirandsonglist &&
//                 dirandsonglist.map((name, index) => (
//                   <tr key={index}>
//                     <td>{name}</td>
//                   </tr>
//                 ))}
//             </tbody>
//           </table>
//         </div>
//       )}

//       {dirlist && (
//         <div>
//           <h2>List specified Music Director songs</h2>
//           <h3>Total Songs : {dirlist.length}</h3>
//           <table>
//             <thead>
//               <tr>
//                 <th>Name</th>
//               </tr>
//             </thead>
//             <tbody>
//               {dirlist &&
//                 dirlist.map((name, index) => (
//                   <tr key={index}>
//                     <td>{name}</td>
//                   </tr>
//                 ))}
//             </tbody>
//           </table>
//         </div>
//       )}
//     </>
//   );
// }

// export default App;



// form{
//     display: flex;
//     flex-direction: column;
//     justify-items: center;
//     align-items: center;
// }

// input{
//     width: 500px;
//     padding: 4px;
//     margin: 7px;
// }

// h2{
//     text-align: center;
//     margin-bottom: 20px;
// }
// h3{
//     text-align: center;
// }

// button{
//     color: blue;
//     background-color: yellow;
//     padding: 10px;
//     margin: 10px;
//     font-size: large;

// }

// table {
//     border-collapse: collapse;
//     min-width: 25%;
//     margin-bottom: 20px;
//     margin: auto;
//   }
//   th, td {
//     border: 1px solid #dddddd;
//     padding: 8px;
//     text-align: center;
//   }
//   th {
//     background-color: #fdfbfb;
//   }
//   /* tr:nth-child(even) {
//     background-color: #2b1616;
//   } */
//   tr:hover {
//     background-color: #fdfbfb;
//   }

//   li{
//     list-style-type: none;
//     text-align: center;
//     font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
//     font-size: x-large;
//   }