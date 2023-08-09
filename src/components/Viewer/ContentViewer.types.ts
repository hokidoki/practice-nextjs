import { Content } from '@/types/api';

export default interface ContentVeiwerProps extends Content {
  editButtonOnClick: (contentId: string) => void;
  deleteContent: (contentId: string) => Promise<any>;
}
