export enum MediaKind {
  video,
  image
}

export interface Media {
  url: string;
  webmUrl: string;
  mp4Url: string;
  kind: MediaKind;
}
