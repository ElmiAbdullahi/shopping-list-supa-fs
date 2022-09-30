const SUPABASE_URL = 'https://yxozyvtjmgeaxoodiilz.supabase.co';
const SUPABASE_KEY =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl4b3p5dnRqbWdlYXhvb2RpaWx6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjQyOTk2MjAsImV4cCI6MTk3OTg3NTYyMH0.kaNSwsdS0lbM9dP-VHXYLpxUrW1QS5QnV7StDn46ybo';
const client = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

/* Auth related functions */

export function getUser() {
    return client.auth.user();
}

export async function signUpUser(email, password) {
    return await client.auth.signUp({
        email,
        password,
    });
}

export async function signInUser(email, password) {
    return await client.auth.signIn({
        email,
        password,
    });
}

export async function signOutUser() {
    return await client.auth.signOut();
}

/* Data functions */
export async function createItem(item) {
    return await client.from('lists').insert(item).single();
}
export async function getItems() {
    return await client.from('lists').select('*').order('created_at');
}
export async function completeItems(id) {
    return await client.from('lists').update({ bought: true }).eq('id', id).single();
}
