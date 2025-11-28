const { useState, useEffect } = React;
const h = React.createElement;

export function EmployeeForm(props) {
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [email, setEmail] = useState("");

  useEffect(
    function () {
      if (props.selected) {
        setName(props.selected.name);
        setRole(props.selected.role);
        setEmail(props.selected.email);
      } else {
        setName("");
        setRole("");
        setEmail("");
      }
    },
    [props.selected]
  );

  function handleSubmit(e) {
    e.preventDefault();
    props.onSubmit({ name: name, role: role, email: email });
  }

  return h(
    "form",
    { onSubmit: handleSubmit, className: "bg-white rounded-xl shadow-md p-5 mb-4" },
    h(
      "h2",
      { className: "text-lg font-semibold mb-3 text-slate-800" },
      props.selected ? "Edit Employee" : "Add Employee"
    ),
    h(
      "div",
      { className: "space-y-3" },
      h(
        "label",
        { className: "block text-sm text-slate-700" },
        "Name",
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
        "Role",
        h("input", {
          className:
            "mt-1 w-full rounded-md border border-slate-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500",
          value: role,
          onChange: function (e) {
            setRole(e.target.value);
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
        "button",
        {
          type: "submit",
          className:
            "inline-flex items-center justify-center rounded-full bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700 transition-colors"
        },
        props.selected ? "Update" : "Create"
      )
    )
  );
}
