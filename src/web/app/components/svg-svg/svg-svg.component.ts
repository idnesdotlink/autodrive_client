import {Component, Input, Output, EventEmitter, ViewChild, ElementRef, AfterContentInit, OnChanges, OnInit, OnDestroy} from '@angular/core'
import * as d3Shape from 'd3-shape'
import * as d3Zoom from 'd3-zoom'
import * as d3Selection from 'd3-selection'
import {map, forEach} from 'lodash'

export interface svgMargin {
  top?: number;
  left?: number;
  right?: number;
  bottom?: number;
};

@Component({
  selector: '[svg-svg]',
  templateUrl: 'template.html',
  styleUrls: ['style.scss'],
  preserveWhitespaces: false
})
export class SvgSvg implements AfterContentInit, OnChanges, OnInit, OnDestroy {
  @ViewChild('svgSvg', {read: ElementRef}) svgSvg: ElementRef;
  @Input() tree: any;
  @Input() w: number;
  @Input() h: number;
  @Input() currentSelection: any;
  @Output() selected = new EventEmitter<boolean>();
  @Input() margin: svgMargin;
  @Input() showLevel = false;
  @Input() showId = false;
  @Input() showBlocked = false;
  @Input() showPathToRoot = false;
  svgSelection: d3Selection.Selection<any, {}, null, undefined>;
  zoomGroup: d3Selection.Selection<any, {}, null, undefined>;
  nodes: d3Selection.Selection<any, {}, null, undefined>;
  zoom: d3Zoom.ZoomBehavior<any, any>;
  svgWidth = 0;
  svgHeight  = 0;
  mHeight = 0;
  mWidth = 0;
  viewMode = 'vertical';
  nodesClassL: string;
  getBgTransformT: string;
  getViewBoxV: string;

  clickCircle(e: any) {
    this.selected.emit(e);
  }

  ngOnInit() {
    this.svgSelection = d3Selection.select(this.svgSvg.nativeElement);
    this.zoomGroup = this.svgSelection.select('g.pan-zoom')
    this.nodes = this.zoomGroup.select('g.nodes')
    this.zoom = d3Zoom.zoom();
  }

  ngOnDestroy() {
    this.zoom.on('zoom', null);
  }

  ngOnChanges() {
    this.getViewBoxV = this.getViewBox();
    // this.getBgTransformT = this.getBgTransform()
    this.nodesClassL = this.nodesClass()
    this.svgHeight = this.getSvgHeight();
    this.svgWidth = this.getSvgWidth();
    this.mHeight = this.getHeight();
    this.mWidth = this.getWidth();

    map(this.tree, (node) => {
      node.classes = this.nodeClass(node);
      node.pathLink = [];
      node.pathElbow = [];
      node.pathToRoot = [];
      node.pathElbowCombine = this.combinedElbow(node);
      node.ttLvl = this.getTextTransform(node);
      node.ttId = this.getTextTransform2(node);
      node.pathToRoot= this.pathToRootC(node);
      forEach(node.children, (child) => {
        node.pathLink.push({
          classes: this.linkClass(child),
          d: this.getLink(child)
        })
        node.pathElbow.push({
          classes: 'elbow',
          d: this.getElbow(child)
        })
      })
    })
  }

  pathToRootC(d: any) {
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
    return dL.join(' ');
  }

  ngAfterContentInit() {
    // this.zoomGroup.call(this.zoom, d3Zoom.zoomIdentity.translate(this.getCenterHorizontal(), this.getCenterVertical()))
    this.zoomGroup.call(
      this.zoom
      .scaleExtent([-2,2])
      .on('zoom.svg', () => this.onZoom()));
      console.log('content init')
      this.nodes.attr('transform', `translate(${this.getCenterHorizontal()}, ${this.getCenterVertical()})`)
  }

  onZoom() {
    let event = d3Selection.event;
    this.nodes.attr('transform', d3Selection.event.transform)
  }

  nodesClass() {
    let classL = ''
    if(this.showId) classL = `${classL} show-id`;
    if(this.showLevel) classL = `${classL} show-level`;
    if(this.showBlocked) classL = `${classL} show-blocked`;
    if(this.showPathToRoot) classL = `${classL} show-ptr`;
    return classL;
  }

  nodeClass(node: any) {
    let id = node.data.id;
    let level = node.data.lvl;
    let classStr = `node node-id-${id} node-level-${level}`;
    if (id === this.currentSelection) classStr = `${classStr} selected`;
    return classStr;
  }

  linkClass(link: any) {
    let linkClass = ''
    let source_lvl = link.parent.data.lvl;
    let target_lvl = link.data.lvl;
    if (source_lvl <= target_lvl) linkClass = `${linkClass} blocked`;
    return linkClass;
  }

  getViewBox() {
    return `0 0 ${this.getSvgWidth()} ${this.getSvgHeight()}`;
  }

  getTextTransform(node: any) {
    return `translate(${node.x},${node.y-17})`
  }

  getTextTransform2(node: any) {
    return `translate(${node.x+14},${node.y-7})`
  }

  get bgTransform() {
    return `translate(${this.margin.left},${this.margin.bottom})`
  }

  getCenterHorizontal() {
    return this.getWidth() / 2;
  }

  getCenterVertical() {
    return this.getHeight() / 2;
  }

  getHeight() {
    return this.h;
  }

  getSvgHeight() {
    return this.h + this.margin.top + this.margin.bottom;
  }

  getWidth() {
    return this.w;
  }

  getSvgWidth() {
    return this.w + this.margin.left + this.margin.right;
  }

  getLink(link: any) {
    return this.diagonal(
      {
        source: {
          x: link.parent.x,
          y: link.parent.y
        },
        target: {
          x: link.x,
          y: link.y
        }
      }
    )
  }

  getElbow(link: any) {
    return this.elbow(
      this.getElbow2(link),
      link.parent === null,
      link.children === null
    )
  }

  getElbow2(link: any) {
    return {
      source: {
        x: link.parent.x,
        y: link.parent.y
      },
      target: {
        x: link.x,
        y: link.y
      }
    }
  }

  diagonal(st: any) {
    let mode = (this.viewMode === 'vertical') ? d3Shape.linkVertical : d3Shape.linkHorizontal;
    return mode().x((d:any) => d.x).y((d:any) =>  d.y)(st)
  }

  elbow(st: any, root: boolean, hasChild: boolean) {
    let d = `M${st.source.x},${(st.source.y)} V${st.source.y+35} H${st.target.x}`;
    d = hasChild ? `${d} V${st.target.y+35}` : `${d} V${st.target.y}`;
    return d;
  }

  combinedElbow(node: any) {
    let d = {
      a: '',
      b: ''
    };
    let children = node.children;
    let index: number = 1;
    let hl1 = '';
    let hl2 = '';
    let vl = '';
    let tr = [];
    forEach(children, (child) => {
      let e = this.getElbow2(child);

      if(index === 1) {
        vl = `M${e.source.x},${(e.source.y+15)} V${e.target.y-35}`;
        hl1 = `M${e.target.x},${e.target.y-35}`;
      }
      if(index === children.length) {
        hl2 = `H${e.target.x}`;
      }
      tr.push(`M${e.target.x},${e.target.y-35.5} V${e.target.y-15}`);
      index++;
    })
    let x = tr.join(' ')
    d.b = `${vl} ${hl1} ${hl2} ${x}`;
    return d;
  }

}
