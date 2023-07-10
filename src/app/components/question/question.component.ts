import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { interval } from 'rxjs';
import { QuestionService } from 'src/app/services/question.service';
import { TIMEOUT } from 'dns';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})
export class QuestionComponent implements OnInit {

  public name: string = '';
  public surname: string = '';
  public questionsList: any = [];
  public currentQuestion: number = 0;
  public points: number = 0;
  counter = 60;
  correctAnswer: number = 0;
  IncorrectAnswer: number = 0;
  interval$: any;
  progress: string = '0';
  isQuizCompleted : boolean  = false;
  constructor(private questionService: QuestionService) { }

  ngOnInit(): void {
    this.name = localStorage.getItem('name')!;
    this.surname = localStorage.getItem('surname')!;
    this.getAllQuestions();
    this.startCounter();
  }

  getAllQuestions() {
    this.questionService.getQuestionJson().subscribe(
      res => {
        this.questionsList = res;
        console.log(res);
      },
      error => {
        console.error()
      }
    );
  }

  nextQuestion() {
    this.currentQuestion++;
  }
  previousQuestion() {
    this.currentQuestion--;
  }

  answer(currentQno: number, option: any) {
    if(currentQno === this.questionsList.questions.length){
      this.isQuizCompleted = true;
      this.stopCounter();
    }
    if (option.correct) {
      this.points += 10;
      //this.points = this.points+10;

      this.correctAnswer++;
      setTimeout(() => {
        this.currentQuestion++;
        this.resetCounter();
        this.getProgressPercent();
      }, 1000);

    } else {
      setTimeout(() => {
        this.currentQuestion++;
        this.IncorrectAnswer++;
        this.resetCounter();
        this.getProgressPercent();
      }, 1000);
      this.points -= 10;

    }
  }

  startCounter() {
    this.interval$ = interval(1000).subscribe(
      val => {
        this.counter--;
        if (this.counter === 0) {
          this.currentQuestion++;
          this.counter = 60;
          this.points -= 10;
        }
      }
    );
    setTimeout(() => {
      this.interval$.unsubscribe()
    }, 600000);
  }
  stopCounter() {
    this.interval$.unsubscribe();
    this.counter = 0;

  }
  resetCounter() {
    this.stopCounter();
    this.counter = 60;
    this.startCounter();
  }

  resetQuiz() {
    this.resetCounter();
    this.getAllQuestions();
    this.points = 0;
    this.counter = 60;
    this.currentQuestion = 0;
    this.progress = '0';
  }

  getProgressPercent() {
    this.progress = ((this.currentQuestion / this.questionsList.questions.length) * 100).toString();
    return this.progress;
  }

}
