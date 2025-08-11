import { type CreateUserInput, type User } from '../schema';

export async function createUser(input: CreateUserInput): Promise<User> {
    // This is a placeholder declaration! Real code should be implemented here.
    // The goal of this handler is creating a new user with hashed password and persisting it in the database.
    // Password should be hashed using bcrypt or similar before storing
    return Promise.resolve({
        id: 1,
        email: input.email,
        name: input.name,
        role: input.role || 'user',
        password_hash: 'hashed_password_placeholder', // Should be actual hashed password
        is_active: true,
        created_at: new Date(),
        updated_at: new Date()
    } as User);
}