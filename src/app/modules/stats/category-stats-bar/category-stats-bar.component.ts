import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import * as d3 from 'd3';
import { selectAll } from 'd3';
import { onChangeHelper } from '../../../helpers/on-change-helper';
import { INewsShort } from '../../news/types/news.type';

@Component({
  selector: 'app-category-stats-bar',
  templateUrl: './category-stats-bar.component.html',
})
export class CategoryStatsBarComponent implements OnInit, OnChanges {
  private svg: any;
  private margin = 50;
  private width = 500 - (this.margin * 2);
  private height = 400 - (this.margin * 2);
  private data: INewsShort[] = [];

  @Input() public news!: INewsShort[];

  ngOnInit() {
    
  }

  ngOnChanges(changes: SimpleChanges) {
    onChangeHelper.ifChanged(changes, 'news', (news: INewsShort[]) => {
      this.data = news;
      this.drawBars(this.data);
    });
  }

  private createSvg(): void {
    if (!this.svg) {
      this.svg = d3.select("figure#bar")
        .append("svg")
        .attr("width", this.width + (this.margin * 2))
        .attr("height", this.height + (this.margin * 2))
        .append("g")
        .attr("transform", "translate(" + this.margin + "," + this.margin + ")");
    }
  }

  private drawBars(data: any[]): void {
    if (!this.svg) {
      this.createSvg();
    }

    const x = d3.scaleBand()
      .range([0, this.width])
      .domain(data.map(d => d.category))
      .padding(0.2);

    const y = d3.scaleLinear()
      .domain([0, 10])
      .range([this.height, 0]);

    if (!this.svg.selectAll('text').empty()) {
      this.svg.selectAll('text').remove();
    }

    if (!this.svg.selectAll('g').empty()) {
      this.svg.selectAll('g').remove();
    }
      this.svg.append("g")
        .attr("transform", "translate(0," + this.height + ")")
        .call(d3.axisBottom(x))
        .selectAll("text")
        .attr("transform", "translate(-10,0)rotate(-30)")
        .style("text-anchor", "end");

 
      this.svg.append("g")
      .call(d3.axisLeft(y));

    if (!this.svg.selectAll('bars').empty()) {
      this.svg.selectAll('bars').remove();
    }

    const bars = this.svg.selectAll('bars').data(data);

    if (!this.svg.selectAll('rect').empty()) {
      this.svg.selectAll('rect').remove();
    }
    bars
      .enter()
      .append("rect")
      .attr("x", (d: INewsShort) => x(d.category))
      .attr("y", (d: INewsShort) => y(data.filter(el => el.category == d.category).length))
      .attr("width", x.bandwidth())
      .attr("height", (d: INewsShort) => this.height - y(data.filter(el => el.category == d.category).length))
      .attr("fill", "#4ab3ad")
      .attr("opacity", 0.5);

    bars.exit().remove();
  }

}
