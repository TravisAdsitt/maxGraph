/**
 * Copyright (c) 2006-2014, JGraph Ltd
 * Converted to ES9 syntax/React by David Morrissey 2021
 */

import React from 'react';
import mxGraph from '../../mxgraph/view/graph/mxGraph';
import mxRubberband from '../../mxgraph/handler/mxRubberband';
import mxPerimeter from '../../mxgraph/util/datatypes/style/mxPerimeter';
import mxConstants from '../../mxgraph/util/mxConstants';
import mxRadialTreeLayout from '../../mxgraph/layout/mxRadialTreeLayout';

class RadialTreeLayout extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    // A container for the graph
    return (
      <>
        <h1>Radial Tree (Hierarchical) Layout</h1>
        This example demonstrates the use of the hierarchical and organic
        layouts. Note that the hierarchical layout requires another script tag
        in the head of the page.
        <div
          ref={el => {
            this.el = el;
          }}
          style={{
            position: 'relative',
            overflow: 'auto',
            height: '800px',
            borderTop: 'gray 1px solid',
          }}
        />
      </>
    );
  }

  componentDidMount() {
    // Creates the graph inside the given container
    const graph = new mxGraph(this.el);

    // Adds rubberband selection
    new mxRubberband(graph);

    // Changes the default vertex style in-place
    let style = graph.getStylesheet().getDefaultVertexStyle();
    style[mxConstants.STYLE_PERIMETER] = mxPerimeter.RectanglePerimeter;
    style[mxConstants.STYLE_GRADIENTCOLOR] = 'white';
    style[mxConstants.STYLE_PERIMETER_SPACING] = 6;
    style[mxConstants.STYLE_ROUNDED] = true;
    style[mxConstants.STYLE_SHADOW] = true;

    style = graph.getStylesheet().getDefaultEdgeStyle();
    style[mxConstants.STYLE_ROUNDED] = true;

    // Creates a layout algorithm to be used
    // with the graph
    const layout = new mxRadialTreeLayout(graph);

    const parent = graph.getDefaultParent();

    // Load cells and layouts the graph
    graph.getModel().beginUpdate();
    try {
      const v1 = graph.insertVertex(parent, null, '1', 500, 500, 80, 30);
      const v2 = graph.insertVertex(parent, null, '2.1', 0, 0, 80, 30);
      const v3 = graph.insertVertex(parent, null, '2.2', 0, 0, 80, 30);
      const v4 = graph.insertVertex(parent, null, '3.1', 0, 0, 80, 30);
      const v4_1 = graph.insertVertex(parent, null, '3.2', 0, 0, 80, 30);
      const v4_2 = graph.insertVertex(parent, null, '3.3', 0, 0, 80, 30);
      const v4_3 = graph.insertVertex(parent, null, '3.6', 0, 0, 80, 30);
      const v4_4 = graph.insertVertex(parent, null, '3.7', 0, 0, 80, 30);
      const v5 = graph.insertVertex(parent, null, '3.4', 0, 0, 80, 30);
      const v6 = graph.insertVertex(parent, null, '2.3', 0, 0, 80, 30);
      const v7 = graph.insertVertex(parent, null, '4.1', 0, 0, 80, 30);
      const v7_1 = graph.insertVertex(parent, null, '4.2', 0, 0, 80, 30);
      const v7_2 = graph.insertVertex(parent, null, '4.3', 0, 0, 80, 30);
      const v7_3 = graph.insertVertex(parent, null, '4.4', 0, 0, 80, 30);
      const v7_4 = graph.insertVertex(parent, null, '4.5', 0, 0, 80, 30);
      const v7_5 = graph.insertVertex(parent, null, '4.6', 0, 0, 80, 30);
      const v7_6 = graph.insertVertex(parent, null, '4.7', 0, 0, 80, 30);

      const e1 = graph.insertEdge(parent, null, '', v1, v2);
      const e2 = graph.insertEdge(parent, null, '', v1, v3);
      const e3 = graph.insertEdge(parent, null, '', v3, v4);
      const e3_1 = graph.insertEdge(parent, null, '', v3, v4_1);
      const e3_2 = graph.insertEdge(parent, null, '', v3, v4_2);
      const e3_3 = graph.insertEdge(parent, null, '', v3, v4_3);
      const e3_4 = graph.insertEdge(parent, null, '', v3, v4_4);
      const e4 = graph.insertEdge(parent, null, '', v2, v5);
      const e5 = graph.insertEdge(parent, null, '', v1, v6);
      const e6 = graph.insertEdge(parent, null, '', v4_3, v7);
      var e6_1 = graph.insertEdge(parent, null, '', v4_4, v7_4);
      var e6_2 = graph.insertEdge(parent, null, '', v4_4, v7_5);
      var e6_3 = graph.insertEdge(parent, null, '', v4_4, v7_6);
      var e6_1 = graph.insertEdge(parent, null, '', v4_3, v7_1);
      var e6_2 = graph.insertEdge(parent, null, '', v4_3, v7_2);
      var e6_3 = graph.insertEdge(parent, null, '', v4_3, v7_3);

      // Executes the layout
      layout.execute(parent);
    } finally {
      // Updates the display
      graph.getModel().endUpdate();
    }
  }
}

export default RadialTreeLayout;