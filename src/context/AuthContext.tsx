import { createContext, useContext, useState, useEffect, ReactNode } from "react"
import { auth, googleProvider } from "@/firebase/config"
import {
  onAuthStateChanged,
  User,
  signOut as firebaseSignOut,
  FacebookAuthProvider,
  signInWithPopup,
  signInWithRedirect,
  getRedirectResult
} from "firebase/auth"

interface AuthContextType {
  user: User | null
  loading: boolean
  signInWithGoogle: () => Promise<void>
  signInWithFacebook: () => Promise<void>
  signInWithEmail: (email: string) => Promise<void>
  signOut: () => Promise<void>
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!auth) {
      console.warn("Firebase Auth not initialized. Using mock auth mode.")
      setLoading(false)
      return
    }

    // Process redirect result if signInWithRedirect was used
    getRedirectResult(auth)
      .then((result) => {
        if (result?.user) {
          setUser(result.user)
        }
      })
      .catch((err) => {
        console.error("Firebase Redirect Auth Error:", err)
      })

    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser)
      setLoading(false)
    })

    return unsubscribe
  }, [])

  const signInWithGoogle = async () => {
    if (!auth) {
      throw new Error("Firebase Auth is not initialized.")
    }
    try {
      const result = await signInWithPopup(auth, googleProvider)
      if (result?.user) {
        setUser(result.user)
      }
    } catch (error: any) {
      // If popup is blocked by browser, try redirect flow
      if (error?.code === "auth/popup-blocked") {
        console.warn("Popup blocked by browser. Attempting redirect sign-in...")
        await signInWithRedirect(auth, googleProvider)
        return
      }
      throw error
    }
  }

  const signInWithFacebook = async () => {
    if (!auth) {
      throw new Error("Firebase Auth is not initialized.")
    }
    const facebookProvider = new FacebookAuthProvider()
    try {
      const result = await signInWithPopup(auth, facebookProvider)
      if (result?.user) {
        setUser(result.user)
      }
    } catch (error: any) {
      if (error?.code === "auth/popup-blocked") {
        await signInWithRedirect(auth, facebookProvider)
        return
      }
      throw error
    }
  }

  const signInWithEmail = async (email: string) => {
    setUser({
      uid: `email-user-${Date.now()}`,
      displayName: email.split("@")[0],
      email: email,
    } as User)
  }

  const signOut = async () => {
    if (!auth) {
      setUser(null)
      return
    }
    try {
      await firebaseSignOut(auth)
      setUser(null)
    } catch (error) {
      console.error("Sign-Out Error:", error)
      setUser(null)
    }
  }

  return (
    <AuthContext.Provider value={{ user, loading, signInWithGoogle, signInWithFacebook, signInWithEmail, signOut }}>
      {!loading && children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)

