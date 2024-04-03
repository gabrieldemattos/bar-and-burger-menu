export interface IDeleteConfirmation {
  id?: number;
  name?: string;
  openCart: boolean;
  onClose: () => void;
}
