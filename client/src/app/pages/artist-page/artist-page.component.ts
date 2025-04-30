import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ArtistData } from '../../data/artist-data';
import { TrackData } from '../../data/track-data';
import { AlbumData } from '../../data/album-data';
import { SpotifyService } from '../../services/spotify.service';//am I supposed to add this?
@Component({
  selector: 'app-artist-page',
  templateUrl: './artist-page.component.html',
  styleUrls: ['./artist-page.component.css']
})
export class ArtistPageComponent implements OnInit {
	artistId:string;
	artist:ArtistData;
	relatedArtists:ArtistData[];
	topTracks:TrackData[];
	albums:AlbumData[];

  constructor(private route: ActivatedRoute, private spotifyService: SpotifyService) { }

  ngOnInit() {
  	this.artistId = this.route.snapshot.paramMap.get('id');
    //TODO: Inject the spotifyService and use it to get the artist 
    this.spotifyService.getArtist(this.artistId).then((info)=>{this.artist = info;});
    this.spotifyService.getRelatedArtists(this.artistId).then((info) => {this.relatedArtists = info;});
    this.spotifyService.getTopTracksForArtist(this.artistId).then((info)=>{this.topTracks = info;});
    this.spotifyService.getAlbumsForArtist(this.artistId).then((info)=>{this.albums = info;});
  }
}
