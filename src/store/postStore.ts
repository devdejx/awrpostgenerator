
import { create } from 'zustand';

type Post = {
  content: string;
  image: string | null;
  video: string | null;
  type: string;
  timestamp: string;
};

type PostState = {
  post: Post;
  setPost: (post: Post) => void;
};

export const usePostStore = create<PostState>((set) => ({
  post: {
    content: '',
    image: null,
    video: null,
    type: '',
    timestamp: '',
  },
  setPost: (post) => set({ post }),
}));
