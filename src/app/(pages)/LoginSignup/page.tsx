"use client";
import React, { useState, FormEvent,useEffect } from "react";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  sendPasswordResetEmail,
} from "firebase/auth";
import { auth, db } from "./firebase";
import { setDoc, doc, getDoc } from "firebase/firestore";
import { toast } from "react-toastify";
import "./LoginSignup.css";
import user_icon from "./Assets/person.png";
import email_icon from "./Assets/email.png";
import password_icon from "./Assets/password.png";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import GoogleButton from "react-google-button";

const LoginSignup: React.FC = () => {
  const router = useRouter();
  
  const searchParams = useSearchParams();
  const urlAction = searchParams.get("action");
  const [action, setAction] = useState<string>(urlAction === "Login"?"Login":"SignUp");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [name, setName] = useState<string>("");
    useEffect(() => {
    if (urlAction === "Login" || urlAction === "SignUp") {
      setAction(urlAction);
    }
  }, [urlAction]);
  const handleLogin = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      console.log("User Logged In Successfully!!");
      toast.success("User Logged In Successfully!!", {
        position: "top-center",
      });
      router.push("/");
    } catch (error: any) {
      console.log(error.message);
      toast.error(error.message, {
        position: "bottom-center",
      });
    }
  };

  const handleSignUp = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      const user = auth.currentUser;
      console.log(user);
      console.log("executing this item");
      if (user) {
        await setDoc(doc(db, "Users", user.uid), {
          email: user.email,
          UserName: name,
        }); 
      }
      console.log("User Registered Successfully!!");
      toast.success("User Registered Successfully!!", {
        position: "top-center",
      });
      setAction("Login");
       router.replace("/LoginSignup?action=Login");
    } catch (error: any) {
      console.log(error.message);
      toast.error(error.message, {
        position: "bottom-center",
      });
    }
  };
  const handleGoogleLogin = async (): Promise<void> => {
    try {
      // Use Google Sign-In popup to authenticate the user
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      console.log("User Logged In Successfully with Google!!", result);
      toast.success("User Logged In Successfully with Google!!", {
        position: "top-center",
      });
      // Redirect to home page after successful login
      router.push("/");
    } catch (error: any) {
      // Handle login errors
      console.log(error.message);
      toast.error(error.message, {
        position: "bottom-center",
      });
    }
  };
  const handleForgotPassword = async (): Promise<void> => {
    try {
      // Check if the user is authenticated
      const user = auth.currentUser;
      if (!user) {
        // If user is not authenticated, show error message and return
        toast.error("Please SignUp first.", {
          position: "bottom-center",
        });
        return;
      }

      // Check if user email is available
      console.log(user.email);
      const userEmail = user.email;
      if (!userEmail) {
        // If user email is not available, show error message and return
        toast.error("User email not available.", {
          position: "bottom-center",
        });
        return;
      }

      // Get the user document from the database
      const userDoc = await getDoc(doc(db, "Users", user.uid));

      if (userDoc.exists()) {
        // User exists in the database, send password reset email
        await sendPasswordResetEmail(auth, userEmail);
        console.log("Password reset email sent successfully!");
        toast.success("Password reset email sent successfully!", {
          position: "top-center",
        });
      } else {
        // User does not exist in the database, show error message
        toast.error(
          "No user found with this email. Please ensure you are registered with us.",
          {
            position: "bottom-center",
          }
        );
      }
    } catch (error: any) {
      // Handle other errors
      console.log(error.message);
      toast.error(error.message, {
        position: "bottom-center",
      });
    }
  };

  return (
    <form onSubmit={action === "Login" ? handleLogin : handleSignUp} id="userform">
      <div className="container1">
        <div className="header">
          <div className="text">{action}</div>
          <div className="underline"></div>
        </div>
        <div className="inputs">
          {action === "Login" ? null : (
            <div className="input">
              <Image src={user_icon} width={20} height={20} alt="user" />
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Name"
                required
              />
            </div>
          )}
          <div className="input">
            <Image src={email_icon} height={20} width={20} alt="email" />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email Id"
              required
            />
          </div>
          <div className="input">
            <Image src={password_icon} width={20} height={20} alt="password" />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              required
            />
          </div>
        </div>
        {action === "SignUp" ? (
          <div></div>
        ) : (
          <div className="forget-password">
            Forget password?
            <span onClick={handleForgotPassword}>Click Here!</span>
          </div>
        )}
        <div className="submit-container">
          <button type="submit" className="SignUP">
            <div
              className={action === "Login" ? "submit gray" : "submit"}
              onClick={() => {
                setAction("SignUp");
              }}
            >
              SignUp
            </div>
          </button>
          <button type="submit" className="Login">
            <div
              className={action === "SignUp" ? "submit gray" : "submit"}
              onClick={() => {
                setAction("Login");
              }}
            >
              Login
            </div>
          </button>
        </div>
        <div className="google-button-container">
          {/* Render Google button only on login page */}
          {action === "Login" && (
            <GoogleButton
              onClick={handleGoogleLogin}
              style={{ width: "250px", height: "46px" }}
            />
          )}
        </div>
      </div>
    </form>
  );
};

export default LoginSignup;
