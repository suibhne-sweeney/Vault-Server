## [1.8.2] - (2025-03-11)
- patch playlist.js file
- patch song.js file
- patch user.js file

## [1.8.2] - (2024-09-26)
- patch getPlaylist to populate user
- patch createSong to see artist's name

## [1.8.1] - (2024-08-30)
- remove username, stagename fields 

## [SCRUM-8] - [1.8.0] - (2024-07-27)
- add getUserLikedPlaylists controller function
- add GET getUserLikedPlaylists route

## [SCRUM-10] - [1.7.0] - (2024-07-27)
- add getAllPlaylists controller function
- add GET getAllPlaylists route
- introduced ticket id to CHAGELOG updates

## [1.6.0] - (2024-07-27)
- add getLikedSongs controller function
- add GET getLikedSongs route 

## [1.5.0] - (2024-07-27)
- add MIT LICENCE
- move code from "MusicStreamingProject" repo to Vault-Server repo

## [1.4.0] - (2024-07-26)
- add PATCH API routes for getAllSongs
- add getAllSongs controller function 

## [1.3.0] - (2024-07-26)
- add populate to getPlaylist API function
- add patch API routes for addSong
- add controller addSong

## [1.2.0] - (2024-07-25)
- refactored getAllPlaylists to getAllUserPlaylists
- add likePlaylist logic in controller
- add path in playlists routes (PATCH API)

## [1.1.0] - (2024-07-25)
- add likeSong logic in controller
- add path in song routes (PATCH API)

## [1.0.0] - (2024-07-24)
- created server directory
- add contollers, middlware, routes, and models directories
- add API'S (regiseter, login, getUser, getFollowing, createPlayList, getAllPlaylists, getPlaylist, createSong, followOrUnfollow, getFollowers)