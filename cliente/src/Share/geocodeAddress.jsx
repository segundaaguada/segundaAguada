import Geocode from "react-geocode";
import { googleMapKey } from "../env/env";

const geocodeAddress = (address) => {
  Geocode.setApiKey(googleMapKey);
  Geocode.setLanguage("es");

  Geocode.fromAddress(address).then(
    (response) => {
      const { lat, lng } = response.results[0].geometry.location

      return ({ lat: lat, lng: lng })
    },
    (error) => {
      console.error(error);
    }
  );
};

export default geocodeAddress