export interface MessageView {
  topic?: string,
  content?: string,
  from?: string,
  date?: string,
  date_read?: string,
  users?: {
    user?: string,
    read?: string|number,
  }[],
  user_id?: number,
  owner_deleted?: boolean,
  is_deleted?: boolean,
}
