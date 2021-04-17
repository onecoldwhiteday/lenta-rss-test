import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import * as d3 from 'd3';
import * as _ from 'lodash';
import { Observable } from 'rxjs';
import { onChangeHelper } from '../../../helpers/on-change-helper';
import { INewsShort } from '../../news/types/news.type';

@Component({
  selector: 'app-category-stats-pie',
  templateUrl: './category-stats-pie.component.html'
})
export class CategoryStatsPieComponent implements OnInit, OnChanges {
  private svg: any;
  private margin = 50;
  private width = 400;
  private height = 600;
  private radius = Math.min(this.width, this.height) / 2 - this.margin;
  private colors: any;
  private data: INewsShort[] = [];

  @Input() public news: INewsShort[] = [];

  constructor() { }

  ngOnInit() {
   
  }

  ngOnChanges(changes: SimpleChanges) {
    onChangeHelper.ifChanged(changes, 'news', (news: INewsShort[]) => {
      this.data = news;
      this.createColors();
      this.createSvg();
      this.drawChart();
    });
  }

  private createSvg(): void {
    if (!this.svg) {
      this.svg = d3.select("figure#pie")
        .append("svg")
        .attr("width", this.width)
        .attr("height", this.height)
        .append("g")
        .attr(
          "transform",
          "translate(" + this.width / 2 + "," + this.height / 2 + ")"
        );
    }
  }

  private createColors(): void {
    let range = [];
    const categories = _.uniq(this.data.map(n => n.category));
    for (let i = 0; i < categories.length; i++) {
      range.push(`rgba(165, 217, 214, ${i* 1.5 / 10 + 0.3})`)
    }
    this.colors = d3.scaleOrdinal()
      .domain(categories)
      .range(range);
  }

  private updateChart(data: any) {
    this.svg.datum(data).call(this.drawChart);
  }

  private drawChart(): void {
    const categories = _.uniq(this.data.map(n => n.category));
    const data = categories.map(c => ({category: c, count: this.data.filter(n => n.category === c).length}));
    const pie = d3.pie<any>().value((d: any) => Number(d.count));

    const labelLocation = d3.arc()
      .innerRadius(100)
      .outerRadius(this.radius);

    const pieces = this.svg
      .selectAll('pieces')
      .data(pie(data))

    if (!this.svg.selectAll('path').empty()) {
      this.svg.selectAll('path').remove();
    }
      pieces.enter()
      .append('path')
      .attr('d', d3.arc()
        .innerRadius(0)
        .outerRadius(this.radius)
    )
      .attr('fill', (d: INewsShort, i: number) => (this.colors(i)))

    if (!this.svg.selectAll('text').empty()) {
      this.svg.selectAll('text').remove();
    }
    pieces.enter()
      .append('text')
      .text((d: any) => d.data.category)
      .attr("transform", (d: any) => "translate(" + labelLocation.centroid(d) + ")")
      .style("text-anchor", "middle")
      .style("font-size", 13);

    pieces.exit().remove();
  }

}
