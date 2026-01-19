type User = {
  email: string
  password: string
}

const USERS_KEY = "souklou_users"
const AUTH_KEY = "souklou_auth"

function getUsers(): User[] {
  return JSON.parse(localStorage.getItem(USERS_KEY) || "[]")
}

function saveUsers(users: User[]) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users))
}

export async function register(data: User) {
  await new Promise((r) => setTimeout(r, 800)) // fake delay

  const users = getUsers()

  const exists = users.find((u) => u.email === data.email)
  if (exists) {
    throw new Error("User already exists")
  }

  users.push(data)
  saveUsers(users)

  return { success: true }
}

export async function login(data: User) {
  await new Promise((r) => setTimeout(r, 800))

  const users = getUsers()

  const user = users.find(
    (u) => u.email === data.email && u.password === data.password
  )

  if (!user) {
    throw new Error("Invalid credentials")
  }

  localStorage.setItem(AUTH_KEY, JSON.stringify({ email: user.email }))

  return { email: user.email }
}

export function logout() {
  localStorage.removeItem(AUTH_KEY)
}

export function getCurrentUser() {
  return JSON.parse(localStorage.getItem(AUTH_KEY) || "null")
}
