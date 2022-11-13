import { Link } from "react-router-dom";
import { useTitle } from "../../../hooks/useTitle.hook";

const Login = () => {
  useTitle("Login");
  return (
    <section
      id="home"
      className="relative py-12 sm:py-16 lg:pt-10 lg:pb-30 xl:pt-20 xl:pb-36 bg-slate-50"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex gap-5 flex-col lg:flex-row lg:gap-20 items-center justify-center">
          <div className="max-w-md sm:max-w-xl w-full">
            <form className="flex flex-col gap-6">
              <div className="flex flex-col gap-2">
                <h1 className="text-4xl font-bold leading-tight text-slate-900 sm:text-5xl sm:leading-tight lg:text-5xl lg:leading-tight">
                  Let's get started
                </h1>
                <label htmlFor="email">Email</label>
                <input
                  className="border border-slate-400 p-2 rounded-md"
                  id="email"
                  type={"email"}
                  required={true}
                />
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="password">Password</label>
                <div className="flex flex-col gap-1">
                  <input
                    className="border border-slate-400 p-2 rounded-md"
                    id="password"
                    type={"password"}
                    required={true}
                  />
                  <a
                    className="underline hover:opacity-70"
                    href="/password-reset"
                  >
                    Forgot your password?
                  </a>
                </div>
              </div>

              <div className="flex flex-col gap-1">
                <button className="flex items-center justify-center rounded-xl border border-slate-900 bg-slate-900 px-5 py-3 text-md lg:text-xl font-semibold leading-7 text-white transition-all duration-200 hover:bg-transparent hover:text-slate-900 focus:bg-transparent focus:text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-800 focus:ring-offset-2">
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
          </div>
        </div>
      </div>
    </section>
  );
};
export { Login };
