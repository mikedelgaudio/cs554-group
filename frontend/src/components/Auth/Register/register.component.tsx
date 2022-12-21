import { FormEvent, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useFirebaseAuth } from "../../../firebase/firebase.context";
import { useTitle } from "../../../hooks/useTitle.hook";
import { postRequest } from "../../../utils/api.util";
import { TOAST_SERVICE } from "../../../utils/toast.util";
import { AuthLayout } from "../layouts/auth-layout.component";

const Register = () => {
  useTitle("Register - Prism");

  const navigate = useNavigate();
  const { currentUser, register, updateDisplayName } = useFirebaseAuth();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (currentUser) {
      navigate("/");
    }
  }, [currentUser, navigate]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      const TOAST_ID = "PASSWORD_NO_MATCH";
      TOAST_SERVICE.error(TOAST_ID, "Passwords do not match", true);
      return;
    }

    try {
      setLoading(true);

      // If firebase or mongo fails could be data sync issue

      let userId = "";
      if (register) {
        const creds = await register(email, password);
        userId = creds.user.uid;
      }

      if (updateDisplayName) await updateDisplayName(firstName, lastName);

      const url = `${import.meta.env?.VITE_API_URL}/users/register`;
      await postRequest(url, {
        username,
        firebaseUid: userId,
        email,
        firstName,
        lastName,
      });

      navigate("/");
    } catch (e: any) {
      console.log(e.code);
      let TOAST_MESSAGE;
      if (e.code === "auth/weak-password") {
        console.log("con");
        TOAST_MESSAGE = "Password should be at least 6 characters";
      } else if (e.code === "auth/email-already-in-use") {
        TOAST_MESSAGE = "Email already used";
      } else {
        TOAST_MESSAGE =
          "Unexpected error unable to register user. Please try again after refreshing the page";
      }
      const TOAST_ID = "FAILED_TO_REGISTER";

      TOAST_SERVICE.error(TOAST_ID, TOAST_MESSAGE, true);
    }

    (e.target as HTMLFormElement).reset();
    setFirstName("");
    setLastName("");
    setEmail("");
    setPassword("");
    setUsername("");
    setLoading(false);
  };

  return (
    <AuthLayout>
      <h1 className="text-4xl font-bold leading-tight text-slate-900 sm:text-5xl sm:leading-tight lg:text-5xl lg:leading-tight">
        Create an account
      </h1>
      <form className="flex flex-col gap-8 pt-3" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-2 leading-3">
          <h2 className="font-semibold text-2xl">How we'll greet you</h2>
          <label className="required" htmlFor="firstName">
            First Name
          </label>
          <input
            className="border border-slate-400 p-2 rounded-md"
            id="firstName"
            type={"text"}
            required={true}
            placeholder="Joe"
            onChange={e => setFirstName(e.target.value)}
          />
          <label className="required" htmlFor="lastName">
            Last Name
          </label>
          <input
            className="border border-slate-400 p-2 rounded-md"
            id="lastName"
            type={"text"}
            required={true}
            placeholder="Blow"
            onChange={e => setLastName(e.target.value)}
          />
          <label className="required" htmlFor="username">
            Username
          </label>
          <input
            className="border border-slate-400 p-2 rounded-md"
            id="username"
            type={"text"}
            required={true}
            placeholder="hello123"
            onChange={e => setUsername(e.target.value)}
          />
        </div>

        <div className="flex flex-col gap-3 leading-3">
          <h2 className="font-semibold text-2xl">How you'll login</h2>
          <div className="flex flex-col gap-2">
            <label className="required" htmlFor="email">
              Email
            </label>
            <input
              className="border border-slate-400 p-2 rounded-md"
              id="email"
              type={"email"}
              required={true}
              autoComplete="email"
              placeholder="your-email@email.com"
              onChange={e => setEmail(e.target.value)}
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="required" htmlFor="password">
              Password
            </label>
            <input
              className="border border-slate-400 p-2 rounded-md"
              id="password"
              type={"password"}
              autoComplete="current-password"
              required={true}
              onChange={e => setPassword(e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="required" htmlFor="password-confirm">
              Confirm Password
            </label>
            <input
              className="border border-slate-400 p-2 rounded-md"
              id="password-confirm"
              type={"password"}
              autoComplete="current-password"
              required={true}
              onChange={e => setConfirmPassword(e.target.value)}
            />
          </div>
        </div>

        <div className="flex flex-col gap-1">
          <button
            className="flex items-center justify-center rounded-xl border border-slate-900 bg-slate-900 px-5 py-3 text-md lg:text-xl font-semibold leading-7 text-white transition-all duration-200 hover:bg-transparent hover:text-slate-900 focus:bg-transparent focus:text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-800 focus:ring-offset-2 disabled:opacity-50"
            disabled={loading}
            type="submit"
          >
            Create
          </button>
          <div className="flex gap-1">
            <Link className="underline hover:opacity-70" to={"/login"}>
              Already have an account?
            </Link>
          </div>
        </div>
      </form>
    </AuthLayout>
  );
};

export { Register };
