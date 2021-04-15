import { Component, Input, OnInit } from '@angular/core';
import * as d3 from 'd3';
import { Observable } from 'rxjs';
import { INewsShort } from '../types/news.type';

@Component({
  selector: 'app-category-stats',
  templateUrl: './category-stats.component.html',
})
export class CategoryStatsComponent implements OnInit {
  private svg: any;
  private margin = 50;
  private width = 500 - (this.margin * 2);
  private height = 400 - (this.margin * 2);
  private data: INewsShort[] = [];

  @Input() public news!: Observable<INewsShort[]>;

  constructor() { }

  ngOnInit(): void {
    this.news.subscribe(n => {
      this.data = n;
      this.createSvg();
      console.log(this.data);
      this.drawBars(this.data);
    })
  }

  private createSvg(): void {
    this.svg = d3.select("figure#bar")
      .append("svg")
      .attr("width", this.width + (this.margin * 2))
      .attr("height", this.height + (this.margin * 2))
      .append("g")
      .attr("transform", "translate(" + this.margin + "," + this.margin + ")");
  }

  private drawBars(data: any[]): void {
    const x = d3.scaleBand()
      .range([0, this.width])
      .domain(data.map(d => d.category))
      .padding(0.2);

    this.svg.append("g")
      .attr("transform", "translate(0," + this.height + ")")
      .call(d3.axisBottom(x))
      .selectAll("text")
      .attr("transform", "translate(-10,0)rotate(-30)")
      .style("text-anchor", "end");

    const y = d3.scaleLinear()
      .domain([0, 10])
      .range([this.height, 0]);

    this.svg.append("g")
      .call(d3.axisLeft(y));

    this.svg.selectAll("bars")
      .data(data)
      .enter()
      .append("rect")
      .attr("x", (d: INewsShort) => x(d.category))
      .attr("y", (d: INewsShort) => y(data.filter(el => el.category == d.category).length))
      .attr("width", x.bandwidth())
      .attr("height", (d: INewsShort) => this.height - y(data.filter(el => el.category == d.category).length))
      .attr("fill", "#4ab3ad")
      .attr("opacity", 0.5);
  }

}
