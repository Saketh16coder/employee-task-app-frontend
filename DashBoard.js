import { EmployeeForm } from "./EmployeeForm.js";
import { TaskForm } from "./TaskForm.js";

const { useState, useEffect } = React;
const h = React.createElement;

export function Dashboard(props) {
  const user = props.user;
  const [employees, setEmployees] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [selectedTask, setSelectedTask] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  function fetchAll() {
    setLoading(true);
    setError("");
    Promise.all([fetch("/api/employees"), fetch("/api/tasks")])
      .then(function (resArr) {
        return Promise.all(
          resArr.map(function (r) {
            return r.json();
          })
        );
      })
      .then(function (dataArr) {
        setEmployees(dataArr[0]);
        setTasks(dataArr[1]);
      })
      .catch(function () {
        setError("Failed to load data. Ensure the backend is running.");
      })
      .finally(function () {
        setLoading(false);
      });
  }

  useEffect(function () {
    fetchAll();
  }, []);

  function createOrUpdateEmployee(data) {
    setError("");
    if (selectedEmployee) {
      fetch("/api/employees/" + selectedEmployee.id, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
      })
        .then(function (res) {
          if (!res.ok) throw new Error();
          setSelectedEmployee(null);
          fetchAll();
        })
        .catch(function () {
          setError("Unable to save employee.");
        });
    } else {
      fetch("/api/employees", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
      })
        .then(function (res) {
          if (!res.ok) throw new Error();
          fetchAll();
        })
        .catch(function () {
          setError("Unable to save employee.");
        });
    }
  }

  function deleteEmployee(id) {
    if (!window.confirm("Delete this employee?")) return;
    setError("");
    fetch("/api/employees/" + id, { method: "DELETE" })
      .then(function (res) {
        if (!res.ok) throw new Error();
        fetchAll();
      })
      .catch(function () {
        setError("Unable to delete employee.");
      });
  }

  function createOrUpdateTask(data) {
    setError("");
    if (selectedTask) {
      fetch("/api/tasks/" + selectedTask.id, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
      })
        .then(function (res) {
          if (!res.ok) throw new Error();
          setSelectedTask(null);
          fetchAll();
        })
        .catch(function () {
          setError("Unable to save task.");
        });
    } else {
      fetch("/api/tasks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
      })
        .then(function (res) {
          if (!res.ok) throw new Error();
          fetchAll();
        })
        .catch(function () {
          setError("Unable to save task.");
        });
    }
  }

  function deleteTask(id) {
    if (!window.confirm("Delete this task?")) return;
    setError("");
    fetch("/api/tasks/" + id, { method: "DELETE" })
      .then(function (res) {
        if (!res.ok) throw new Error();
        fetchAll();
      })
      .catch(function () {
        setError("Unable to delete task.");
      });
  }

  return h(
    "div",
    { className: "flex-1 max-w-6xl mx-auto px-4 py-8 w-full" },
    error &&
      h(
        "div",
        {
          className:
            "mb-4 rounded-md bg-red-50 px-4 py-2 text-sm text-red-700"
        },
        error
      ),
    loading &&
      h(
        "div",
        {
          className:
            "mb-4 rounded-md bg-blue-50 px-4 py-2 text-sm text-blue-700"
        },
        "Loading data..."
      ),
    h(
      "div",
      { className: "mb-4 text-sm text-slate-600" },
      "Signed in as ",
      h("span", { className: "font-semibold" }, user.name),
      " (",
      user.email,
      ")"
    ),
    h(
      "h2",
      { className: "text-lg font-semibold text-slate-800 mb-4" },
      "Internal Employee & Task Dashboard"
    ),
    h(
      "div",
      { className: "grid md:grid-cols-2 gap-6 mb-8" },
      h(
        "section",
        null,
        h(EmployeeForm, {
          onSubmit: createOrUpdateEmployee,
          selected: selectedEmployee
        }),
        h(
          "div",
          { className: "bg-white rounded-xl shadow-md p-5 mb-4" },
          h(
            "div",
            { className: "flex items-center justify-between mb-3" },
            h(
              "h3",
              { className: "text-lg font-semibold text-slate-800" },
              "Employees"
            ),
            h(
              "span",
              { className: "text-xs text-slate-500" },
              "Live data from API + SQLite"
            )
          ),
          employees.length === 0
            ? h(
                "p",
                { className: "text-sm text-slate-500" },
                "No employees yet."
              )
            : h(
                "div",
                { className: "overflow-x-auto" },
                h(
                  "table",
                  { className: "min-w-full text-sm" },
                  h(
                    "thead",
                    null,
                    h(
                      "tr",
                      { className: "bg-slate-50 text-slate-600" },
                      h(
                        "th",
                        { className: "text-left py-2 px-3 font-medium" },
                        "Name"
                      ),
                      h(
                        "th",
                        { className: "text-left py-2 px-3 font-medium" },
                        "Role"
                      ),
                      h(
                        "th",
                        { className: "text-left py-2 px-3 font-medium" },
                        "Email"
                      ),
                      h(
                        "th",
                        { className: "text-right py-2 px-3 font-medium" },
                        "Actions"
                      )
                    )
                  ),
                  h(
                    "tbody",
                    null,
                    employees.map(function (e) {
                      return h(
                        "tr",
                        { key: e.id, className: "border-b border-slate-100" },
                        h("td", { className: "py-2 px-3" }, e.name),
                        h(
                          "td",
                          { className: "py-2 px-3 text-slate-600" },
                          e.role
                        ),
                        h(
                          "td",
                          { className: "py-2 px-3 text-slate-600" },
                          e.email
                        ),
                        h(
                          "td",
                          { className: "py-2 px-3 text-right space-x-2" },
                          h(
                            "button",
                            {
                              onClick: function () {
                                setSelectedEmployee(e);
                              },
                              className:
                                "text-xs rounded-full border border-slate-300 px-3 py-1 text-slate-700 hover:bg-slate-50"
                            },
                            "Edit"
                          ),
                          h(
                            "button",
                            {
                              onClick: function () {
                                deleteEmployee(e.id);
                              },
                              className:
                                "text-xs rounded-full border border-red-200 px-3 py-1 text-red-600 hover:bg-red-50"
                            },
                            "Delete"
                          )
                        )
                      );
                    })
                  )
                )
              )
        )
      ),
      h(
        "section",
        null,
        h(TaskForm, {
          onSubmit: createOrUpdateTask,
          employees: employees,
          selected: selectedTask
        }),
        h(
          "div",
          { className: "bg-white rounded-xl shadow-md p-5 mb-4" },
          h(
            "div",
            { className: "flex items-center justify-between mb-3" },
            h(
              "h3",
              { className: "text-lg font-semibold text-slate-800" },
              "Tasks"
            ),
            h(
              "span",
              { className: "text-xs text-slate-500" },
              "Live data from API + SQLite"
            )
          ),
          tasks.length === 0
            ? h(
                "p",
                { className: "text-sm text-slate-500" },
                "No tasks yet. Add one using the form above."
              )
            : h(
                "div",
                { className: "overflow-x-auto" },
                h(
                  "table",
                  { className: "min-w-full text-sm" },
                  h(
                    "thead",
                    null,
                    h(
                      "tr",
                      { className: "bg-slate-50 text-slate-600" },
                      h(
                        "th",
                        { className: "text-left py-2 px-3 font-medium" },
                        "Title"
                      ),
                      h(
                        "th",
                        { className: "text-left py-2 px-3 font-medium" },
                        "Status"
                      ),
                      h(
                        "th",
                        { className: "text-left py-2 px-3 font-medium" },
                        "Assigned To"
                      ),
                      h(
                        "th",
                        { className: "text-right py-2 px-3 font-medium" },
                        "Actions"
                      )
                    )
                  ),
                  h(
                    "tbody",
                    null,
                    tasks.map(function (t) {
                      return h(
                        "tr",
                        { key: t.id, className: "border-b border-slate-100" },
                        h("td", { className: "py-2 px-3" }, t.title),
                        h(
                          "td",
                          { className: "py-2 px-3" },
                          h(
                            "span",
                            {
                              className:
                                "inline-flex items-center rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-medium text-slate-700"
                            },
                            t.status
                          )
                        ),
                        h(
                          "td",
                          { className: "py-2 px-3 text-slate-600" },
                          t.employee_name || "Unassigned"
                        ),
                        h(
                          "td",
                          { className: "py-2 px-3 text-right space-x-2" },
                          h(
                            "button",
                            {
                              onClick: function () {
                                setSelectedTask(t);
                              },
                              className:
                                "text-xs rounded-full border border-slate-300 px-3 py-1 text-slate-700 hover:bg-slate-50"
                            },
                            "Edit"
                          ),
                          h(
                            "button",
                            {
                              onClick: function () {
                                deleteTask(t.id);
                              },
                              className:
                                "text-xs rounded-full border border-red-200 px-3 py-1 text-red-600 hover:bg-red-50"
                            },
                            "Delete"
                          )
                        )
                      );
                    })
                  )
                )
              )
        )
      )
    )
  );
}
