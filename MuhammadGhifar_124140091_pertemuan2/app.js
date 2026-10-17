const STORAGE_KEY = "monodesk.tasks.v1";
const QUOTE_API = "https://dummyjson.com/quotes/random";

class TaskItem {
  constructor({ id = crypto.randomUUID(), title, course = "", dueDate = "", priority = "normal", completed = false, createdAt = new Date().toISOString() }) {
    this.id = id;
    this.title = title.trim();
    this.course = course.trim();
    this.dueDate = dueDate;
    this.priority = priority;
    this.completed = completed;
    this.createdAt = createdAt;
  }
}

class DashboardApp {
  constructor() {
    this.tasks = this.loadTasks();
    this.editingId = null;
    this.toastTimer = null;
    this.cacheElements();
    this.bindEvents();
    this.render();
    this.updateDate();
    this.loadQuote();
  }

  cacheElements() {
    this.taskList = document.querySelector("#task-list");
    this.emptyState = document.querySelector("#empty-state");
    this.dialog = document.querySelector("#task-dialog");
    this.form = document.querySelector("#task-form");
    this.toast = document.querySelector("#toast");
  }

  bindEvents() {
    document.querySelector("#add-task-button").addEventListener("click", () => this.openDialog());
    document.querySelector("#empty-add-button").addEventListener("click", () => this.openDialog());
    document.querySelector("#close-dialog").addEventListener("click", () => this.dialog.close());
    document.querySelector("#cancel-dialog").addEventListener("click", () => this.dialog.close());
    this.form.addEventListener("submit", (event) => this.handleSubmit(event));
    document.querySelector("#search-input").addEventListener("input", () => this.renderTasks());
    document.querySelector("#filter-select").addEventListener("change", () => this.renderTasks());
    document.querySelector("#new-quote-button").addEventListener("click", () => this.loadQuote());
    this.taskList.addEventListener("click", (event) => this.handleTaskAction(event));
    this.taskList.addEventListener("change", (event) => this.handleTaskToggle(event));
  }

  loadTasks() {
    try {
      const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
      return Array.isArray(saved) ? saved.map((task) => new TaskItem(task)) : [];
    } catch (error) {
      console.error("Gagal membaca localStorage:", error);
      return [];
    }
  }

  saveTasks() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.tasks));
    } catch (error) {
      console.error("Gagal menyimpan data:", error);
      this.showToast("Data gagal disimpan di perangkat.");
    }
  }

  async loadQuote() {
    const status = document.querySelector("#quote-status");
    const button = document.querySelector("#new-quote-button");
    button.disabled = true;
    status.textContent = "Mengambil kutipan…";
    try {
      const response = await fetch(QUOTE_API);
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      const { quote, author } = await response.json();
      document.querySelector("#quote-text").textContent = `“${quote}”`;
      document.querySelector("#quote-author").textContent = `— ${author}`;
      status.textContent = "Diperbarui dari DummyJSON";
    } catch (error) {
      console.warn("Kutipan API tidak tersedia:", error);
      document.querySelector("#quote-text").textContent = "Fokus pada progres, bukan kesempurnaan.";
      document.querySelector("#quote-author").textContent = "— Pengingat harian";
      status.textContent = "Mode offline · kutipan bawaan";
    } finally {
      button.disabled = false;
    }
  }

  updateDate() {
    const now = new Date();
    document.querySelector("#today-date").textContent = new Intl.DateTimeFormat("id-ID", {
      weekday: "short", day: "numeric", month: "short", year: "numeric"
    }).format(now);
    document.querySelector("#year").textContent = now.getFullYear();
  }

  openDialog(task = null) {
    this.editingId = task?.id ?? null;
    this.form.reset();
    document.querySelector("#dialog-title").textContent = task ? "Edit tugas" : "Tambah tugas";
    document.querySelector("#task-title").value = task?.title ?? "";
    document.querySelector("#task-course").value = task?.course ?? "";
    document.querySelector("#task-due").value = task?.dueDate ?? "";
    document.querySelector("#task-priority").value = task?.priority ?? "normal";
    this.dialog.showModal();
    document.querySelector("#task-title").focus();
  }

  handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(this.form);
    const { title, course, dueDate, priority } = Object.fromEntries(formData.entries());
    if (!title.trim()) return;

    if (this.editingId) {
      this.tasks = this.tasks.map((task) => task.id === this.editingId
        ? new TaskItem({ ...task, title, course, dueDate, priority })
        : task);
      this.showToast("Tugas berhasil diperbarui.");
    } else {
      const newTask = new TaskItem({ title, course, dueDate, priority });
      this.tasks = [newTask, ...this.tasks];
      this.showToast("Tugas berhasil ditambahkan.");
    }
    this.saveTasks();
    this.render();
    this.dialog.close();
  }

  handleTaskAction(event) {
    const button = event.target.closest("[data-action]");
    if (!button) return;
    const { action, id } = button.dataset;
    const task = this.tasks.find((item) => item.id === id);
    if (!task) return;
    if (action === "edit") this.openDialog(task);
    if (action === "delete") {
      if (!window.confirm(`Hapus tugas "${task.title}"?`)) return;
      this.tasks = this.tasks.filter((item) => item.id !== id);
      this.saveTasks();
      this.render();
      this.showToast("Tugas berhasil dihapus.");
    }
  }

  handleTaskToggle(event) {
    const checkbox = event.target.closest("[data-task-check]");
    if (!checkbox) return;
    const { id } = checkbox.dataset;
    this.tasks = this.tasks.map((task) => task.id === id
      ? new TaskItem({ ...task, completed: checkbox.checked })
      : task);
    this.saveTasks();
    this.render();
  }

  render() {
    this.renderTasks();
    const total = this.tasks.length;
    const done = this.tasks.filter(({ completed }) => completed).length;
    const pending = total - done;
    const percent = total ? Math.round((done / total) * 100) : 0;
    document.querySelector("#total-count").textContent = total;
    document.querySelector("#pending-count").textContent = pending;
    document.querySelector("#done-count").textContent = done;
    document.querySelector("#progress-percent").textContent = `${percent}%`;
    document.querySelector("#progress-bar").style.width = `${percent}%`;
    document.querySelector("#progress-caption").textContent = total
      ? `${done} dari ${total} tugas telah selesai.`
      : "Tambahkan tugas untuk mulai melacak progress.";
  }

  renderTasks() {
    const searchTerm = document.querySelector("#search-input").value.trim().toLowerCase();
    const filter = document.querySelector("#filter-select").value;
    const filteredTasks = this.tasks.filter(({ title, course, completed }) => {
      const matchesSearch = `${title} ${course}`.toLowerCase().includes(searchTerm);
      const matchesFilter = filter === "all" || (filter === "done" ? completed : !completed);
      return matchesSearch && matchesFilter;
    });

    this.taskList.innerHTML = filteredTasks.map((task) => this.taskTemplate(task)).join("");
    this.emptyState.classList.toggle("hidden", filteredTasks.length > 0);
    this.taskList.classList.toggle("hidden", filteredTasks.length === 0);
    document.querySelector("#task-summary").textContent =
      `${filteredTasks.length} dari ${this.tasks.length} tugas`;
  }

  taskTemplate({ id, title, course, dueDate, priority, completed }) {
    const priorityLabel = { high: "Tinggi", normal: "Normal", low: "Rendah" }[priority] || "Normal";
    const dueLabel = dueDate
      ? new Intl.DateTimeFormat("id-ID", { day: "numeric", month: "short", year: "numeric" }).format(new Date(`${dueDate}T00:00:00`))
      : "Tanpa tenggat";
    const safeTitle = this.escapeHTML(title);
    const safeCourse = this.escapeHTML(course);
    return `
      <article class="task-item ${completed ? "is-done" : ""}">
        <input class="task-check" type="checkbox" data-task-check data-id="${id}" ${completed ? "checked" : ""} aria-label="Tandai ${safeTitle} selesai">
        <div class="task-main">
          <div class="task-title">${safeTitle}</div>
          <div class="task-meta">
            ${safeCourse ? `<span class="task-course">${safeCourse}</span>` : ""}
            <span>${dueLabel}</span>
            <span class="priority ${priority}">• ${priorityLabel}</span>
          </div>
        </div>
        <div class="task-actions">
          <button class="icon-button" type="button" data-action="edit" data-id="${id}" aria-label="Edit ${safeTitle}" title="Edit">✎</button>
          <button class="icon-button" type="button" data-action="delete" data-id="${id}" aria-label="Hapus ${safeTitle}" title="Hapus">×</button>
        </div>
      </article>`;
  }

  escapeHTML(value) {
    return String(value).replace(/[&<>"']/g, (character) => ({
      "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;"
    })[character]);
  }

  showToast(message) {
    this.toast.textContent = message;
    this.toast.classList.add("show");
    clearTimeout(this.toastTimer);
    this.toastTimer = setTimeout(() => this.toast.classList.remove("show"), 2400);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const app = new DashboardApp();
  // Ekspos instance untuk debugging saat praktikum melalui DevTools.
  window.dashboardApp = app;
});
