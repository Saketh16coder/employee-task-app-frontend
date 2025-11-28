const { useState } = React;
const h = React.createElement;

export function AuthForm(props) {
  const mode = props.mode;
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);

    const body =
      mode === "signup"
        ? { name: name, email: email, password: password }
        : { email: email, password: password };

    const url = mode === "signup" ? "/api/auth/register" : "/api/auth/login";

    fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body)
    })
      .then(function (res) {
        return res.json().then(function (data) {
          return { ok: res.ok, data: data };
        });
      })
      .then(function (result) {
        if (!result.ok) {
          setError(result.data.error || "Authentication failed");
        } else {
          if (mode === "signup") {
            props.onSignupSuccess();
          } else {
            props.onLoginSuccess(result.data);
          }
        }
      })
      .catch(function () {
        setError("Server error. Try again.");
      })
      .finally(function () {
        setLoading(false);
      });
  }

  return h(
    "div",
    { className: "max-w-md mx-auto mb-10 -mt-16 md:-mt-20" },
    h(
      "div",
      { className: "bg-white rounded-2xl shadow-lg p-6 md:p-7" },
      h(
        "div",
        { className: "flex items-center justify-between mb-4" },
        h(
          "h2",
          { className: "text-lg font-semibold text-slate-900" },
          mode === "signup"
            ? "Create your ProU portal account"
            : "Login to ProU dashboard"
        ),
        h(
          "button",
          {
            className: "text-xs text-blue-600 hover:underline",
            onClick: function () {
              props.onModeChange(mode === "signup" ? "login" : "signup");
            }
          },
          mode === "signup" ? "Already have an account?" : "New here? Sign up"
        )
      ),
      error &&
        h(
          "div",
          {
            className:
              "mb-3 rounded-md bg-red-50 px-3 py-2 text-xs text-red-700"
          },
          error
        ),
      h(
        "form",
        { onSubmit: handleSubmit, className: "space-y-3" },
        mode === "signup" &&
          h(
            "label",
            { className: "block text-sm text-slate-700" },
            "Full Name",
            h("input", {
              className:
                "mt-1 w-full rounded-md border border-slate-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500",
              value: name,
              onChange: function (e) {
                setName(e.target.value);
              },
              required: true
            })
          ),
        h(
          "label",
          { className: "block text-sm text-slate-700" },
          "Email",
          h("input", {
            type: "email",
            className:
              "mt-1 w-full rounded-md border border-slate-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500",
            value: email,
            onChange: function (e) {
              setEmail(e.target.value);
            },
            required: true
          })
        ),
        h(
          "label",
          { className: "block text-sm text-slate-700" },
          "Password",
          h("input", {
            type: "password",
            className:
              "mt-1 w-full rounded-md border border-slate-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500",
            value: password,
            onChange: function (e) {
              setPassword(e.target.value);
            },
            required: true
          })
        ),
        h(
          "button",
          {
            type: "submit",
            disabled: loading,
            className:
              "mt-2 inline-flex items-center justify-center rounded-full bg-blue-600 px-5 py-2 text-sm font-semibold text-white hover:bg-blue-700 disabled:opacity-60"
          },
          loading
            ? "Please wait..."
            : mode === "signup"
            ? "Sign Up"
            : "Sign In"
        )
      )
    )
  );
}
