/**
 * Copyright (c) 2006-2013, JGraph Ltd
  
  Stylesheet example for mxGraph. This example demonstrates using
  a custom stylesheet and control points in edges, as well as
  overriding the getLabel and getTooltip function to return
  dynamic information, and making a supercall in JavaScript.
 */

import React from 'react';
import mxEvent from '../mxgraph/util/mxEvent';
import mxGraph from '../mxgraph/view/mxGraph';
import mxRubberband from '../mxgraph/handler/mxRubberband';

class MYNAMEHERE extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    // A container for the graph
    return (
      <>
        <h1>Stylesheet example for mxGraph</h1>

        <div
          ref={el => {
            this.el = el;
          }}
          style={{

          }}
        />
      </>
    );
  };

  componentDidMount() {

  };
}

export default MYNAMEHERE;


    function main(container)
    {
      // Checks if browser is supported
      if (!mxClient.isBrowserSupported())
      {
        // Displays an error message if the browser is
        // not supported.
        mxUtils.error('Browser is not supported!', 200, false);
      }
      else
      {
        // Creates the graph inside the DOM node.
        let graph = new mxGraph(container);

        // Disables basic selection and cell handling
        graph.setEnabled(false);

        // Returns a special label for edges. Note: This does
        // a supercall to use the default implementation.
        graph.getLabel = function(cell)
        {
          let label = mxGraph.prototype.getLabel.apply(this, arguments);

          if (this.getModel().isEdge(cell))
          {
            return 'Transfer '+label;
          }
          else
          {
            return label;
          }
        };

        // Installs a custom global tooltip
        graph.setTooltips(true);
        graph.getTooltip = function(state)
        {
          let cell = state.cell;
          let model = this.getModel();

          if (model.isEdge(cell))
          {
            let source = this.getLabel(model.getTerminal(cell, true));
            let target = this.getLabel(model.getTerminal(cell, false));

            return source+' -> '+target;
          }
          else
          {
            return this.getLabel(cell);
          }
        };

        // Creates the default style for vertices
        let style = [];
        style[mxConstants.STYLE_SHAPE] = mxConstants.SHAPE_RECTANGLE;
        style[mxConstants.STYLE_PERIMETER] = mxPerimeter.RectanglePerimeter;
        style[mxConstants.STYLE_STROKECOLOR] = 'gray';
        style[mxConstants.STYLE_ROUNDED] = true;
        style[mxConstants.STYLE_FILLCOLOR] = '#EEEEEE';
        style[mxConstants.STYLE_GRADIENTCOLOR] = 'white';
        style[mxConstants.STYLE_FONTCOLOR] = '#774400';
        style[mxConstants.STYLE_ALIGN] = mxConstants.ALIGN_CENTER;
        style[mxConstants.STYLE_VERTICAL_ALIGN] = mxConstants.ALIGN_MIDDLE;
        style[mxConstants.STYLE_FONTSIZE] = '12';
        style[mxConstants.STYLE_FONTSTYLE] = 1;
        graph.getStylesheet().putDefaultVertexStyle(style);

        // Creates the default style for edges
        style = [];
        style[mxConstants.STYLE_SHAPE] = mxConstants.SHAPE_CONNECTOR;
        style[mxConstants.STYLE_STROKECOLOR] = '#6482B9';
        style[mxConstants.STYLE_ALIGN] = mxConstants.ALIGN_CENTER;
        style[mxConstants.STYLE_VERTICAL_ALIGN] = mxConstants.ALIGN_MIDDLE;
        style[mxConstants.STYLE_EDGE] = mxEdgeStyle.ElbowConnector;
        style[mxConstants.STYLE_ENDARROW] = mxConstants.ARROW_CLASSIC;
        style[mxConstants.STYLE_FONTSIZE] = '10';
        graph.getStylesheet().putDefaultEdgeStyle(style);

        // Gets the default parent for inserting new cells. This
        // is normally the first child of the root (ie. layer 0).
        let parent = graph.getDefaultParent();

        // Adds cells to the model in a single step
        graph.getModel().beginUpdate();
        try
        {
          var v1 = graph.insertVertex(parent, null, 'Interval 1', 20, 20, 180, 30);
          var v2 = graph.insertVertex(parent, null, 'Interval 2', 140, 80, 280, 30);
          var v3 = graph.insertVertex(parent, null, 'Interval 3', 200, 140, 360, 30);
          var v4 = graph.insertVertex(parent, null, 'Interval 4', 480, 200, 120, 30);
          var v5 = graph.insertVertex(parent, null, 'Interval 5', 60, 260, 400, 30);
          var e1 = graph.insertEdge(parent, null, '1', v1, v2);
          e1.getGeometry().points = [{x: 160, y: 60}];
          var e2 = graph.insertEdge(parent, null, '2', v1, v5);
          e2.getGeometry().points = [{x: 80, y: 60}];
          var e3 = graph.insertEdge(parent, null, '3', v2, v3);
          e3.getGeometry().points = [{x: 280, y: 120}];
          var e4 = graph.insertEdge(parent, null, '4', v3, v4);
          e4.getGeometry().points = [{x: 500, y: 180}];
          var e5 = graph.insertEdge(parent, null, '5', v3, v5);
          e5.getGeometry().points = [{x: 380, y: 180}];
        }
        finally
        {
          // Updates the display
          graph.getModel().endUpdate();
        }
      }
    };
  </script>
</head>

<!-- Page passes the container for the graph to the program -->
<body onload="main(document.getElementById('graphContainer'))">
 
  <!-- Creates a container for the graph with a grid wallpaper -->
  <div id="graphContainer"
    style="overflow:hidden;position:relative;width:621px;height:311px;cursor:default;">
  </div>
</body>
</html>
