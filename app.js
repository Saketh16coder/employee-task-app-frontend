import { AuthForm } from "./AuthForm.js";
import { Dashboard } from "./DashBoard.js";

const h = React.createElement;

function normalizePath(path) {
  if (path === "/signup") return "/signup";
  if (path === "/dashboard") return "/dashboard";
  return "/login";
}

function App() {
  const [user, setUser] = React.useState(null);
  const [route, setRoute] = React.useState(normalizePath(window.location.pathname));

  function navigate(path) {
    const normalized = normalizePath(path);
    if (normalized === route) return;
    window.history.pushState({}, "", normalized);
    setRoute(normalized);
  }

  React.useEffect(() => {
    function onPop() {
      setRoute(normalizePath(window.location.pathname));
    }
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, []);

  function handleLoginSuccess(u) {
    setUser(u);
    navigate("/dashboard");
  }

  function handleSignupSuccess() {
    navigate("/login");
  }

  function handleLogout() {
    setUser(null);
    navigate("/login");
  }

  if (!user) {
    const mode = route === "/signup" ? "signup" : "login";
    if (route === "/dashboard") {
      navigate("/login");
      return null;
    }

    return h(
      "div",
      { className: "min-h-screen flex flex-col" },
      h(
        "header",
        { className: "bg-white border-b border-slate-200" },
        h(
          "div",
          { className: "max-w-6xl mx-auto px-4" },
          h(
            "div",
            { className: "flex items-center justify-between py-4" },
            h(
              "div",
              { className: "flex items-center space-x-2" },
              h(
                "div",
                {
                  className:
                    "w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold text-lg"
                },
                "P"
              ),
              h(
                "span",
                {
                  className:
                    "text-xl font-semibold tracking-tight text-slate-900"
                },
                "ProU Technology"
              )
            ),
            h(
              "nav",
              {
                className:
                  "flex items-center space-x-6 text-sm font-medium text-slate-700"
              },
              h(
                "button",
                {
                  className: "cursor-pointer hover:text-blue-600",
                  onClick: () => navigate("/login")
                },
                "Home"
              ),
              h(
                "span",
                {
                  className:
                    "text-blue-600 cursor-default"
                },
                mode === "signup" ? "Sign up" : "Login"
              )
            )
          )
        )
      ),
      h(
        "section",
        { className: "bg-[#118be8] text-white" },
        h(
          "div",
          {
            className:
              "max-w-6xl mx-auto px-4 py-12 md:py-16 flex flex-col items-center text-center"
          },
          h(
            "h1",
            {
              className:
                "text-3xl md:text-5xl font-bold mb-4 leading-tight"
            },
            "AI-Powered Software for Team Safety, Intelligence, and Automation"
          ),
          h(
            "p",
            {
              className:
                "max-w-2xl text-sm md:text-base opacity-90 mb-2"
            },
            "ProU Technology delivers next-generation AI platforms that streamline workforce safety, task automation, and engineering workflows for modern organizations."
          ),
          h(
            "p",
            {
              className:
                "max-w-xl text-xs md:text-sm opacity-80"
            },
            "This prototype portal is built as part of the ProU recruitment assignment to showcase secure login and an internal employee-task dashboard."
          )
        )
      ),
      h(
        "main",
        { className: "flex-1 max-w-6xl mx-auto px-4 py-8 w-full" },
        h(AuthForm, {
          mode,
          onModeChange: function (m) {
            navigate(m === "signup" ? "/signup" : "/login");
          },
          onLoginSuccess: handleLoginSuccess,
          onSignupSuccess: handleSignupSuccess
        })
      )
    );
  }

  if (route !== "/dashboard") {
    navigate("/dashboard");
    return null;
  }

  return h(
    "div",
    { className: "min-h-screen flex flex-col" },
    h(
      "header",
      { className: "bg-white border-b border-slate-200" },
      h(
        "div",
        { className: "max-w-6xl mx-auto px-4" },
        h(
          "div",
          { className: "flex items-center justify-between py-4" },
          h(
            "div",
            { className: "flex items-center space-x-2" },
            h(
              "div",
              {
                className:
                  "w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold text-lg"
              },
              "P"
            ),
            h(
              "span",
              {
                className:
                  "text-xl font-semibold tracking-tight text-slate-900"
              },
              "ProU Technology"
            )
          ),
          h(
            "div",
            { className: "flex items-center space-x-6 text-sm font-medium" },
            h(
              "button",
              {
                className: "text-blue-600 cursor-default"
              },
              "Dashboard"
            ),
            h(
              "button",
              {
                className:
                  "rounded-full border border-slate-300 px-4 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-50",
                onClick: handleLogout
              },
              "Logout"
            )
          )
        )
      )
    ),
    h(
      "section",
      { className: "bg-[#118be8] text-white" },
      h(
        "div",
        {
          className:
            "max-w-6xl mx-auto px-4 py-10 md:py-14 flex flex-col items-start text-left"
        },
        h(
          "h1",
          {
            className:
              "text-3xl md:text-4xl font-bold mb-3 leading-snug"
          },
          "ProU Recruitment Assignment – Employee & Task Dashboard"
        ),
        h(
          "p",
          {
            className:
              "max-w-2xl text-sm md:text-base opacity-90 mb-2"
          },
          "This internal dashboard was implemented as part of the ProU Technology recruitment process to demonstrate a full-stack solution for managing employees and task assignments."
        ),
        h(
          "p",
          {
            className:
              "max-w-2xl text-xs md:text-sm opacity-85"
          },
          "Stack: React frontend with Tailwind CSS, Node.js API, and SQLite database for persistent storage of users, employees, and tasks."
        )
      )
    ),
    h(Dashboard, { user })
  );
}

ReactDOM.render(React.createElement(App), document.getElementById("root"));
