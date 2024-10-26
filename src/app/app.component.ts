import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,FormsModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'] // Corrected to styleUrls for proper usage
})

export class AppComponent {
  currentNumber = '';
  currentTemplateIndex = 0;

  // Templates for generating numbers
  templates = [
    [3685, 6264, 5198],
    [2916, 4198, 7887],
    [7089, 4712, 4185],
    [4389, 4015, 7012],
    [6825, 3018, 4555],
    [1743, 7165, 5432],
    [6914, 2056, 1367],
    [5719, 2058, 6242],
    [6428, 3158, 3665],
    [4168, 5891, 1068],
    [1934, 7086, 7077],
    [6825, 3018, 4555]
  ];

  result1 = 'XXXX';
  result2 = 'XXXX';
  result3 = 'XXXX';
  fourthNumber = 'XXXX';
  subtotal = 'XXXX';
  total = 'XXXXX';

  // Current template number for display
  currentTemplateDisplay = '18KC1A0';

  async generateNumbers() {
    const inputValue = parseInt(this.currentNumber);
    if (inputValue >= 16000 && inputValue <= 20999) {
        if (this.currentTemplateIndex >= this.templates.length) {
            this.currentTemplateIndex = 0;
        }

        // Store the original input value for display during animation
        const originalInputValue = inputValue;
        this.total = originalInputValue.toString();

        // Update the displayed template number
        this.currentTemplateDisplay = `18KC1A${this.currentTemplateIndex + 1}`;

        // Loop through a quick "rolling" animation before setting final values
        for (let i = 0; i < 10; i++) {
            this.result1 = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
            this.result2 = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
            this.result3 = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
            this.fourthNumber = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
            await new Promise(resolve => setTimeout(resolve, 100));
        }

        // Set the final values from the template
        const template = this.templates[this.currentTemplateIndex];
        const res = originalInputValue - (template[0] + template[1] + template[2]);
        this.result1 = res.toString();
        this.result2 = template[0].toString();
        this.result3 = template[1].toString();
        this.fourthNumber = '?';
        this.subtotal = (res + template[0] + template[1]).toString();
        this.total = originalInputValue.toString(); // Use the original input value

        this.currentTemplateIndex++;
    } else {
        alert('Enter valid numbers (16000-20999)');
    }
  }

  // Reset the fields
  reset() {
    this.currentNumber = '';
    this.result1 = 'XXXX';
    this.result2 = 'XXXX';
    this.result3 = 'XXXX';
    this.fourthNumber = 'XXXX';
    this.subtotal = 'XXXX';
    this.total = 'XXXXX';
    this.currentTemplateIndex = 0;
    this.currentTemplateDisplay = '18KC1A0'; // Reset the displayed template number
  }

  // Add digit to current number
  addDigit(digit: string) {
    this.currentNumber += digit;
  }

  // Remove last digit
  backspace() {
    this.currentNumber = this.currentNumber.slice(0, -1);
  }

  // Reveal the fourth number
  revealFourthNumber() {
    if (this.currentTemplateIndex > 0) {
      const template = this.templates[this.currentTemplateIndex - 1];
      this.fourthNumber = template[2].toString();
      this.subtotal = (parseInt(this.subtotal) + template[2]).toString();
    }
  }
}
