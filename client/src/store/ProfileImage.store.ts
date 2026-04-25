import { create } from 'zustand';

interface IProfileImage {
  image: string | null;
  setImage: (img: string | null) => void;
}

const useProfileImage = create<IProfileImage>((set) => ({
  image: null,
  setImage: (img) => set({ image: img }),
}));

export default useProfileImage;
