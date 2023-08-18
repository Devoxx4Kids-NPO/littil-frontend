/**
 * Document a well-known string format.
 * This allows string properties to show what general format the content will be (if there is one).
 * The format is not enforced, it is just a hint.
 *
 * @example
 * export interface User {
 *   // Hint: The url does not have a host
 *   // Hint: The avatar is either png or jpg
 *   avatarUrl: StrHint<"/user/:id/avatar.png" | "/user/:id/avatar.jpg">;
 * }
 */
export type StrHint<T extends string> = `${T}`;
