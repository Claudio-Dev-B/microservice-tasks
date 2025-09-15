// Modelo simplificado - vamos implementar MongoDB depois
class Task {
  constructor(title, description) {
    this.id = Date.now().toString();
    this.title = title;
    this.description = description;
    this.completed = false;
    this.createdAt = new Date();
  }
}

module.exports = Task;