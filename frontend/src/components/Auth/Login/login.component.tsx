import { FormEvent, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useFirebaseAuth } from "../../../firebase/firebase.context";
import { useTitle } from "../../../hooks/useTitle.hook";
import { ReduxInitialState } from "../../../redux/app/app.reducer";
import { TOAST_SERVICE } from "../../../utils/toast.util";
import { AuthLayout } from "../layouts/auth-layout.component";

const Login = () => {
  useTitle("Login - Prism");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { login, currentUser } = useFirebaseAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const loggedInUserFetch = useSelector(
    (state: ReduxInitialState) => state.fetched,
  );

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      setLoading(true);
      if (login) await login(email, password);

      // if (!loggedInUserFetch) {
      //   // TODO Uncomment
      //   // const { data } = await axios.get(`http://localhost:3000/users/${currentUser?.uid}`);

      //   dispatch(userFetch());
      //   const { data } = await axios.get(`http://localhost:3000/users/2`);

      //   if (!data) {
      //     dispatch(userFetchFail());
      //     const TOAST_ID = "LOAD_USER_FAIL";
      //     TOAST_SERVICE.error(TOAST_ID, "Failed to load logged in user", true);
      //     // TODO How should user recover from this state?
      //     return;
      //   }

      //   dispatch(userFetchSuccess(data));
      // }

      navigate("/");
    } catch (e: any) {
      let errorMsg =
        "Unexpected error logging in. Please refresh the page and try again.";

      if (
        e?.message === "Firebase: Error (auth/wrong-password)." ||
        e?.message === "Firebase: Error (auth/user-not-found)."
      ) {
        errorMsg = "Invalid email or password";
      }

      const TOAST_ID = "FAILED_TO_LOGIN";
      TOAST_SERVICE.error(TOAST_ID, errorMsg, true);
    }

    (e.target as HTMLFormElement).reset();
    setEmail("");
    setPassword("");
    setLoading(false);
  };

  return (
    <AuthLayout>
      <h1 className="text-4xl font-bold leading-tight text-slate-900 sm:text-5xl sm:leading-tight lg:text-5xl lg:leading-tight">
        Let's get started
      </h1>
      <form className="flex flex-col gap-8 pt-3" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-2 leading-3">
          <label className="required" htmlFor="email">
            Email
          </label>
          <input
            className="border border-slate-400 p-2 rounded-md"
            id="email"
            type={"email"}
            autoComplete="email"
            required={true}
            placeholder="your-email@email.com"
            onChange={e => setEmail(e.target.value)}
          />
        </div>
        <div className="flex flex-col gap-2 leading-3">
          <label className="required" htmlFor="password">
            Password
          </label>
          <div className="flex flex-col gap-2">
            <input
              className="border border-slate-400 p-2 rounded-md"
              id="password"
              type={"password"}
              autoComplete="current-password"
              required={true}
              onChange={e => setPassword(e.target.value)}
            />
          </div>
        </div>

        <div className="flex flex-col gap-1">
          <button
            className="flex items-center justify-center rounded-xl border border-slate-900 bg-slate-900 px-5 py-3 text-md lg:text-xl font-semibold leading-7 text-white transition-all duration-200 hover:bg-transparent hover:text-slate-900 focus:bg-transparent focus:text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-800 focus:ring-offset-2 disabled:opacity-50"
            disabled={loading}
          >
            Login
          </button>
          <div className="flex gap-1">
            <p>Need an account?</p>
            <Link className="underline hover:opacity-70" to={"/register"}>
              Register
            </Link>
          </div>
        </div>
      </form>
    </AuthLayout>
  );
};

export { Login };
