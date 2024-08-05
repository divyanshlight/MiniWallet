import React, { useEffect, useState } from "react";
import styles from "./SignupLogin.module.css";
import Image from "next/image";
import { HiSquares2X2 } from "react-icons/hi2";
import { HiOutlineSearch } from "react-icons/hi";
import { FaUser } from "react-icons/fa";
import { IoMdLock, IoMdEye, IoMdEyeOff } from "react-icons/io";
import { AiFillApple } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { TfiFacebook } from "react-icons/tfi";
import CreateWallet from "../CreateWallet/CreateWallet";
import { useRouter } from "next/router";
import LoadingScreen from "../LoadingScreen/LoadingScreen";

function SignupLogin() {
  const [showPassword, setShowPassword] = useState(false);
  const [showLogin, setShowLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const walletAddress = localStorage.getItem("walletAddress");
    if (walletAddress) {
      setLoading(true);
      router.push("/dashboard");
    }
  }, [router]);

  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const handleSignIn = () => {
    setShowLogin(false);
  };

  return (
    <>
      {showLogin ? (
        <>
          {!loading ? (
            <div className={styles.mainPage}>
              <div className={styles.formContainer}>
                <div className={styles.header}>
                  <div>
                    <Image
                      src="/logoMain2.png"
                      height={40}
                      width={200}
                      alt="logo"
                    />
                  </div>
                  <div className={styles.iconContainer}>
                    <HiSquares2X2 size={30} />
                    <HiOutlineSearch size={30} />
                  </div>
                </div>
                <div className={styles.inputContainer}>
                <h2 className={styles.heading}>Sign In</h2>
                  <div className={styles.inputWithIcon}>
                    <FaUser className={styles.inputIcon} />
                    <input
                      className={styles.input}
                      placeholder="Username or Email"
                    ></input>
                  </div>
                  <div className={styles.inputWithIcon}>
                    <IoMdLock className={styles.inputIcon} />
                    <input
                      className={styles.input}
                      placeholder="Password"
                      type={showPassword ? "text" : "password"}
                    ></input>
                    <div
                      className={styles.eyeIcon}
                      onClick={togglePasswordVisibility}
                    >
                      {showPassword ? (
                        <IoMdEyeOff size={25} />
                      ) : (
                        <IoMdEye size={25} />
                      )}
                    </div>
                    <div className={styles.forgotPassword}>
                      <a href="#">Forgot Password?</a>
                    </div>
                  </div>
                  <button className={styles.button} onClick={handleSignIn}>
                    SIGN IN
                  </button>
                  <div className={styles.divider}>
                    <hr className={styles.dividerLine} />
                    <span className={styles.dividerText}>Or</span>
                    <hr className={styles.dividerLine} />
                  </div>
                  <div className={styles.signInWith}>
                    <p>sign in with</p>
                    <div className={styles.socialIcons}>
                      <div className={styles.socialIcon}>
                        <FcGoogle size={25} />
                      </div>
                      <div className={styles.socialIcon}>
                        <AiFillApple color="#fff" size={25} />
                      </div>
                      <div className={styles.socialIcon}>
                        <TfiFacebook color="#3D4DA6" size={25} />
                      </div>
                    </div>
                  </div>
                  <div className={styles.signupLink}>
                    <p>Don't have an account?</p>
                    <span>Sign Up</span>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <LoadingScreen />
          )}
        </>
      ) : (
        <CreateWallet />
      )}
    </>
  );
}

export default SignupLogin;
