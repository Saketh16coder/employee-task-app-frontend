const { useState, useEffect } = React;
const h = React.createElement;

export function TaskForm(props) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("pending");
  const [employeeId, setEmployeeId] = useState("");

  useEffect(
    function () {
      if (props.selected) {
        setTitle(props.selected.title);
        setDescription(props.selected.description || "");
        setStatus(props.selected.status);
        setEmployeeId(props.selected.employee_id || "");
      } else {
        setTitle("");
        setDescription("");
        setStatus("pending");
        setEmployeeId("");
      }
    },
    [props.selected]
  );

  function handleSubmit(e) {
    e.preventDefault();
    props.onSubmit({
      title: title,
      description: description,
      status: status,
      employee_id: employeeId ? Number(employeeId) : null
    });
  }

  return h(
    "form",
    { onSubmit: handleSubmit, className: "bg-white rounded-xl shadow-md p-5 mb-4" },
    h(
      "h2",
      { className: "text-lg font-semibold mb-3 text-slate-800" },
      props.selected ? "Edit Task" : "Add Task"
    ),
    h(
      "div",
      { className: "space-y-3" },
      h(
        "label",
        { className: "block text-sm text-slate-700" },
        "Title",
        h("input", {
          className:
            "mt-1 w-full rounded-md border border-slate-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500",
          value: title,
          onChange: function (e) {
            setTitle(e.target.value);
          },
          required: true
        })
      ),
      h(
        "label",
        { className: "block text-sm text-slate-700" },
        "Description",
        h("textarea", {
          className:
            "mt-1 w-full rounded-md border border-slate-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[60px]",
          value: description,
          onChange: function (e) {
            setDescription(e.target.value);
          }
        })
      ),
      h(
        "div",
        { className: "grid grid-cols-2 gap-3" },
        h(
          "label",
          { className: "block text-sm text-slate-700" },
          "Status",
          h(
            "select",
            {
              className:
                "mt-1 w-full rounded-md border border-slate-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500",
              value: status,
              onChange: function (e) {
                setStatus(e.target.value);
              }
            },
            h("option", { value: "pending" }, "Pending"),
            h("option", { value: "in-progress" }, "In Progress"),
            h("option", { value: "done" }, "Done")
          )
        ),
        h(
          "label",
          { className: "block text-sm text-slate-700" },
          "Assign To",
          h(
            "select",
            {
              className:
                "mt-1 w-full rounded-md border border-slate-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500",
              value: employeeId,
              onChange: function (e) {
                setEmployeeId(e.target.value);
              }
            },
            h("option", { value: "" }, "Unassigned"),
            props.employees.map(function (e) {
              return h("option", { key: e.id, value: e.id }, e.name);
            })
          )
        )
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
