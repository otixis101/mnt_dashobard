declare module "react-dropbox-chooser" {
  export interface DropboxChooserOptions {
    appKey: string;
    success: (files: DropboxFile[]) => void;
    cancel?: () => void;
    linkType?: "preview" | "direct";
    multiselect?: boolean;
    extensions?: string[];
    children: React.ReactNode;
  }

  export interface DropboxFile {
    id: string;
    name: string;
    link: string;
    bytes: number;
    icon: string;
    thumbnailLink: string;
    isDir: boolean;
    rev: string;
    clientModified: string;
    serverModified: string;
    contentHash: string;
  }

  const DropboxChooser: React.FC<DropboxChooserOptions>;
  export default DropboxChooser;
}
