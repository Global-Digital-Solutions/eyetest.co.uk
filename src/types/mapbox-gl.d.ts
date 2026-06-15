/* eslint-disable @typescript-eslint/no-explicit-any */
declare module "mapbox-gl" {
  const mapboxgl: {
    accessToken: string;
    Map: new (options: any) => any;
    Marker: new (options?: any) => any;
    Popup: new (options?: any) => any;
    NavigationControl: new (options?: any) => any;
    AttributionControl: new (options?: any) => any;
    LngLatBounds: new () => any;
  };
  export default mapboxgl;
}

declare module "mapbox-gl/dist/mapbox-gl.css";
