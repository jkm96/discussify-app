import { PetProfileResponse } from '@/boundary/interfaces/pet';
import { getPetProfiles } from '@/lib/services/pet/petProfileService';
import { toast } from 'react-toastify';

export function getUserPets(setIsLoading: (value: (((prevState: boolean) => boolean) | boolean)) => void, setPets: (value: (((prevState: PetProfileResponse[]) => PetProfileResponse[]) | PetProfileResponse[])) => void) {
  return async () => {
    setIsLoading(true);
    await getPetProfiles()
      .then((response) => {
        if (response.statusCode === 200) {
          const pets: PetProfileResponse[] = response.data;
          setPets(pets);
        }
      })
      .catch((error) => {
        toast.error(`Error fetching your pets: ${error}`);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };
}