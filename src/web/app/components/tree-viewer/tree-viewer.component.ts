import {Component, ElementRef, AfterViewInit, ViewChild, OnInit} from '@angular/core'
import * as d3Hierarchy from 'd3-hierarchy'
import * as faker from 'faker'
import {Scenario as Storage} from '@services/scenario.service'
import {ResizedEvent} from '@extra/resize-event'
import {partition, find} from 'lodash'
import {level} from '@helpers/level'
import * as d3Selection from 'd3-selection'

export interface scenarioTreeItem {
  id: number,
  name?: string,
  parentId: number,
  lvl?: number,
  active?: boolean,
  lvlName?: string,
  hidden?: false
}

export interface scenarioItem {
  name: string,
  tree: scenarioTreeItem[]
}

@Component({
  selector: 'tree-viewer',
  templateUrl: 'template.html',
  styleUrls: ['style.scss'],
  providers: [Storage]
})
export class TreeViewerComponent implements AfterViewInit, OnInit {
  @ViewChild('svgTreeRef', {read: ElementRef}) svgTreeRef: ElementRef;
  @ViewChild('svgSvg') svgSvg: any;

  splitSizeA = 0;
  splitSizeB = 100;

  viewMode: 'vertical';
  data: any;
  svgData: any;
  ldata = [];
  title: any;
  width: any;
  height: any;
  selectedId: any;
  selectedName: any;
  cId: number;
  margin = {top: 30, right: 30, bottom: 30, left: 30};
  rootElement = {
    name: 'Root',
    lvl: undefined,
    id: 0,
    parentId: null,
    active: false,
    blocking: true,
    hidden: false
  };
  lvl: any;

  constructor(private storage: Storage) {
    this.lvl = level;
  }

  ngAfterViewInit() {}
  ngOnInit() {}

  onHide() {
    this.svgData.each((d: any) => this.hideChildren(d))
  }

  hideChildren(d: any) {
    if (d.data.id !== this.selectedId) return;
  }

  onAncestors() {
    this.svgData.each((d: any) => this.showAncestors(d))
  }

  onDummy() {
  }

  showAncestors(d: any) {
    if (d.data.id !== this.selectedId) return;
    let ancestors = d.ancestors();
    let dL = [];
    for (let index = 0; index < ancestors.length; index++) {
      const element = ancestors[index];
      if (element.parent === null) continue;
      let x = element.x;
      let y = element.y;
      let px = element.parent.x;
      let py = element.parent.y;
      dL.push(`M${x},${y-15}, V${py+35} H${px} V${py+15}`)
    }
    d3Selection.select('g.pan-zoom').append('path').attr('d', dL.join(' ')).attr('style', 'stroke: red; stroke-width: 4px; fill: none;');
  }

  onDescendants() {
    this.svgData.each((d: any) => this.showDescendants(d))
  }

  showDescendants(d: any) {
    if (d.data.id !== this.selectedId) return;
    let descendants = d.descendants().slice(1);
    console.log(descendants);
  }

  onResizeSvg(event: ResizedEvent): void {
    let width = 0;
    if (event.newWidth !== undefined && event.newWidth > 0)
    width = event.newWidth - (this.margin.right + this.margin.left);

    let height = 0;
    if (event.newHeight !== undefined && event.newHeight > 0) {
      height = event.newHeight - (this.margin.top + this.margin.bottom);
    }

    this.width = width;
    this.height = height;
  }

  generate() {
    this.ldata = [];
    if (this.data.tree.length < 1) this.data.tree.push(this.rootElement)
    this.svgData = this.treeLayout(d3Hierarchy.stratify()(this.data.tree));
    this.svgData.each((d:any) => this.setLevelName(d));
    this.svgData.each((d: any) => this.ldata.push(d))
  }

  getScenario() {
    this.data = this.storage.getScenario().subscribe(
      (data: scenarioItem) => {
        console.log(data)
        this.data = data;
        this.generate()
      }
    )
  }

  treeLayout(data: any) {
    return d3Hierarchy
      .tree()
      .nodeSize([70,70])
      .separation(() => 1)
      (data)
  }

  levelName(idf ?: any) {
    let x = find(level, (a) => (a.id === idf));
    if(x !== undefined) return x.name
  }

  edit1() {
    this.storage.saveScenario({
      name: 'scenario 1',
      tree: []
    })
    this.getScenario();
  }

  add() {
    let a: scenarioTreeItem = {
      id: this.data.tree.length,
      name: this.fakeName(),
      parentId: this.selectedId,
      lvl: 1,
      active: true,
      lvlName: 'bronze',
      hidden: false
    }
    this.data.tree.push(a);
    this.ldata = [];
    this.title = this.data.id;
    let stratify = d3Hierarchy.stratify();
    this.svgData = this.treeLayout(stratify(this.data.tree));
    this.svgData.each((d:any) => this.setLevel(d));
    this.svgData.each((d: any) => this.ldata.push(d))
  }

  setLevelName(d: any) {
    d.data.lvlName = this.levelName(d.data.lvl);
  }

  setLevel(d: any) {
    if(d.data.id !== this.selectedId) return;
    let ancestors = d.ancestors();
    for (let index = 0; index < ancestors.length; index++) {
      const element = ancestors[index];
      const des = element.descendants().slice(1);
      if (element.data.lvl === undefined) continue;
      let currentLevel = find(level, (item) => { return item.id === element.data.lvl})
      let nextLevel = find(level, (item) => { return item.id === (element.data.lvl + 1)});
      let p = partition(des, (o: any) => o.data.lvl === currentLevel.id)[0].length
      if(p >= nextLevel.requirement) {
        element.data.lvl = element.data.lvl+1;
        element.data.lvlName = this.levelName(element.data.lvl);
      }
      continue;
    }
  }

  recalculateLvl() {
    this.data.tree = [];
    this.generate();
  }

  fakeName() {
    return `${faker.name.prefix()} ${faker.name.firstName()} ${faker.name.lastName()} ${faker.name.suffix()}`;
  }

  save() {
    this.storage.saveScenario(this.data)
  }

  onSelected(e) {
    this.selectedId = e.n.data.id;
    this.selectedName = e.n.data.name;
  }
}
