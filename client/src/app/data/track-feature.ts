import * as chroma from 'chroma-js';

export class TrackFeatures {
	static FeatureTypes = ['danceability', 'energy', 'speechiness', 'acousticness', 'instrumentalness', 'liveness', 'valence'];

	id:string;
	featureToPercent:{} = {}; //Map object models to each feature

	constructor(objectModel:{}) //Constructor defined in track-data.ts
	{
		this.id = objectModel['id'];
		TrackFeatures.FeatureTypes.forEach((key) => 
		{
			this.featureToPercent[key] = objectModel[key];
		});
	}

	percent(feature:string) 
	{
		//Convert object model to percentage
		return (this.featureToPercent[feature]*100).toFixed() + '%';
	}

	color(featureKey:string) 
	{
		return chroma.mix('red','green', this.featureToPercent[featureKey], 'hsl');;
	}
}
