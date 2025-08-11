import { type User, type PaginationInput } from '../schema';

export async function getUsers(input?: PaginationInput): Promise<{ users: User[], total: number }> {
    // This is a placeholder declaration! Real code should be implemented here.
    // The goal of this handler is fetching paginated users from the database.
    // Should exclude password_hash field in the response for security
    return Promise.resolve({
        users: [],
        total: 0
    });
}