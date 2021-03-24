/**
 * Copyright (c) 2006-2014, JGraph Ltd
  
  Hierarchical Layout example for mxGraph. This example demonstrates the
  use of the hierarchical and organic layouts. Note that the hierarchical
  layout requires another script tag in the head of the page.
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
        <h1>Hierarchical Layout example for mxGraph</h1>

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
        // Creates the graph inside the given container
        let graph = new mxGraph(container);

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
        let layout = new mxRadialTreeLayout(graph);

        let parent = graph.getDefaultParent();

        // Load cells and layouts the graph
        graph.getModel().beginUpdate();
        try
        {
          var v1 = graph.insertVertex(parent, null, '1', 500, 500, 80, 30);
          var v2 = graph.insertVertex(parent, null, '2.1', 0, 0, 80, 30);
          var v3 = graph.insertVertex(parent, null, '2.2', 0, 0, 80, 30);
          var v4 = graph.insertVertex(parent, null, '3.1', 0, 0, 80, 30);
          var v4_1 = graph.insertVertex(parent, null, '3.2', 0, 0, 80, 30);
          var v4_2 = graph.insertVertex(parent, null, '3.3', 0, 0, 80, 30);
          var v4_3 = graph.insertVertex(parent, null, '3.6', 0, 0, 80, 30);
          var v4_4 = graph.insertVertex(parent, null, '3.7', 0, 0, 80, 30);
          var v5 = graph.insertVertex(parent, null, '3.4', 0, 0, 80, 30);
          var v6 = graph.insertVertex(parent, null, '2.3', 0, 0, 80, 30);
          var v7 = graph.insertVertex(parent, null, '4.1', 0, 0, 80, 30);
          var v7_1 = graph.insertVertex(parent, null, '4.2', 0, 0, 80, 30);
          var v7_2 = graph.insertVertex(parent, null, '4.3', 0, 0, 80, 30);
          var v7_3 = graph.insertVertex(parent, null, '4.4', 0, 0, 80, 30);
          var v7_4 = graph.insertVertex(parent, null, '4.5', 0, 0, 80, 30);
          var v7_5 = graph.insertVertex(parent, null, '4.6', 0, 0, 80, 30);
          var v7_6 = graph.insertVertex(parent, null, '4.7', 0, 0, 80, 30);


          var e1 = graph.insertEdge(parent, null, '', v1, v2);
          var e2 = graph.insertEdge(parent, null, '', v1, v3);
          var e3 = graph.insertEdge(parent, null, '', v3, v4);
          var e3_1 = graph.insertEdge(parent, null, '', v3, v4_1);
          var e3_2 = graph.insertEdge(parent, null, '', v3, v4_2);
          var e3_3 = graph.insertEdge(parent, null, '', v3, v4_3);
          var e3_4 = graph.insertEdge(parent, null, '', v3, v4_4);
          var e4 = graph.insertEdge(parent, null, '', v2, v5);
          var e5 = graph.insertEdge(parent, null, '', v1, v6);
          var e6 = graph.insertEdge(parent, null, '', v4_3, v7);
          var e6_1 = graph.insertEdge(parent, null, '', v4_4, v7_4);
          var e6_2 = graph.insertEdge(parent, null, '', v4_4, v7_5);
          var e6_3 = graph.insertEdge(parent, null, '', v4_4, v7_6);
          var e6_1 = graph.insertEdge(parent, null, '', v4_3, v7_1);
          var e6_2 = graph.insertEdge(parent, null, '', v4_3, v7_2);
          var e6_3 = graph.insertEdge(parent, null, '', v4_3, v7_3);

          // Executes the layout
          layout.execute(parent);
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
<body onload="main(document.getElementById('graphContainer'))" style="margin:4px;">

  <!-- Creates a container for the graph with a grid wallpaper. Make sure to define the position
    and overflow attributes! See comments on the adding of the size-listener on line 54 ff!  -->
  <div id="graphContainer"
    style="position:absolute;overflow:auto;top:36px;bottom:0px;left:0px;right:0px;border-top:gray 1px solid;">
  </div>
</body>
</html>
