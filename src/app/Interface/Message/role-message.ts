export interface RoleMessage {
  [key: string]: { id: number; name?: string }[];
  pracownicy: { id: number; name?: string }[];
  dyrektor: { id: number; name?: string }[];
  sekretarz: { id: number; name?: string }[];
  zastepstwa: { id: number; name?: string }[];
  pedagog: { id: number; name?: string }[];
}
