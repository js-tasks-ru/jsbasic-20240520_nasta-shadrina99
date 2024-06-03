let calculator = {
  read: read,
  sum() {
     return this.a + this.b;
  },
  mul() {
   return this.a * this.b;
  }
 };
  
 function read(a, b) {
   this.a = Number(a);
   this.b = Number(b);
 }

// НЕ УДАЛЯТЬ СТРОКУ, НУЖНА ДЛЯ ПРОВЕРКИ
window.calculator = calculator; // делает ваш калькулятор доступным глобально
