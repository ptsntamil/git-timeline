import { Component, OnInit, Input } from '@angular/core';
import * as d3 from 'd3';
@Component({
  selector: 'app-pie',
  templateUrl: './pie.component.html',
  styleUrls: ['./pie.component.scss'],
})
export class PieComponent implements OnInit {
  constructor() {}
  @Input() data: any[];
  total;
  @Input() id;
  radius: number;
  width = 300;
  height = 300;
  private labels: any;
  private texts: any;
  // Arcs & pie
  private arc: any;
  private pie: any;
  private slices: any;
  private color: any;
  private arcLabel: any;
  // Drawing containers
  private svg: any;
  private mainContainer: any;
  async ngOnInit() {
    await this.calculateTotal();
    this.svg = d3.select(`#${this.id}`).select('svg');
    this.setSVGDimensions();
    this.color = d3.scaleOrdinal(d3.schemeCategory10);
    this.mainContainer = this.svg
      .append('g')
      .attr('transform', `translate(${this.radius},${this.radius})`);
    this.pie = d3
      .pie()
      .sort(null)
      .value((d: any) => d.count);
    this.draw();
  }
  private async calculateTotal() {
    this.total = await this.data.reduce(
      (previous, current) => previous + current.count,
      0
    );
  }

  private setSVGDimensions() {
    this.radius = Math.min(this.width, this.height) / 2;
    this.svg.attr('width', 2 * this.radius).attr('height', 2 * this.radius);
    this.svg
      .select('g')
      .attr('transform', 'translate(' + this.radius + ',' + this.radius + ')');
  }

  private draw() {
    console.log(this.data);
    this.setArcs();
    this.drawSlices();
    this.drawLabels();
  }

  private setArcs() {
    this.arc = d3.arc().outerRadius(this.radius).innerRadius(0);
    this.arcLabel = d3
      .arc()
      .innerRadius(this.radius * 0.8)
      .outerRadius(this.radius * 0.8);
  }

  private drawSlices() {
    this.slices = this.mainContainer
      .selectAll('path')
      .remove()
      .exit()
      .data(this.pie(this.data))
      .enter()
      .append('g')
      .append('path')
      .attr('d', this.arc);
    this.slices.attr('fill', (d, i) => this.color(i));
  }
  private drawLabels() {
    this.texts = this.mainContainer
      .selectAll('text')
      .remove()
      .exit()
      .data(this.pie(this.data))
      .enter()
      .append('text')
      .attr('text-anchor', 'middle')
      .attr('transform', (d) => `translate(${this.arcLabel.centroid(d)})`)
      .attr('dy', '0.35em');
    this.texts
      .append('tspan')
      .filter((d) => d.endAngle - d.startAngle > 0.05)
      .attr('x', 0)
      .attr('y', 0)
      .style('fill', 'rgb(255, 255, 255)')
      .text((d) => {
        console.log(d.data);
        return d.data.language;
      });
  }
}
